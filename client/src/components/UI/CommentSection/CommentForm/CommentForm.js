import React, { Fragment } from "react";
import Button from "./../../Button/Button"



const CommentForm = (props) => (
    <Fragment>
        {/* Heading Input */}
        <div className = "field">
            <label className = "label">Heading Input</label>
            <div className = "control">
                <input 
                    className = "input" 
                    type = "text" 
                    placeholder = "New Comment Heading!" 
                    onChange = {props.headingOnChange}
                    value = {props.headingText}
                />
            </div>
        </div>

        {/* Comment Textbox */}
        <div className="field">
            <label className="label">Comment</label>
            <div className="control">
                <textarea 
                    className="textarea" 
                    placeholder="New Comment"
                    onChange = {props.commentOnChange}
                    value = {props.commentText}
                >
                </textarea>
            </div>
        </div>

        <div className = "control">
            <Button 
                text = {props.buttonText}
                onClick = {props.onClick}
            />
        </div>
    </Fragment>
);



export default CommentForm;