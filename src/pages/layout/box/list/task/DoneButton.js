import React, { Fragment } from 'react';
import { connect } from 'react-redux';

// Actions
import { updateTask } from '../../../../../actions/taskActions';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux dispatch to component props
const mapDispatchToProps = dispatch => {
    return {
        updateTask: task => dispatch(updateTask(task))
    }
}

const DoneButton = ({ task, updateTask }) => {
    // Takes the task passed and set completed or uncompleted to it
    const changeCompletedAttibute = (e, task) => {
        e.preventDefault();

        task.completed = !task.completed;
        updateTask(task);
    }

    return (
        <Fragment>
            <span className="icon is-primary">
                <a onClick={(e) => changeCompletedAttibute(e, task)}>
                    <FontAwesomeIcon icon={
                        ['far', task.completed ? 'check-circle' : 'circle']
                    } />
                </a>
            </span>
        </Fragment>
    );
};

export default connect(null, mapDispatchToProps)(DoneButton);