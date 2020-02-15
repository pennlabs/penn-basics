import { Router, Request, Response } from 'express'
import { Document } from 'mongoose'

import { BAD_REQUEST, OK } from 'http-status-codes'
import * as DB from '../database/db'
import { ISpace } from '../../types/studyspaces'

const router = Router()

export default (): Router => {
  router.get('/all', (_, res: Response) => {
    DB.findAllSpaces().then((spaces: Document[]) => {
      res.status(200).json({
        spaces,
      })
    })
  })

  router.get('/homepage', (_, res: Response) => {
    DB.filterSpaces(true, 0, 0, 0, 0).then((spaces: Document[]) => {
      // TODO document this
      const space1 = Math.floor(Math.random() * spaces.length)
      let space2 = Math.floor(Math.random() * spaces.length)

      while (space2 !== space1) {
        space2 = Math.floor(Math.random() * spaces.length)
      }

      res.status(200).json({
        spaces: [spaces[space1], spaces[space2]],
      })
    })
  })

  router.post('/', (req: Request, res: Response) => {
    const space: ISpace = {
      name: req.body.name,
      address: req.body.address,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      outlets: req.body.outlets,
      quiet: req.body.quiet,
      groups: req.body.groups,
      tags: req.body.tags,
    }

    const spaceKeys = Object.keys(space)

    try {
      spaceKeys.forEach((key: string) => {
        if (
          typeof (space as Record<string, any>)[key] === 'undefined' ||
          (space as Record<string, any>)[key] === ''
        ) {
          throw Error()
        }
      })
    } catch (err) {
      res.status(BAD_REQUEST).json({
        message:
          'One or more of the parameters for a new space is undefined or empty. Check the request again.',
      })

      return
    }

    DB.insertSpace(space).then(() => {
      res.status(OK).json({
        message: 'Space successfully created.',
      })
    })
  })

  router.get('/:id', (req, res) => {
    const spaceId = req.params.id
    DB.getSpace(spaceId).then((space: Document | null) => {
      res.status(OK).json({
        spaces: space,
      })
    })
  })

  return router
}
