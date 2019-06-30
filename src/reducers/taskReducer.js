import {
  ADD_TASK,
  GET_TASKS,
  DELETE_TASK,
  UPDATE_TASK,
  LOADING,
  GET_TASK,
  FILTER_COMPLETED_TASKS
} from '../actions/actionTypes';
import initialState from './initialState';

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const { task } = action.payload;

      return {
        ...state,
        tasks: [...state.tasks, task],
        loading: { active: false }
      };

    case GET_TASKS:
      return {
        ...state,
        tasks: [...action.payload.tasks],
        loading: { active: false }
      };

    case GET_TASK:
      return { ...state, task: { ...action.payload.task }, loading: { active: false } };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload.id),
        loading: { active: false }
      };

    case UPDATE_TASK:
      const updatedTasks = state.tasks.map(task => {
        if (task._id === action.payload._id) {
          return { ...task, ...action.payload };
        }
        return task;
      });

      return {
        ...state,
        tasks: [...updatedTasks],
        task: { ...action.payload },
        loading: { active: false }
      };

    case LOADING:
      return {
        ...state,
        loading: {
          active: true,
          text: action.payload.text
        }
      };

    case FILTER_COMPLETED_TASKS:
      return {
        ...state,
        filterCompleted: {
          active: action.payload.active
        }
      };

    default:
      return state;
  }
};

export default rootReducer;
