import fs from 'fs'
import uuid from 'uuid/v1'

const filename =
  'C:\\Users\\pdhil\\Documents\\Code\\PennLabs\\pennbasics\\src\\server\\resources\\foodtrucks\\foodtrucks.json'
const idField = 'foodtruckID'

// TODO document this

const objs = JSON.parse(fs.readFileSync(filename).toString())
console.log(objs)
if (Array.isArray(objs)) {
  const newObjs = objs.map(o => {
    const newObj = { ...o }
    if (newObj[idField] === undefined || newObj[idField] === null) {
      newObj[idField] = uuid()
    }
    console.log(newObj[idField])
    return newObj
  })

  console.log(newObjs[0])
  process.exit(0)
  fs.writeFileSync(filename, JSON.stringify(newObjs))
}
