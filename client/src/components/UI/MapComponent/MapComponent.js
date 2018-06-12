import React from "react";
import "./MapComponent.css";

const mapClass = "box";

const MapComponent = ({ children }) => (
    <div id="mapid" className = {mapClass}>
        {children}
    </div>
);

export default MapComponent;