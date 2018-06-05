import React, { Component, Fragment } from 'react';
import requireAuth from '../requireAuth';

import Navbar from "../UI/Navbar/Navbar";

class Feature extends Component {
    render() {
        return (
            <Fragment>
                <Navbar />
                <div>Hey There! I'm a secret!</div>
            </Fragment>
        )
    }
}

export default requireAuth(Feature);