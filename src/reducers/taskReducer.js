import { GET_TASKS } from '../types/taskTypes';
import { LOADING, ERROR } from '../types/taskTypes';
const INITIAL_STATE = {
  tasks: [],
  loading: false,
  error: null,
  user_id: '',
  title: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasks: action.payload, loading: false, error: '' };

    case LOADING:
      return { ...state, loading: true };

    case ERROR:
      return { ...state, error: action.payload, loading: false };

    case 'change_user_id':
      return { ...state, user_id: action.payload }

    case 'change_title':
      return { ...state, title: action.payload }

    default:
      return state;
  }
};

export default reducer;
