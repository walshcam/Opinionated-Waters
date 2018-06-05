//==============================================================================
//Import Packages Required For App
//==============================================================================
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom'

//==============================================================================
//Import CSS
//==============================================================================
import 'bulma/css/bulma.css';
import './index.css';

//==============================================================================
//Import Reducers & Pages
//==============================================================================
//Reducers
import reducers from './reducers';
//Pages
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Feature from './components/feature/Feature';

//==============================================================================
//Render Webpage
//==============================================================================
const store = createStore(
    reducers,
    //this retrieves any authenticated tokens from local storage so refresh works
    {
        auth: { authenticated: localStorage.getItem('token') }
    },
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
<Provider store = {store}>    
    <Router>
        <Switch>
            <Route exact path = "/" component = {Signin} />
            <Route path = "/signup" component = {Signup} />
            <Route path = "/feature" component = {Feature} />
        </Switch>
    </Router>
</Provider>, 
document.getElementById('root'));
