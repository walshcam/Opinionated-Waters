import React, { Fragment } from "react";

const Input = (props) => (
    <Fragment>
        <input value = {props.input} id = {props.id} onChange = {props.updateInput} className = "input content is-large" type = {props.type} placeholder = {props.placeholder} />
    </Fragment>
);



export default Input;