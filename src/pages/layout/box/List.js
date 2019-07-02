import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Actions
import { getAllTasks } from '../../../actions/taskActions';

// Components
import CreateButton from '../../../components/CreateButton';
import Task from './list/Task';
import MenuTab from './list/MenuTab';

// Redux state to component props
const mapStateToProps = state => {
  return {
    allTasks: state.taskReducer.tasks,
    loading: state.taskReducer.loading,
    filterActive: state.taskReducer.filterCompleted.active
  };
};

// Redux dispatch to component props
const mapDispatchToProps = dispatch => {
  return {
    getAllTasks: () => dispatch(getAllTasks())
  };
};

class List extends Component {
  // Executes when component has already been mounted
  componentDidMount() {
    const { loading } = this.props;

    // Gets all the tasks from db if it wasn't triggered before
    // if (!loading.active) {
    //   this.props.getAllTasks();
    // }
  }

  render() {
    const { allTasks } = this.props;
    const { loading } = this.props;
    const { filterActive } = this.props;

    let taskListComponent = '';
    let tasks = allTasks;

    tasks = tasks.filter(task => task.completed === filterActive);

    // Fetching has been completed, but there's no task created at all
    if (!allTasks.length && !loading.active) {
      taskListComponent = (
        <Fragment>
          <div className="box">
            <h1>There's no task created</h1>
          </div>
        </Fragment>
      );
    }
    // Fetching has been completed, but there's no task at this filter
    else if (!tasks.length && !loading.active) {
      taskListComponent = (
        <Fragment>
          <div className="box">
            <h1>There's no task here</h1>
          </div>
        </Fragment>
      );
    }
    // Fetching has been completed and some task was retrieved
    else {
      taskListComponent = (
        <Fragment>
          {tasks.map(task => (
            <Task task={task} key={task._id} />
          ))}
        </Fragment>
      );
    }

    return (
      <div>
        <CreateButton />
        <MenuTab />
        <div className="is-task-list">{taskListComponent}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
