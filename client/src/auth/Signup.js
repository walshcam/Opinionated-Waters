//==============================================================================
//Import Packages Required For App
//==============================================================================
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

//==============================================================================
//Import Components
//==============================================================================
import Button from "../components/UI/Button/Button";
import AuthWrapper from './AuthWrapper/AuthWrapper';

class Signup extends Component {
    
    onSubmit = (formProps) => {
        console.log(formProps);
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
                    </form>
                </div>
                <div className = "tile is-child">
                    <h1>This Is A Test</h1>
                </div>
            </AuthWrapper>
        );
    }
}

export default reduxForm({ form: 'signup' })(Signup);