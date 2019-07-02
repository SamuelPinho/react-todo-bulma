import axios from 'axios';
import { tasks } from './tasks';
import {
  ADD_TASK,
  DELETE_TASK,
  GET_TASKS,
  GET_TASK,
  UPDATE_TASK,
  LOADING,
  FILTER_COMPLETED_TASKS
} from './actionTypes';

const { REACT_APP_NODE_ENV } = process.env;
const isStatic = REACT_APP_NODE_ENV === 'static';
const apiUrl = 'http://localhost:3001/api/tasks';

export function createTask({ title, details, conclusion_date, remember_me_date }) {
  return dispatch => {
    dispatch(loading('Creating Task'));
    if (isStatic) {
      let task = { title, details, conclusion_date, remember_me_date };
      return dispatch(createTaskSuccess(task));
    }

    return axios
      .post(`${apiUrl}`, { title, details, conclusion_date, remember_me_date })
      .then(res => {
        console.log(res.data);
        dispatch(createTaskSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  };
}

export function createTaskSuccess(task) {
  return {
    type: ADD_TASK,
    payload: {
      task
    }
  };
}

export function deleteTask(id) {
  return dispatch => {
    dispatch(loading('Deleting task'));

    if (isStatic) {
      return dispatch(deleteTaskSuccess(id));
    }

    return axios
      .delete(`${apiUrl}/${id}`)
      .then(res => {
        dispatch(deleteTaskSuccess(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
}

export function deleteTaskSuccess(id) {
  return {
    type: DELETE_TASK,
    payload: {
      id
    }
  };
}

export function updateTask({
  _id,
  title,
  completed,
  details,
  conclusion_date,
  remember_me_date
}) {
  return dispatch => {
    dispatch(loading('Updating Task'));

    if (isStatic) {
      let task = {
        _id,
        title,
        completed,
        details,
        conclusion_date,
        remember_me_date
      };
      return dispatch(updateTaskSuccess(task));
    }

    return axios
      .put(`${apiUrl}/${_id}`, {
        _id,
        title,
        completed,
        details,
        conclusion_date,
        remember_me_date
      })
      .then(res => {
        dispatch(updateTaskSuccess(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
}

export function updateTaskSuccess(data) {
  return {
    type: UPDATE_TASK,
    payload: {
      _id: data._id,
      title: data.title,
      details: data.details,
      conclusion_date: data.conclusion_date,
      remember_me_date: data.remember_me_date
    }
  };
}

export function getAllTasks() {
  return dispatch => {
    dispatch(loading('Synching tasks'));

    if (isStatic) {
      return dispatch(getAllTasksSuccess(tasks));
    }

    return axios
      .get(apiUrl)
      .then(res => {
        dispatch(getAllTasksSuccess(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
}

export function getAllTasksSuccess(tasks) {
  return {
    type: GET_TASKS,
    payload: {
      tasks
    }
  };
}

export function getTaskById(id) {
  return dispatch => {
    dispatch(loading('Retrieving task'));

    if (isStatic) {
      let task = tasks.filter(task => task._id === id);
      return dispatch(getTaskByIdSuccess(task[0]));
    }

    return axios
      .get(`${apiUrl}/${id}`)
      .then(res => {
        dispatch(getTaskByIdSuccess(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
}

export function getTaskByIdSuccess(task) {
  return {
    type: GET_TASK,
    payload: {
      task
    }
  };
}

export function loading(text = 'Loading') {
  return {
    type: LOADING,
    payload: {
      text
    }
  };
}

export function filterCompletedTasks(active) {
  return {
    type: FILTER_COMPLETED_TASKS,
    payload: {
      active
    }
  };
}
