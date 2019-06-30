import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'moment';

// Actions
import {
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from '../../../actions/taskActions';

// Components
import Inputs from './form/Inputs';
import Buttons from './form/Buttons';

// Redux dipstach to component props
const mapDispatchToProps = dispatch => {
  return {
    getTaskById: id => dispatch(getTaskById(id)),
    createTask: task => dispatch(createTask(task)),
    updateTask: task => dispatch(updateTask(task)),
    deleteTask: _id => dispatch(deleteTask(_id))
  };
};

// Redux state to component props
const mapStateToProps = state => {
  return {
    task: state.taskReducer.task
  };
};

class Form extends Component {
  constructor() {
    super();

    this.state = {
      _id: '',
      title: '',
      details: '',
      remember_me_date: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Executes when component has already been mounted
  componentDidMount() {
    // Gets the id that is passed in url /:id
    const { id } = this.props.match.params;
    const { task } = this.props;

    // If it's passed an Id
    if (id) {
      // If there's already a task in redux store and it's equal to the id passed
      if (task && task._id === id) {
        this.fillInputWithTask(task);
      } else {
        // Otherwise, get the task from db
        this.props.getTaskById(id);
      }
    }
  }

  componentDidUpdate() {
    const { id } = this.props.match.params;
    const { task } = this.props;

    // If it's passed an Id
    if (id) {
      // If there's already a task in redux store and state still without it
      if (task && task._id === id && this.state._id === '') {
        this.fillInputWithTask(task);
      }
    }
  }

  // Formats date and sets the state with the passed task
  fillInputWithTask(task) {
    task.remember_me_date = Moment.utc(task.remember_me_date).format('YYYY-MM-DD');
    this.setState(task);
  }

  handleDelete(id) {
    this.props.history.push('/');
    this.props.deleteTask(id);
  }

  // Updates a task if there's an Id passed
  // Creates a task if wasn't passed and Id
  handleSubmit(event) {
    event.preventDefault();

    if (this.state._id) {
      this.props.updateTask(this.state);
    } else {
      this.props.createTask(this.state);
    }

    // redirect to home page
    this.props.history.push('/');
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    // Gets the id that is passed in url /:id
    let { id } = this.props.match.params;

    // If there's no id passed, then it's a page for creating a task
    if (id === undefined) {
      id = null;
    }

    return (
      <Fragment>
        <h1 className="title has-text-grey-dark">{id ? 'Edit' : 'Create'} Task</h1>
        <form onSubmit={this.handleSubmit}>
          <Inputs state={this.state} onChange={this.handleChange} />
          <Buttons deleteTask={() => this.handleDelete(id)} id={id} />
        </form>
      </Fragment>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form)
);
