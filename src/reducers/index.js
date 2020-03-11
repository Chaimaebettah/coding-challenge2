import * as types from '../actions/actionTypes'
import { filters } from '../../data/constants'


export const initialState = {
  list: [],
  errors: [],
  loading: false,
  details: {},
  filters,
  sortOrder: 'desc',
  sortBy: 'account',
  skip: 0,
  limit: 60,
  total: 0,
}


export const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.transactions,
        total: action.payload.total,
      };
    case types.TRANSACTIONS_FALURE:
      return {
        ...state,
        loading: false,
        errors: [...state.errors, action.payload]
      }
    case types.TRANSACTION_DETAILS:
      return {
        ...state,
        details: action.response.data
      }
    case types.TOGGLE_FILTER:
      const nextFilters = state.filters.map(filter => {
        if (action.payload.value === filter.value) {
          filter.active = action.payload.active;
        }

        return filter;
      });

      return {
        ...state,
        filters: nextFilters,
      }
    case types.SORT_AND_PAGINATE:
      const { sortBy, sortOrder, skip } = action.payload;
      return {
        ...state,
        sortBy,
        sortOrder,
        skip,
      }
    default:
      return state;
  }

}