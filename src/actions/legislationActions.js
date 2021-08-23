import axios from "axios"
import { toast } from 'react-toastify';
import { LEGISLATION_DATA_URL, TOKEN_ERROR_CODE } from "../constants"
import { logout } from './logout'

// Fetch individual Legislation

export const FETCH_LEGISLATION_REQUEST = 'FETCH_LEGISLATION_REQUEST'
export const FETCH_LEGISLATION_SUCCESS = 'FETCH_LEGISLATION_SUCCESS'
export const FETCH_LEGISLATION_FAILURE = 'FETCH_LEGISLATION_FAILURE'

function fetchLegislationRequest() {
  return {
    type: FETCH_LEGISLATION_REQUEST,
    isFetching: true,
  }
}

function fetchLegislationSuccess(legislation) {
  return {
    type: FETCH_LEGISLATION_SUCCESS,
    isFetching: false,
    legislation: legislation
  }
}

function fetchLegislationFailure(error) {
  return {
    type: FETCH_LEGISLATION_FAILURE,
    isFetching: false,
    error
  }
}

export function fetchLegislation(legislationId) {

  var config = {
    method: 'GET',
    url: `${LEGISLATION_DATA_URL}/${legislationId}`
  }

  return dispatch => {

    dispatch(fetchLegislationRequest())
    return axios(config)
    .then(res => {
      dispatch(fetchLegislationSuccess(res.data))
    }).catch(function (error) {
      dispatch(fetchLegislationFailure(error))
      toast.error("Unable load legislation, please try again in a few minutes")
    })
  }
}

// Fetch All Legislation

export const FETCH_ALL_LEGISLATIONS_REQUEST = 'FETCH_ALL_LEGISLATIONS_REQUEST'
export const FETCH_ALL_LEGISLATIONS_SUCCESS = 'FETCH_ALL_LEGISLATIONS_SUCCESS'
export const FETCH_ALL_LEGISLATIONS_FAILURE = 'FETCH_ALL_LEGISLATIONS_FAILURE'

function fetchAllLegislationsRequest() {
  return {
    type: FETCH_ALL_LEGISLATIONS_REQUEST,
    isFetching: true,
  }
}

function fetchAllLegislationsSuccess(legislations) {
  return {
    type: FETCH_ALL_LEGISLATIONS_SUCCESS,
    isFetching: false,
    legislations: legislations
  }
}

function fetchAllLegislationsFailure(error) {
  return {
    type: FETCH_ALL_LEGISLATIONS_FAILURE,
    isFetching: false,
    error
  }
}

export function fetchAllLegislations() {

  var config = {
    method: 'GET',
    url: LEGISLATION_DATA_URL
  }

  return dispatch => {

    dispatch(fetchAllLegislationsRequest())
    return axios(config)
    .then(res => {
      dispatch(fetchAllLegislationsSuccess(res.data))
    }).catch(function (error) {
      dispatch(fetchAllLegislationsFailure(error))
      toast.error("Unable load legislation, please try again in a few minutes")
    })
  }
}

// Update a piece of legislation

export const UPDATE_LEGISLATION_REQUEST = 'UPDATE_LEGISLATION_REQUEST'
export const UPDATE_LEGISLATION_SUCCESS = 'UPDATE_LEGISLATION_SUCCESS'
export const UPDATE_LEGISLATION_FAILURE = 'UPDATE_LEGISLATION_FAILURE'

function updateLegislationRequest() {
  return {
    type: UPDATE_LEGISLATION_REQUEST,
    isFetching: true,
  }
}

function updateLegislationSuccess() {
  return {
    type: UPDATE_LEGISLATION_SUCCESS,
    isFetching: false,
  }
}

function updateLegislationFailure(error) {
  return {
    type: UPDATE_LEGISLATION_FAILURE,
    isFetching: false,
    error
  }
}

export function updateLegislation(legislationId, legislation) {

  var config = {
    method: (legislationId !== undefined ? 'PUT' : 'POST'),
    url: LEGISLATION_DATA_URL + (legislationId !== undefined ? `/${legislationId}` : ""),
    data: legislation,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }

  return dispatch => {

    dispatch(updateLegislationRequest())
    axios(config)
    .then(() => {
      dispatch(updateLegislationSuccess())
      localStorage.removeItem('unsaved_legislation')
      toast.success("Legislation Saved");
    }).catch(function (error) {
      dispatch(updateLegislationFailure(error))
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("You must log in to make changes to a legislation");
        } else if (error.response.status === 402) {
          toast.error("You are not authorized to edit this legislation");
        } else if (error.response.status === TOKEN_ERROR_CODE) {
          dispatch(logout())
        }
      } else {
          toast.error("Failed to update legislation");
      }
    })
  }
}