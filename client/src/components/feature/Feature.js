//==============================================================================
//Import Packages & Components Required For Feature Page
//==============================================================================
//Packages Required
import React, { Component, Fragment } from 'react';
import requireAuth from '../requireAuth';
import axios from 'axios';
//Leaflet Context API
import { Map as LeafletMap, TileLayer, GeoJSON } from 'react-leaflet';
import { latLngBounds } from 'leaflet';
//Components Required
import Section from "../UI/Section/Section";
import Navbar from "../UI/Navbar/Navbar";
import MapComponent from "../UI/MapComponent/MapComponent";
import Input from "../UI/Input/Input";
//Comment Components
import CommentForm from "../UI/CommentSection/CommentForm/CommentForm";
import CommentComponent from "../UI/CommentSection/CommentComponent/CommentComponent";

//Information needed for leaflet
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const accessToken = 'pk.eyJ1Ijoid2Fsc2hjYW0iLCJhIjoiY2pod2s1Y3lkMDF2ZjNwcDhwcHZqa242ciJ9.O62o_MIG55mOB3UsvEuBNg';
const url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + accessToken;
const id = 'mapbox.satellite';

//Style for Chosen Searched Feature
const waterFeatureStyle = {
    color: "#00FFFF",
    weight: "5",
    opacity: "0.65"
}

class Feature extends Component {
//==============================================================================
//Render Map
//==============================================================================
    state = {
        bounds: latLngBounds([27, -81], [29, -80]),
        //Nominatim Input
        rawLocation: "",
        //Nominatim Output
        displayName: "",
        featureType: "",
        featureID: 0,
        //Bounding Box and its corrections
        geoJsonKey: 0,
        geoJsonData: {
            "type":"FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [27,-80]
                    }
                }
            ]
        }
    }

    //This handles the input field for the map search.
    inputHandler = (event) => {
        const inputValue = event.target.value;
        
        this.setState({
            rawLocation: inputValue
        })
    }

    //This alters the geoJSON when needed
    geoJSONData = (key, data, style) => {
        return(
        <GeoJSON
            key = {key}
            data = {data}
            style = {style}
        />)
    }

    //This changes the map based on the search query
    mapSearchHandler = () => {
        //Format Input For API call
        let correctedLocation = [...this.state.rawLocation];
        //Turn the input into a string and trim any spaces from both ends
        correctedLocation = correctedLocation.join('').trim();
        //Remove any double spaces
        correctedLocation = correctedLocation.replace(/ +(?= )/g,'');
        //Turn the spaces into "+" and turn it all into lowercase.     
        correctedLocation = correctedLocation.split(" ").join("+").toLowerCase();
        console.log(correctedLocation);

        axios.get(`https://nominatim.openstreetmap.org/search?q=${correctedLocation}&format=json&polygon_geojson=1&limit=1`)
            .then(response => {
                const data = response.data[0];
                console.log(data);
                let key = this.state.geoJsonKey + 1
                //Creation of Viewboxes
                const boundingBox = data.boundingbox;
                boundingBox.forEach((element, index, theArray) => {
                    theArray[index] = parseFloat(element);
                });
                const viewbox1 = [boundingBox[0], boundingBox[2]];
                const viewbox2 = [boundingBox[1], boundingBox[3]];

                this.setState({
                    bounds: latLngBounds(viewbox1,viewbox2),
                    displayName: data.display_name,
                    featureType: data.type,
                    featureID: parseInt(data.place_id, 16),
                    geoJsonData: {
                        "type":"FeatureCollection",
                        "features": [
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "type": data.geojson.type,
                                    "coordinates": data.geojson.coordinates
                                }
                            }
                        ]
                    },
                    geoJsonKey: key
                })
            })
            .catch(error => console.log(error))
    }

//==============================================================================
//Comments Section
//==============================================================================

    //Load initial comments
    commentsGetHandler = () => {
        axios.get("/feature")
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    //Save New Comment
    newCommentsPostHandler = () => {
        axios.post("/feature/:id", {
                //Data To Be Posted Goes Here
                place_id: this.state.featureID,
                heading: "Heading Goes Here",
                paragraph: "The Comment Goes Here",
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    //Delete Comment (Yours Only)
    CommentsDeleteHandler = (selectedComment) => {
        axios.delete("/feature/"+selectedComment._id)
            .then(response => {
                console.log(response);
                this.commentsGetHandler();
            })
            .catch(error => {
                console.log(error);
            })
    }

//==============================================================================
//Render Webpage
//==============================================================================
    render() {

        return (
            <Fragment>
                <Navbar />
                <div className = "container">
                    <Section>
                        <MapComponent>
                            <LeafletMap 
                                bounds = {this.state.bounds}
                                useFlyTo = {true}
                            > 
                                <TileLayer
                                    attribution= {attribution}
                                    url= {url}
                                    id = {id}
                                />
                                {this.geoJSONData(this.state.geoJsonKey, this.state.geoJsonData, waterFeatureStyle)}
                            </LeafletMap>
                        </MapComponent>
                    </Section>
                    <Section>
                        <Input
                            input = {this.state.rawLocation} 
                            updateInput = {this.inputHandler}
                            type = {"text"}
                            placeholder = {"Lake Michigan"}
                        />
                        <button onClick = {this.mapSearchHandler} className = "button is-large content is-primary">
                            Search
                        </button>
                    </Section>
                    <Section>
                        <CommentForm 
                            buttonText = {"Submit"}
                        />
                    </Section>
                    <Section>
                        <CommentComponent 
                            featureID = {this.state.featureID}
                        />
                    </Section>
                </div>
            </Fragment>
        )
    }
}

export default requireAuth(Feature);