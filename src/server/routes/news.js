const router = require('express').Router()
const request = require('request')
const cheerio = require('cheerio')

module.exports = function newsRouter() {
  // can convert this to Labs API
  router.get('/', (req, response) => {
    const { website } = req.query
    let { className } = req.query
    request(website, (err, res, html) => {
      if (!err && res.statusCode === 200) {
        const $ = cheerio.load(html)
        className = className.replace(/ /g, '.')
        const heading = $(`.${className}`)
        const picture = $(heading)
          .find('.img.img-responsive')
          .attr('src')
        const link = $(heading)
          .find('.frontpage-link.large-link')
          .attr('href')
        const title = $(heading)
          .find('.frontpage-link.large-link')
          .text()
        const content = $(heading)
          .find('p')
          .text()
        const time = $(heading)
          .find('.timestamp')
          .text()
          .trim()
        response.json({
          picture,
          link,
          title,
          content,
          time,
        })
      }
    })
  })

  return router
}
