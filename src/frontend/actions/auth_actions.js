import axios from 'axios'

export const authenticate = (successRedirect, failureRedirect) => {
  axios.get(`/api/auth/authenticate?successRedirect=${successRedirect}&failureRedirect=${failureRedirect}`)
}
