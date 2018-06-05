import React from "react";
import "./AuthWrapper.css";

const AuthWrapper = ({children}) => (
    <div className = "container">
        <div className = "tile is-ancestor is-height">
            <div className = "tile is-4 is-hidden-touch">
            </div>
            <div className = "tile is-4">
                <div className = " tile is-parent is-vertical">
                    <div className = "tile is-child">
                    </div>
                    {children}
                    <div className = "tile is-child">
                    </div>
                </div>
            </div>
            <div className = "tile is-4 is-hidden-touch">
            </div>
        </div>
    </div>
)

export default AuthWrapper;