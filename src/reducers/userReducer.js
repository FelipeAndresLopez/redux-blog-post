import { GET_USERS } from '../types/userTypes';
import { LOADING, ERROR } from '../types/userTypes';
const INITIAL_STATE = {
  users: [],
  loading: false,
  error: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload, loading: false, error: '' };

    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export default reducer;
