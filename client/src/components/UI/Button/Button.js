import React from "react";
import { Link } from 'react-router-dom'

const Button = (props) => (
    <a className = "button is-large content is-primary">
        <Link to = {props.link}>{props.text}</Link></a>
)

export default Button;