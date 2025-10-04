// esbuild.js
const esbuild = require('esbuild')
const fs = require('fs')
const path = require('path')

// Modes
const flagProd = process.argv.includes('--prod')
const flagWatch = process.argv.includes('--watch')
const isProd = process.env.NODE_ENV === 'production' || flagProd
const useHash = isProd || process.env.ASSET_HASH === '1'

// File naming patterns (hash in prod when ASSET_HASH=1)
const name = useHash ? '[name]-[hash]' : '[name]'

function cleanDist () {
  const distPath = path.resolve(__dirname, 'dist')
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true })
  }
}

// Common build options
const buildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  platform: 'browser',
  target: ['es2020'],
  format: 'esm',
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.css': 'css'
  },
  entryNames: `${name}`,
  chunkNames: `chunks/${name}`,
  assetNames: `${name}`,
  minify: isProd,
  sourcemap: !isProd
}

async function run () {
  cleanDist()
  if (isProd && !flagWatch) {
    // Production build (single run)
    await esbuild.build(buildOptions)
    console.log('Built (production)')
    return
  }

  if (flagWatch) {
    // Development watch mode
    const ctx = await esbuild.context(buildOptions)
    await ctx.watch()
    console.log('esbuild watching...')
    return
  }

  // Single dev build
  await esbuild.build(buildOptions)
  console.log('Built (development)')
}

run().catch(() => process.exit(1))
