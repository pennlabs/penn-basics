import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import { initGA, logPageView } from '../src/frontend/analytics/index'

import { initStore } from '../store'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    }
  }

  componentDidMount() {
    initGA()
    logPageView()
    Router.router.events.on('routeChangeComplete', logPageView)
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withRedux(initStore)(MyApp)
