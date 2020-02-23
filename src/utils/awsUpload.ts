import express from 'express'
import HttpStatus from 'http-status-codes'
import aws from 'aws-sdk'
import uuid from 'uuid'

require('dotenv').config()

const {
  AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_BUCKET_NAME,
} = process.env
if (AWS_SECRET_ACCESS_KEY) {
  console.error('No AWS access key set')
}

/**
 * Made by Cameron
 */
export default async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  console.log('got past middleware')
  try {
    const file = (req as any).file
    const s3bucket = new aws.S3({
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      accessKeyId: AWS_ACCESS_KEY_ID,
      region: AWS_REGION,
    })
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: `images/${file.originalname}/${uuid()}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }
    return new Promise((resolve, reject) => {
      s3bucket.upload(params, (err: any, data: any) => {
        if (err) {
          res.status(HttpStatus.BAD_REQUEST).send({
            status: 'Error',
            msg: 'Error uploading image.',
            ...err,
          })
          reject()
        } else {
          res.send({
            imageURL: data.Location,
          })
          resolve()
        }
      })
    })
  } catch (error) {
    next(error)
  }
}
