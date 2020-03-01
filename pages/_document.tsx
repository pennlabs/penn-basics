import Document from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

// Adapted from https://github.com/zeit/next.js/blob/canary/examples/with-styled-components/pages/_document.js
export default class PennBasicsDocument extends Document {
  static async getInitialProps(
    ctx: any
  ): Promise<{
    styles: JSX.Element
    html: string
    head?: (JSX.Element | null)[] | undefined
  }> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = (): any =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any): JSX.Element =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
