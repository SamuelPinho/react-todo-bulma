import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const EditButton = ({ _id }) => {
    return (
        <Fragment>
            <Link to={`/update/${_id}`}>
                <button className="button is-primary is-small">
                    Edit
            </button>
            </Link>
        </Fragment>
    )
};

export default EditButton;