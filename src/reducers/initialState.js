import { tasks } from '../actions/tasks';

const { REACT_APP_NODE_ENV } = process.env;
const isStatic = REACT_APP_NODE_ENV === 'static';

const initialState = {
  tasks: isStatic ? tasks : [],
  task: null,
  loading: {
    active: false,
    text: ''
  },
  filterCompleted: {
    active: false,
    filteredTasks: []
  }
};

export default initialState;
