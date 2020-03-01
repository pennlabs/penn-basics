import express from 'express'
import HttpStatus from 'http-status-codes'
import aws from 'aws-sdk'
import uuid from 'uuid'
import { PutObjectRequest } from 'aws-sdk/clients/s3'

require('dotenv').config()

const {
  AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_BUCKET_NAME,
} = process.env
if (!AWS_SECRET_ACCESS_KEY) {
  console.error('No AWS access key set')
}
if (!AWS_ACCESS_KEY_ID) {
  console.error('No AWS access key ID set')
}
if (!AWS_BUCKET_NAME) {
  console.error('No AWS bucket name set')
}
if (!AWS_REGION) {
  console.error('No AWS region set')
}

// require all of the environment params to be set
if (
  AWS_SECRET_ACCESS_KEY === undefined ||
  AWS_ACCESS_KEY_ID === undefined ||
  AWS_REGION === undefined ||
  AWS_BUCKET_NAME === undefined
) {
  process.exit(1)
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
    const params: PutObjectRequest = {
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
