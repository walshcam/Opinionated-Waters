//==============================================================================
//Import Packages Required For App
//==============================================================================
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import AuthWrapper from './AuthWrapper/AuthWrapper';
import Button from '../UI/Button/Button';

class Signout extends Component {
    //triggers signout action once page is loaded
    componentDidMount() {
        this.props.signout();
    }

    render() {
        return (
            <AuthWrapper>
                <div className = "tile is-child box">
                    <h1 className = "title">Thank you for visiting!</h1>
                    <div className = "level">
                        <div className = "level-left">
                            <Link to = "/">
                                <Button
                                    text = {"Sign In"}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </AuthWrapper>
        );
    }
}

export default connect(null, actions)(Signout);