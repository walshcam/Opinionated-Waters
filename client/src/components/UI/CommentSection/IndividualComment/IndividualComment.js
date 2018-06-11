import React from "react";

const IndividualComment = (props) => (
    <div className = "tile is-child box">
        <p className = "title has-text-primary">{props.heading}</p>
        <p>{props.paragraph}</p>
    </div>
);

export default IndividualComment;