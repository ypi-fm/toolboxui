// esbuild.js
const esbuild = require('esbuild')

// Check if we're in production mode
const isProd = process.argv.includes('--prod')

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
    '.tsx': 'tsx'
  }
}

if (isProd) {
  // For production builds
  esbuild.build({
    ...buildOptions,
    minify: true,
    sourcemap: false
  }).catch(() => process.exit(1))
} else if (process.argv.includes('--watch')) {
  // For development with watch mode
  esbuild.context({
    ...buildOptions,
    minify: false,
    sourcemap: true
  }).then(context => {
    context.watch()
    console.log('ESBuild watching for changes...')
  }).catch(() => process.exit(1))
} else {
  // Single development build
  esbuild.build({
    ...buildOptions,
    minify: false,
    sourcemap: true
  }).catch(() => process.exit(1))
}
