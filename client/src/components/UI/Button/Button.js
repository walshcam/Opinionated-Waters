import React from "react";

const Button = (props) => (
    <button onClick = {props.onClick} className = "button is-large content is-primary">
        {props.text}
    </button>
)

export default Button;