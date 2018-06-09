import React, { Fragment } from "react";
import Button from "./../../Button/Button"

const CommentForm = (props) => (
    <Fragment>
        {/* Heading Input */}
        <div class = "field">
            <label class = "label">Heading Input</label>
            <div class = "control">
                <input class = "input" type = "text" placeholder = "New Comment Heading!" />
            </div>
        </div>

        {/* Comment Textbox */}
        <div class="field">
            <label class="label">Comment</label>
            <div class="control">
                <textarea class="textarea" placeholder="New Comment"></textarea>
            </div>
        </div>

        <div class="control">
            <Button 
                text = {props.buttonText}
            />
        </div>
    </Fragment>
);



export default CommentForm;