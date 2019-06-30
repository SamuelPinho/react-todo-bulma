import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { updateTask } from '../../../../actions/taskActions';

// Components
import TextInput from '../../../../components/TextInput';
import DoneButton from './task/DoneButton';
import EditButton from './task/EditButton';

// Redux dispatch to component props
const mapDispatchToProps = dispatch => {
    return {
        updateTask: task => dispatch(updateTask(task))
    }
}

class Task extends Component {
    constructor() {
        super();

        this.state = {
            title: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    // Executes when component has already been mounted
    componentDidMount() {
        const { task } = this.props;

        if (task) {
            this.setState(task);
        }
    }

    // Executes when component is updated
    componentDidUpdate() {
        const { task } = this.props;

        // Just setState when there's a task and none state before
        if (task && (this.state.title !== task.title)) {
            if (!this.state.title === '') {
                this.setState(task);
            }
        }
    }

    // Change state whenever a change is made on an input
    handleChange(event) {
        this.setState({
            title: event.target.value
        });
    }

    // Update the task whenever the input lost it's focus
    handleBlur() {
        const { task } = this.props;
        if (task.title !== this.state.title) {
            task.title = this.state.title;
            this.props.updateTask(task);
        }
    }

    render() {
        const { task } = this.props;

        return (
            <div className="box" key={task._id}>
                <div className="columns is-mobile">

                    <div className="column is-1 is-centered">
                        <DoneButton task={task} />
                    </div>

                    <div className="column  is-9">
                        <TextInput
                            id={task._id}
                            name={'title'}
                            value={this.state.title}
                            className="is-shadowless"
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                        />
                    </div>

                    <div className="column is-2 is-centered" >
                        <EditButton _id={task._id} />
                    </div>

                </div>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(Task);