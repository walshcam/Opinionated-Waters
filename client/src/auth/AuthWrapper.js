import React from "react";

const AuthWrapper = ({children}) => (
    <div className = "container">
        <div className = "tile is-ancestor is-4">
            <div className = " tile is-parent is-vertical">
                {children}
            </div>
        </div>
    </div>
)

export default AuthWrapper;