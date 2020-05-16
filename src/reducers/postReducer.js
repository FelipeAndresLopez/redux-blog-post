import { COMMENTS_UPDATING, LOADING, ERROR, COMMENTS_LOADING, COMMENTS_ERROR, GET_POSTS_BY_USER } from '../types/postTypes';
const INITIAL_STATE = {
  posts: [],
  loading: false,
  error: null,
  commentsLoading: false,
  commentsError: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS_BY_USER:
      return { ...state, posts: action.payload, loading: false, error: '' };

    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: action.payload, loading: false };

    case COMMENTS_UPDATING:
      return { ...state, posts: action.payload, commentsLoading: false, commentsError: '' };

    case COMMENTS_LOADING:
      return { ...state, commentsLoading: true };
    case COMMENTS_ERROR:
      return { ...state, commentsError: action.payload, commentsLoading: false };

    default:
      return state;
  }
};

export default reducer;
