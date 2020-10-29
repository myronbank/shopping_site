import { ADD_STOCK_FAIL, ADD_STOCK_SUCCESS, ADD_STOCK_ATTEMPT } from '../constants/productConstants';

function productStockReducer(state = { products: [] }, action) {
  switch (action.type) {
    case ADD_STOCK_ATTEMPT:
      return { loading: true };
    case ADD_STOCK_SUCCESS:
      return { loading: false, products: action.payload };
    case ADD_STOCK_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

export { productStockReducer };