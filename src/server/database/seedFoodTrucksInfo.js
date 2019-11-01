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
  return trucks.map(truck => {
    const { name, payments, start, end, location, tags, link } = truck

    const { priceTypes } = truck

    const menu = { ...truck.menu }

    const newMenu = Object.entries(menu).map(([smName, submenu]) => {
      const options = priceTypes ? priceTypes[smName] : null

      const items = submenu.map(item => {
        let { price } = item

        /* enforce price as type [Number] */
        if (typeof price === 'number') {
          price = [price]
        } else {
          price = [...price]
        }

        const newItem = {
          name: item.name,
          /* options, if it exists, is the list of options corresponding to the number of prices available for the item */
          options: options ? options.slice(0, price.length) : options,
          prices: price,
        }
        return newItem
      })

      return {
        name: smName,
        items: items,
      }
    })

    const newTruck = {
      name,
      payments,
      start,
      end,
      location,
      tags,
      link,
      menu: newMenu,
    }

    return newTruck
  })
}

function loadFoodTrucksIntoDB(truckArray) {
  return Promise.all(
    truckArray.map(
      truck => new FoodTruck(truck).save().then(console.log) // eslint-disable-line
    )
  ).then(() => {
    console.log('----seeding completed----') // eslint-disable-line
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
