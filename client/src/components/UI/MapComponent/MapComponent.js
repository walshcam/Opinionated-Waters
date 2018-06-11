import React from "react";
import "./MapComponent.css";

const mapStyle = {
    height: '90vh'
};

const mapClass = "box";

const MapComponent = ({ children }) => (
    <div id="mapid" className = {mapClass} style = {mapStyle}>
        {children}
    </div>
);

export default MapComponent;