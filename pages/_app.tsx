import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import { initGA, logPageView } from '../src/utils/analytics'

import { initStore } from '../src/utils/store'

interface StoreProvider {
  store: any
}

class PennBasicsApp extends App {
  static async getInitialProps({
    Component,
    ctx,
  }: {
    Component: any
    ctx: any
  }): Promise<{
    pageProps: any
  }> {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    }
  }

  componentDidMount(): void {
    initGA()
    logPageView()
    if (!Router || !Router.router) {
      return
    }

    Router.router.events.on('routeChangeComplete', logPageView)
  }

  render(): React.ReactElement {
    // TODO where does the store come from?
    const { Component, pageProps } = this.props
    const store = ((this.props as Record<string, any>) as StoreProvider).store
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withRedux(initStore)(PennBasicsApp)
