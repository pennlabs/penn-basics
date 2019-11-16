const trucks = require('../resources/foodtrucks/foodtrucks.json')
const FoodTruck = require('./models/FoodTruck')

const { MONGO_URI } = process.env
if (!MONGO_URI) {
  console.log('Missing MONGO_URI') // eslint-disable-line
  process.exit(1)
}

function deleteFoodTrucksInDB() {
  return FoodTruck.find().remove()
}

function updateFoodTrucks() {
  return trucks.map((truck, foodtruckID) => {
    const { menu = [], priceTypes = [] } = truck

    const newMenu = Object.entries(menu).map(([smName, submenu]) => {
      // const options = priceTypes ? priceTypes[smName] : null
      const items = submenu.map(item => {
        const { price, name } = item

        const newItem = {
          name: typeof name === 'string' ? name : name.toString(), // enfore name as type String
          /* options, if it exists, is the list of options corresponding to the number of prices available for the item */
          // options: options ? options.slice(0, price.length) : options,
          prices: typeof price === 'number' ? [price] : price, // enfore price as type [Number]
        }
        return newItem
      })

      return {
        name: smName,
        items,
      }
    })

    const newPriceTypes = Object.entries(priceTypes).map(([smName, types]) => {
      return {
        name: smName,
        options: types,
      }
    })

    return { ...truck, menu: newMenu, foodtruckID, priceTypes: newPriceTypes, overallRating: 0 }
  })
}

function loadFoodTrucksIntoDB(truckArray) {
  return Promise.all(
    truckArray.map(
      truck => new FoodTruck(truck).save().then(console.log) // eslint-disable-line
    )
  ).then(() => {
    console.log('----foodtrucks seeding completed----') // eslint-disable-line
    process.exit(0)
  })
}

/*
// initial test of food truck code
console.log(new FoodTruck(updateFoodTrucks()[0]))
*/

// initial try at the insertion pipeline
deleteFoodTrucksInDB()
  .then(() => {
    const trucksToInsert = updateFoodTrucks()
    return loadFoodTrucksIntoDB(trucksToInsert)
  })
  .catch(err => console.error(err)) // eslint-disable-line
