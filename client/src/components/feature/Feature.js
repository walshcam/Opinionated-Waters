import React, { Component } from 'react';
import requireAuth from '../requireAuth';

class Feature extends Component {
    render() {
        return <div>Hey There! I'm a secret!</div>
    }
}

export default requireAuth(Feature);