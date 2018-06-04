//==============================================================================
//Import Packages Required For App
//==============================================================================
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//==============================================================================
//Import Components
//==============================================================================
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import AuthWrapper from './AuthWrapper/AuthWrapper';

class Signin extends Component {
    state = {
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 7
            },
            valid: false,
            touched: false
        }
    }
    
    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        return (
            <AuthWrapper>
                <div className = "tile is-child box">
                <h1 className = "title">Sign In</h1>
                    <form>
                        <Input
                        type = {"email"} 
                        placeholder = {"Email"}
                        />
                        <Input 
                        type = {"password"}
                        placeholder = {"Password"}
                        />
                        <div className = "level">
                            <div className = "level-left">
                                <Button
                                link = {"/signup"} 
                                text = {"Submit"}
                                />
                            </div>
                            <div className = "level-right">
                                <Button
                                link = {"/signup"}
                                text = {"New User"}
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

export default Signin;