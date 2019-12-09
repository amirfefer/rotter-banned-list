import {
  FETCH_BLOCKED_LIST_LOADING,
  FETCH_BLOCKED_LIST_STOP_LOADING,
  FETCH_BLOCKED_LIST,
  FETCH_BLOCKED_LIST_DONE,
  FETCH_BLOCKED_LIST_ERROR,
} from '../../common/consts';

export default (state = { loading: true, done: false }, action) => {
  switch (action.type) {
    case FETCH_BLOCKED_LIST:
      return {
        ...state,
        blocked: action.payload,
      };
    case FETCH_BLOCKED_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BLOCKED_LIST_STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case FETCH_BLOCKED_LIST_DONE:
      return {
        ...state, done: true,
      };
    case FETCH_BLOCKED_LIST_ERROR:
      return {
        ...state, error: true,
      };
    default:
      return state;
  }
};
