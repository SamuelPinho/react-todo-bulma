import React, { Fragment } from 'react'

const TextInput = ({ id, name, value, placeholder, className, autoFocus, onChange, onBlur }) => {
    return (
        <Fragment >
            <input
                type="text"
                className={"input " + className}
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                autoFocus={autoFocus}
                onChange={onChange}
                onBlur={onBlur}
            />
        </Fragment>
    );
};

export default TextInput;