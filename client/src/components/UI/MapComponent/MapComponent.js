import React from "react";
import "./MapComponent.css";

const mapStyle = {
    height: '90hv'
}

const MapComponent = ({ children }) => (
    <div id="mapid" style = {mapStyle}>
        {children}
    </div>
);

export default MapComponent;