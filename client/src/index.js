//==============================================================================
//Import Packages Required For App
//==============================================================================
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
  } from 'react-router-dom'

//==============================================================================
//Import CSS
//==============================================================================
import 'bulma/css/bulma.css';
import './index.css';

//==============================================================================
//Import Pages
//==============================================================================
//Import Sign On Page
import Auth from './auth/Auth';

//==============================================================================
//Render Webpage
//==============================================================================
ReactDOM.render(
<Router>
    <Switch>
        <Route exact path = "/" component = {Auth} />
    </Switch>
</Router>
, document.getElementById('root'));
