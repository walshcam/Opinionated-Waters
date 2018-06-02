import React, { Fragment } from "react";

const Input = (props) => (
    <Fragment>
        <input class = "input is-large" type = {props.type} placeholder = {props.placeholder} />
    </Fragment>
);



export default Input;