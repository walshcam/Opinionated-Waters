import React from "react";
import IndividualComment from "./../IndividualComment/IndividualComment";

//Pulls in the current featureID from the parent component's state

//Finds comments that relate to that featureID from the Comments Database

//Creates individual comments for each comment in Database

const CommentComponent = (props) => (
    <div className = "tile is-ancestor">
        <div className = "tile is-parent is-vertical">
            <div className = "tile is-child">
                <h1 className = "title">Comments:</h1>
            </div> 
            <IndividualComment />
        </div>
    </div>
);

export default CommentComponent;