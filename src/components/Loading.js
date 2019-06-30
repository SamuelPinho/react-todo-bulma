import React, { Fragment } from 'react'
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const mapStateToProps = state => {
    return {
        loadingText: state.taskReducer.loading.text
    }
}

const Loading = ({ loadingText }) => {
    return (
        <Fragment>
            <div className="notification is-warning">
                <span className='has-text-weight-bold has-text-grey'>
                    <FontAwesomeIcon
                        icon={['fas', 'sync-alt']}
                        className='fa-spin'
                    />
                    &nbsp;{loadingText}
                </span>
            </div>

        </Fragment>
    );
};

export default connect(mapStateToProps)(Loading);