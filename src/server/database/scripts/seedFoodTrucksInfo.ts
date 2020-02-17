import trucks from '../../resources/foodtrucks/foodtrucks.json'
import FoodTruck from '../models/FoodTruck'
import {
  IFoodTruckRaw,
  PriceType,
  OperatingHoursFormat,
} from '../../../types/foodtrucks'

const { MONGO_URI } = process.env

if (!MONGO_URI) {
  console.log('Missing MONGO_URI')
  process.exit(1)
}
console.log(trucks)
const deleteFoodTrucksInDB = (): Promise<void> =>
  FoodTruck.find()
    .remove()
    .exec()
    .then(res => {
      console.log('Food trucks deleted.')
      if (res) {
        console.log('Food truck deletion message:')
        console.log(res)
      }
    })
    .catch(err => {
      console.error('Error encountered deleting food trucks.')
      if (err) {
        console.error(err)
      }
    })

const updateFoodTrucks = (): IFoodTruckRaw[] => {
  const ret: IFoodTruckRaw[] = trucks.map(truck => {
    const { menu = [], priceTypes = [] } = truck
    let { name: foodtruckName } = truck
    foodtruckName = foodtruckName
      .replace(/'/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()

    const newMenu = Object.entries(menu).map(([smName, submenu]) => {
      // const options = priceTypes ? priceTypes[smName] : null
      const items = submenu.map((item: Record<string, any>) => {
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

    const newPriceTypes: PriceType[] = Object.entries(priceTypes).map(
      ([smName, types]) => {
        const pt: PriceType = {
          name: smName,
        }
        if (types) {
          pt.options = types
        }
        return pt
      }
    )

    const { start, end } = truck
    const unknown: OperatingHoursFormat[] = [
      'unknown',
      'unknown',
      'unknown',
      'unknown',
      'unknown',
      'unknown',
      'unknown',
    ]

    const truckToReturn: IFoodTruckRaw = {
      ...truck,
      menu: newMenu,
      start: start ?? unknown,
      end: end ?? unknown,
      foodtruckID: foodtruckName,
      priceTypes: newPriceTypes,
      timeUpdated: new Date(),
    }

    return truckToReturn
  })

  return ret
}

/**
 *
 * @param truckArray - Array of completed trucks to use
 */
const loadFoodTrucksIntoDB = (truckArray: IFoodTruckRaw[]): Promise<void> =>
  Promise.all(
    truckArray.map(
      truck => new FoodTruck(truck).save().then(console.log) // eslint-disable-line
    )
  ).then(() => {
    console.log('----food truck seeding completed----') // eslint-disable-line
  })

const updateFoodTrucksInDB = (truckArray: IFoodTruckRaw[]): Promise<void> =>
  Promise.all(
    truckArray.map(truck =>
      FoodTruck.findOne({ name: truck.name }).then(oldTruckData => {
        if (oldTruckData !== null) {
          // update old truck

          console.log(`Updating ${oldTruckData.get(name)}`)
          return FoodTruck.findOneAndUpdate(
            { name: oldTruckData.get(name) },
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

// initial try at the insertion pipeline
const main = async (): Promise<void> => {
  try {
    const reset = process.argv.slice(2).includes('--reset')

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
