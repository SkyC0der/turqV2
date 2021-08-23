import axios from "axios"
import { toast } from 'react-toastify';
import { LOGIN_URL } from "../constants"

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function loginRequest() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
  }
}

function loginSuccess(token, email) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: token,
    email: email
  }
}

function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function login(creds) {

  let config = {
    method: 'POST',
    url: LOGIN_URL,
    data: {
      email: creds.email,
      password: creds.password
    }
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(loginRequest())

    axios(config)
    .then(res => {
      localStorage.setItem('token', res.data.jwttoken)
      localStorage.setItem('email', creds.email)
      // Dispatch the success action
      dispatch(loginSuccess(res.data.jwttoken, creds.email))
    }).catch(function (error) {
      dispatch(loginFailure(error))
      if(error.response)
      toast.error("Login Failed: " + error.response.data.detail);
    })
  }
}