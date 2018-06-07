import React, { Fragment } from "react";

const Input = (props) => (
    <Fragment>
        <input input = {props.input} onChange = {props.updateInput} className = "input content is-large" type = {props.type} placeholder = {props.placeholder} />
    </Fragment>
);



export default Input;