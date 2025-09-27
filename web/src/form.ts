import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import '@jsfe/shoelace'
import type { FromSchema, JSONSchema7 } from '@jsfe/shoelace'

export const mySchema = {
  type: 'object',
  properties: {
    foo: {
      type: 'string'
    },
    bar: {
      type: 'boolean'
    }
  }
} as const satisfies JSONSchema7
export type MyData = FromSchema<typeof mySchema>

function assertValidData (data: unknown): data is MyData {
  // TODO: wire up AJV or similar for validation
  return true
}

@customElement('tbx-form')
export class Form extends LitElement {
  @state() private _dataInLit: MyData = {
    foo: 'hello'
  }

  override render (): unknown {
    return html`
      <jsf-shoelace
        .schema=${mySchema /* Type-casted as JSONSchema7 */}
        .uiSchema=${{
          /* Type-casted as UiSchema */
          bar: {
            'ui:widget': 'switch'
          }
        }}
        .data=${this._dataInLit}
        .dataChangeCallback=${(newData: unknown) => {
          console.log({ 'Data from Lit': newData })

          if (assertValidData(newData)) this._dataInLit = newData
          else console.error('Invalid data!')
        }}
        .submitCallback=${(newData: unknown, valid: boolean) => {
          console.log({ 'Submitted from Lit!': newData, valid })

          if (assertValidData(newData)) {
            // Do stuff...
          }
        }}
      ></jsf-shoelace>

      <pre>${JSON.stringify({ data: this._dataInLit }, null, 2)}</pre>
    `
  }
}
