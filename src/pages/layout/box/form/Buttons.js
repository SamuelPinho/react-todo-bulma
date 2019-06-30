import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const Buttons = ({ deleteTask, id }) => {
    let deleteTaskButton =
        <button className="button is-danger" type="button" onClick={deleteTask}>
            Delete Task
        </button>

    return (
        <Fragment>
            <div className="field">
                <div className="level">
                    <div className="level-left">
                        {id ? deleteTaskButton : ''}
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <Link to='/' className="control">
                                <button className="button is-text" type="button">
                                    Cancel
                                </button>
                            </Link>
                        </div>
                        <div className="level-item">
                            <button type="submit" className="button is-link">
                                {id ? 'Update Task' : 'Save Task'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Buttons;