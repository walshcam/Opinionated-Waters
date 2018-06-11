//==============================================================================
//Import Packages and Components Required For App
//==============================================================================
//Required Packages
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from "../../actions"
//Required Components
import Button from "../UI/Button/Button";
import AuthWrapper from './AuthWrapper/AuthWrapper';

//==============================================================================
//Functions and Validation
//==============================================================================

const renderField = ({
    input, placeholder, type, className, autoComplete,
    meta: { touched, error }
}) => (
    <div className = "field">
        <div className = "control">
            <input {...input} placeholder = {placeholder} type = {type} className = {className} autoComplete = {autoComplete} />
            {touched && (error && <p className = "help is-danger">{error}</p>)}
        </div>
    </div>
)

//Validation Variables
//=============================================
//required
const required = value => (value ? undefined : 'Required')
//isEmail
const emailValidation = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 
"Not an email address" : undefined
//isLongEnough
const passwordLength = value => value && value.length < 5 ? 
"Password must be 6 characters or more" : undefined
;

class Signup extends Component {

    state = {
        invalidEmail : "",
        invalidPassword : ""
    }
    
    //This fires the signup action
    onSubmit = (formProps) => {
        this.props.signup(formProps, () => {
            this.props.history.push('/feature');
        });
    };

//==============================================================================
//Rendered Components
//==============================================================================

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
                            component = {renderField}
                            placeholder = "Email"
                            autoComplete = "none"
                            validate = {[required, emailValidation]}
                        />
                        <Field
                            name = "password"
                            className = "input content is-large"
                            type = "password"
                            component = {renderField}
                            placeholder = "Password"
                            autoComplete = "none"
                            validate = {[required, passwordLength]}
                        />
                        <div className = "level">
                            <div className = "level-left">
                                <Button
                                text = {"Submit"}
                                />
                            </div>
                            <div className = "level-right">
                                <Link to = "/">
                                    <Button
                                        text = {"Existing Account"}
                                    />
                                </Link>
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