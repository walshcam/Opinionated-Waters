import React from "react";

const IndividualComment = (props) => (
    <div className = "tile is-child box">
        <p className = "title">{props.heading}</p>
        <p>{props.paragraph}</p>
    </div>
);

export default IndividualComment;