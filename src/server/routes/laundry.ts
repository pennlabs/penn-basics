import { Router, Request, Response } from 'express'
import HttpStatus from 'http-status-codes'
import webpush from 'web-push'

const router = Router()

const isValidNumericId = (id: number | string | undefined | null): boolean => {
  if (id === null || id === undefined) {
    return false
  }
  const num = Number(id)
  if (Number.isNaN(num)) {
    return false
  }
  if (num < 0) {
    return false
  }
  return true
}

export default (): Router => {
  router.post(
    '/reminder/add',
    async (req: Request, res: Response): Promise<void> => {
      // TODO check for bad request (@peter)

      // a unique reminderID is used to distinguish between multiple reminders
      // that have the same hallID and machineID
      const {
        subscription,
        machineID,
        hallID,
        machineType,
        reminderID,
      } = req.body

      let { timeRemaining } = req.body
      timeRemaining =
        timeRemaining !== 0 ? Number(timeRemaining) * 60 * 1000 : 20000
      // timeRemaining = 2000

      if (!isValidNumericId(hallID)) {
        res.status(HttpStatus.BAD_REQUEST).send('Missing hallID')
        return
      }

      // console.log("---Notification entered to backend---")

      // set a timeout that equals to the timeRemaining
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            // use webpush to instruct the service worker to push notification
            webpush
              .sendNotification(
                subscription,
                JSON.stringify({ machineID, hallID, reminderID, machineType }) // payload received by the service worker
              )
              .then(() => {
                // respond to frontend until the instruction is received by the service worker
                // console.log("---Notification sent from backend---")
                res.status(200).json({})
                resolve()
              })
          } catch (err) {
            res.status(200).json({ error: err.message })
            reject()
          }
        }, timeRemaining)
      })
    }
  )

  return router
}
