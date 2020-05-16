import axios from 'axios';
import { GET_POSTS_BY_USER, LOADING, ERROR, COMMENTS_LOADING, COMMENTS_ERROR, COMMENTS_UPDATING } from '../types/postTypes';
import * as userTypes from '../types/userTypes';

const { GET_USERS } = userTypes;

export const getPostsByUser = (key) => async (dispatch, getState) => {
  dispatch({
    type: LOADING
  });

  try {
    const { users } = getState().userReducer;
    const { posts } = getState().postReducer;

    const userId = users[key].id;

    const response = await axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`);

    const newsOne = response.data.map((post) => ({
      ...post,
      comments: [],
      open: false
    }));

    const postsUpdated = [...posts, newsOne];

    const postsKey = postsUpdated.length - 1;
    const usersUpdated = [...users];
    usersUpdated[key] = {
      ...users[key],
      postsKey
    };

    dispatch({
      type: GET_POSTS_BY_USER,
      payload: postsUpdated
    });

    dispatch({
      type: GET_USERS,
      payload: usersUpdated
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: 'Posts are not available'
    });
  }
};

export const toggle = (postsKey, commentsKey) => (dispatch, getState) => {
  const { posts } = getState().postReducer;
  const selected = posts[postsKey][commentsKey];

  const updated = {
    ...selected,
    open: !selected.open
  };

  const postsUpdated = [...posts];
  postsUpdated[postsKey] = [...posts[postsKey]];
  postsUpdated[postsKey][commentsKey] = updated;
  dispatch({
    type: GET_POSTS_BY_USER,
    payload: postsUpdated
  });
};

export const getComments = (postsKey, commentsKey) => async (dispatch, getState) => {
  dispatch({
    type: COMMENTS_LOADING
  });

  const { posts } = getState().postReducer;
  const selected = posts[postsKey][commentsKey];

  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${selected.id}`);
    const updated = {
      ...selected,
      comments: response.data
    };
    const postsUpdated = [...posts];
    postsUpdated[postsKey] = [...posts[postsKey]];
    postsUpdated[postsKey][commentsKey] = updated;
    dispatch({
      type: COMMENTS_UPDATING,
      payload: postsUpdated
    });
  } catch (error) {
    dispatch({
      type: COMMENTS_ERROR,
      payload: 'Comments is not available'
    });
  }
};
