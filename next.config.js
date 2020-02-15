const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  cssLoaderOptions: {
    url: false,
  },
  env: {
    GOOGLE_MAPS_API_KEY: 'AIzaSyDZ-kdqPy5GUW2LpK0BSGg3HZzCidhwILs',
  },
})