import types from './action_types'
import axios from 'axios'

const BASE = 'https://hidden-scrubland-81317.herokuapp.com/api';

export function getDiningData(venue_id){
  axios.get(`${BASE}/weekly_menu/${venue_id}`)
  .then(res => {
    const data = res.data
    console.log(data)
  })
  .catch(error => {
    console.log(error)
  })
}

export function getDiningDataRequested(){
  return {
    type: types.getDiningDataRequested
  }
}

export function getDiningDataRejected(error){
  return {
    type: types.getDiningDataRejected,
    error,
  }
}

export function getDiningDataFulfilled(diningData){
  return {
    type: types.getDiningDataFulfilled,
    diningData,
  }
}