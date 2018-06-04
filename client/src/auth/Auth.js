//==============================================================================
//Import Packages Required For App
//==============================================================================
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

//==============================================================================
//Import Components
//==============================================================================
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import AuthWrapper from './AuthWrapper/AuthWrapper';

class Auth extends Component {
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
                                text = {"Submit"}
                                />
                            </div>
                            <div className = "level-right">
                                <Button
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

export default Auth;