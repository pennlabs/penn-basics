import { Router } from 'express'
import request, { Response } from 'request'
import cheerio from 'cheerio'

const router = Router()

export default function newsRouter() {
  // can convert this to Labs API
  router.get('/', (req, response) => {
    const { website } = req.query
    let { className } = req.query
    request(website, (err: Error, res: Response, html: string) => {
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
