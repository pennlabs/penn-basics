const trucks = require('../resources/foodtrucks/foodtrucks.json')
const FoodTruck = require('./models/FoodTruck')
const { updateReview, deleteReview } = require('../database/db')

const { MONGO_URI } = process.env
if (!MONGO_URI) {
  console.log('Missing MONGO_URI') // eslint-disable-line
  process.exit(1)
}

async function main() {
  try {
    const [
      _executor, // eslint-disable-line
      _scriptName, // eslint-disable-line
      foodTruckName,
      pennid,
    ] = process.argv

    const res = await deleteReview(foodTruckName, Number(pennid))
    console.log(res) // eslint-disable-line

    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
