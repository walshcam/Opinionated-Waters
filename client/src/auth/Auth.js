import React, { Component } from 'react';

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
            <div>
                <form>
                    <Input />
                    <Input />
                    <Button />

                </form>
            </div>
        );
    }
}

export default Auth;