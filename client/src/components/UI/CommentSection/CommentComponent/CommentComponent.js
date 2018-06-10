//==============================================================================
//Import Packages & Components Required For Comment Section
//==============================================================================
//Packages Required
import React from "react";
//Components
import IndividualComment from "./../IndividualComment/IndividualComment";

const CommentComponent = (props) => (
    <div className = "tile is-ancestor">
        <div className = "tile is-parent is-vertical">
            <div className = "tile is-child">
                <h1 className = "title">Comments:</h1>
            </div>
            {props.getComments.map(comment => (
                <IndividualComment
                    key = {comment._id} 
                    heading = {comment.heading}
                    paragraph = {comment.paragraph}
                />
            ))} 
        </div>
    </div>
);

export default CommentComponent;