import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {

    state = {
        navbarState: "navbar-burger burger",
        dropdownState: "navbar-menu"
    }

//Function That allows the Navbar Burgers To Work
    activeBurger = () => {
        this.state.navbarState === "navbar-burger burger" ?
        this.setState({ navbarState: "navbar-burger burger is-active",
                        dropdownState: "navbar-menu is-active"
                    }) :
        this.setState({ navbarState: "navbar-burger burger",
                        dropdownState: "navbar-menu"
                    })
    }

    render() {

        return (
            <nav className = "navbar is-transparent">
                <div className = "navbar-brand">
                    <div className = "navbar-item">
                        <p>Opinionated Waters</p>
                    </div>
                    <div id = "navbar-navbar" className = {this.state.navbarState} onClick = {this.activeBurger}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className = {this.state.dropdownState}>
                    <div className = "navbar-end">
                        <Link to = "/signout" className = "navbar-item">
                            Sign Out
                        </Link>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;