import { deleteReview } from '../db'

const { MONGO_URI } = process.env
if (!MONGO_URI) {
  console.log('Missing MONGO_URI') // eslint-disable-line
  process.exit(1)
}

const main = async (): Promise<void> => {
  try {
    const foodTruckName = process.argv[2]
    const pennid = process.argv[3]

    const res = await deleteReview(foodTruckName, Number(pennid))
    console.log(res) // eslint-disable-line

    process.exit(0)
  } catch (err) {
    console.error(err) // eslint-disable-line
    process.exit(1)
  }
}

main()
