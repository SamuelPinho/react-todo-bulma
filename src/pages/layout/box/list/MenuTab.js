import React from 'react';
import { connect } from 'react-redux';

// Actions
import { filterCompletedTasks } from '../../../../actions/taskActions';

// Components
import Tab from './menuTab/Tab';

// Redux state to component props
const mapStateToProps = state => {
    return {
        tasks: state.taskReducer.tasks,
        filterCompleted: state.taskReducer.filterCompleted
    };
};

// Redux dispatach to component props
const mapDispatchToProps = dispatch => {
    return {
        applyFilter: (active) => dispatch(filterCompletedTasks(active)),
    }
}

const MenuTab = ({ tasks, filterCompleted, applyFilter }) => {
    const numberOfCompletedTasks = tasks
        .filter(task => task.completed).length;

    return (
        <div className="tabs is-fullwidth has-text-weight-bold">
            <ul>
                <Tab
                    text="Incomplete"
                    quantity={(tasks.length - numberOfCompletedTasks)}
                    className={filterCompleted.active ? '' : 'is-active'}
                    onClick={() => applyFilter(false)}
                />

                <Tab
                    text="Completed"
                    quantity={numberOfCompletedTasks}
                    className={filterCompleted.active ? 'is-active' : ''}
                    onClick={() => applyFilter(true)}
                />
            </ul>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuTab);