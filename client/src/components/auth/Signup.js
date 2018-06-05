//==============================================================================
//Import Packages Required For App
//==============================================================================
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from "../../actions"

//==============================================================================
//Import Components
//==============================================================================
import Button from "../UI/Button/Button";
import AuthWrapper from './AuthWrapper/AuthWrapper';

class Signup extends Component {
    //This fires the signup action
    onSubmit = (formProps) => {
        this.props.signup(formProps, () => {
            this.props.history.push('/feature');
        });

    };

    render () {
        //Supplied by redux-form
        const { handleSubmit } = this.props;

        return (
            <AuthWrapper>
                <div className = "tile is-child box">
                    <h1 className = "title">New User</h1>
                    <form onSubmit = {handleSubmit(this.onSubmit)}>
                        <Field
                            name = "email"
                            className = "input content is-large"
                            type = "text"
                            component = "input"
                            placeholder = "Email"
                            autoComplete = "none"
                        />
                        <Field
                            name = "password"
                            className = "input content is-large"
                            type = "password"
                            component = "input"
                            placeholder = "Password"
                            autoComplete = "none"
                        />
                        <div className = "level">
                            <div className = "level-left">
                                <Button
                                text = {"Submit"}
                                />
                            </div>
                        </div>
                        <div className = "level">
                            <div className = "level-item">
                                <p className = "level-item">{this.props.errorMessage}</p>
                            </div>
                        </div>
                    </form>
                </div>
            </AuthWrapper>
        );
    }
}

//This fires the error message from the action component
function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
)(Signup); 