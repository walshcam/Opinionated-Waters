import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

//==============================================================================
//Action Upon Signin
//==============================================================================

//This is used when the onSubmit function is called
export const signup = (formProps, callback) => async dispatch => {
    try{
        //Await is used to ensure this action is taken before moving forward
        const response = await axios.post('http://localhost:3001/signup', formProps);

        dispatch({ type: AUTH_USER, payload: response.data.token });
        //This saves the token to local storage
        localStorage.setItem('token', response.data.token);
        //The callback is to redirect the user to the content page
        callback();
    } catch(error) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    }
};

//==============================================================================
//Action Upon Signout
//==============================================================================

export const signout = () => {
    //Clears the token from the local storage
    localStorage.removeItem('token');

    //Clears the token from the react state
    return {
        type: AUTH_USER,
        payload: ''
    };
};