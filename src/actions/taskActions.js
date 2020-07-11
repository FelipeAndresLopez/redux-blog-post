import axios from 'axios';
import { GET_TASKS, LOADING, ERROR } from '../types/taskTypes';

export const getTasks = () => async (dispatch) => {
  dispatch({
    type: LOADING
  });

  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    const tasks = {};

    response.data.map((task) => (
      tasks[task.userId] = {
        ...tasks[task.userId],
        [task.id]: { ...task }
      }
    ))

    dispatch({
      type: GET_TASKS,
      payload: tasks
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    dispatch({
      type: ERROR,
      payload: 'Task information is not available.'
    });
  }
};

export const changeUserId = (user_id) => (dispatch) => {
  console.log(user_id)
  dispatch({
    type: 'change_user_id',
    payload: user_id
  })
}

export const changeTitle = (title) => (dispatch) => {
  dispatch({
    type: 'change_title',
    payload: title
  })
}
