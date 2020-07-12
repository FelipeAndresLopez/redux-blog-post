import axios from 'axios';
import { GET_TASKS, LOADING, ERROR, CHANGE_USER_ID, CHANGE_TITLE, SAVE, UPDATE, CLEAN } from '../types/taskTypes';

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
    type: CHANGE_USER_ID,
    payload: user_id
  })
}

export const changeTitle = (title) => (dispatch) => {
  dispatch({
    type: CHANGE_TITLE,
    payload: title
  })
}

export const add = (newTask) => async (dispatch) => {
  console.log(newTask)
  dispatch({
    type: LOADING
  });

  try {
    await axios.post('https://jsonplaceholder.typicode.com/todos',
      newTask);
    dispatch({
      type: SAVE
    })
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: 'Try later'
    })
  }
}

export const edit = (taskEdited) => async (dispatch) => {
  console.log(taskEdited)
  dispatch({
    type: LOADING
  });

  try {
    await axios.put(`https://jsonplaceholder.typicode.com/todos/${taskEdited.id}`, taskEdited);
    dispatch({
      type: SAVE
    })
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: 'Try later'
    })
  }
}

export const changeCheckbox = (userId, taskId) => (dispatch, getState) => {
  const { tasks } = getState().taskReducer;
  const taskSelected = tasks[userId][taskId];

  const tasksUpdated = {
    ...tasks
  };

  tasksUpdated[userId] = {
    ...tasks[userId]
  };

  tasksUpdated[userId][taskId] = {
    ...tasks[userId][taskId],
    completed: !taskSelected.completed
  };

  dispatch({
    type: UPDATE,
    payload: tasksUpdated
  });
}

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch({
    type: LOADING
  });

  try {
    await axios.put(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
    dispatch({
      type: GET_TASKS,
      payload: {}
    })

  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: 'Service is not avialable'
    })
  }
}

export const resetForm = () => (dispatch) => {
  dispatch({
    type: CLEAN
  })
}