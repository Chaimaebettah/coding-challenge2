import axios from 'axios';
import * as types from './actionTypes'


export const transactionRequest = () => ({ type: types.TRANSACTIONS_REQUEST });

export const transactionSuccess = (payload) => ({
  type: types.TRANSACTIONS_SUCCESS,
  payload
});

export const transactionFailure = (payload) => ({
  type: types.TRANSACTIONS_FALURE,
  payload
});

export const getTransations = (params) => async (dispatch) => {
  const { filters, sortOrder, sortBy, skip, limit } = params;
  console.log('filters', filters)
  let url = 'http://localhost:3000/api/transactions?';
  url += `filters=${encodeURI(JSON.stringify(filters))}&`;
  url += `sortOrder=${sortOrder}&`;
  url += `sortBy=${sortBy}&`;
  url += `skip=${skip}&`;
  url += `limit=${limit}`;

  try {
    dispatch(transactionRequest());
    const response = await axios.get(url)
    dispatch(transactionSuccess(response.data));
  } catch (e) {
    dispatch(transactionFailure(e));
  }
}


export const getTransationDetails = (iban) => async (dispatch) => {
  console.log('inside of action iban', iban)
  const response = await axios.get(`http://localhost:3000/api/transactions/${iban}`)
  dispatch({ type: types.TRANSACTION_DETAILS, response })
}

export const toggleFilter = (payload) => ({
  type: types.TOGGLE_FILTER,
  payload
});

export const sortAndPaginate = (payload) => ({
  type: types.SORT_AND_PAGINATE,
  payload
});
