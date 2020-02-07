import trucks from '../../resources/foodtrucks/foodtrucks.json'
import FoodTruck from '../models/FoodTruck'

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
    const { menu = [], priceTypes = [] } = truck
    let { name: foodtruckName } = truck
    foodtruckName = foodtruckName
      .replace(/'/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()

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

    return {
      ...truck,
      menu: newMenu,
      foodtruckID: foodtruckName,
      priceTypes: newPriceTypes,
      overallRating: 0,
      timeUpdated: new Date(),
    }
  })
}

// function loadFoodTrucksIntoDB(truckArray) {
//   return Promise.all(
//     truckArray.map(truck => {
//       return FoodTruck.findOneAndUpdate(
//         { name: truck.name },
//         { ...truck }
//       ).then(console.log) // eslint-disable-line
//     })
//   ).then(() => {
//     console.log('----foodtrucks seeding completed----') // eslint-disable-line
//     process.exit(0)
//   })
// }

function loadFoodTrucksIntoDB(truckArray) {
  return Promise.all(
    truckArray.map(
      truck => new FoodTruck(truck).save().then(console.log) // eslint-disable-line
    )
  ).then(() => {
    console.log('----seeding completed----') // eslint-disable-line
  })
}

function updateFoodTrucksInDB(truckArray) {
  return Promise.all(
    truckArray.map(truck =>
      FoodTruck.findOne({ name: truck.name }).then(oldTruckData => {
        if (oldTruckData !== null) {
          // update old truck

          console.log(`Updating ${oldTruckData.name}`)
          return FoodTruck.findOneAndUpdate(
            { name: oldTruckData.name },
            {
              $set: {
                description: truck.description,
                end: truck.end,
                image: truck.image,
                link: truck.link,
                location: truck.location,
                menu: truck.menu,
                payments: truck.payments,
                start: truck.start,
                tags: truck.tags,
                timeUpdated: new Date(),
              },
            }
          )
            .exec()
            .then(console.log)
        }
        // insert a new truck
        return new FoodTruck(truck).save().then(console.log)
      })
    )
  ).then(() => {
    console.log('----seeding completed----') // eslint-disable-line
  })
}

// initial try at the insertion pipeline
async function main() {
  try {
    const [
      _executor, // eslint-disable-line
      _scriptName, // eslint-disable-line
      ...settings
    ] = process.argv

    const reset = settings.includes('--reset')

    if (reset) {
      await deleteFoodTrucksInDB()
      const trucksToInsert = updateFoodTrucks()
      await loadFoodTrucksIntoDB(trucksToInsert)
    } else {
      console.log('doing non-resetty things')
      const trucksToInsert = updateFoodTrucks()
      await updateFoodTrucksInDB(trucksToInsert)
    }
  } catch (err) {
    console.error(err)
  }

  process.exit(0)
}

main()

/*
deleteFoodTrucksInDB()
  .then(() => {
    const trucksToInsert = updateFoodTrucks()
    return loadFoodTrucksIntoDB(trucksToInsert)
  })
  .catch(err => console.error(err)) // eslint-disable-line
*/

// async function main() {
//   try {
//     const trucksToInsert = updateFoodTrucks()
//     await loadFoodTrucksIntoDB(trucksToInsert)
//   } catch (err) {
//     console.error(err) // eslint-disable-line
//   }
// }

// main()
