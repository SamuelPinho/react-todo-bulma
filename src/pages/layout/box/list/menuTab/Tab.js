import React from 'react';

const Tab = ({ text, quantity, className, onClick }) => {

    return (
        <li className={className} onClick={onClick}>
            <a>
                {text} &nbsp;
                <span className="tag is-dark is-rounded is-small">
                    {quantity}
                </span>
            </a>
        </li>
    );
};

export default Tab;