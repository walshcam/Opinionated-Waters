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
// HEROKU ONLY
const accessToken = process.env.MAPBOX_ACCESSTOKEN;
//Components Required
import Section from "../UI/Section/Section";
import Navbar from "../UI/Navbar/Navbar";
import MapComponent from "../UI/MapComponent/MapComponent";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
//Comment Components
import CommentForm from "../UI/CommentSection/CommentForm/CommentForm";
import CommentComponent from "../UI/CommentSection/CommentComponent/CommentComponent";
//CSS Files
import "./feature.css";

//Information needed for leaflet
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
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
//State
//==============================================================================
    state = {
        bounds: latLngBounds([27, -81], [29, -80]),
        //Nominatim Input
        rawLocation: "",
        rawLocation2: "",
        rawLocation3: "",
        //Nominatim Output
        displayName: "",
        featureType: "",
        featureID: "",
        buttonLoadingClass: "button is-large content is-primary",
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
        },

        //New Comment Data
        heading: "",
        paragraph: "",
        comments: []
    }

//==============================================================================
//Map Functions
//==============================================================================

    //This manipulates the display_name state for the title display
    displayTitle = () => {

    }

    //This handles the input field for the map search.
    inputHandler = (event) => {
        const inputValue = event.target.value;
        
        this.setState({
            rawLocation: inputValue
        })
    }

    inputHandler2 = (event) => {
        const inputValue = event.target.value;
        
        this.setState({
            rawLocation2: inputValue
        })
    }

    inputHandler3 = (event) => {
        const inputValue = event.target.value;
        
        this.setState({
            rawLocation3: inputValue
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
        //Loading Button
        this.setState({
            buttonLoadingClass: "button is-large content is-primary is-loading"
        })
        //Format Input For API call
        let correctedLocation = [...this.state.rawLocation].concat([" "],[...this.state.rawLocation2],[" "],[...this.state.rawLocation3]);
        console.log(correctedLocation);
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

                //Change display_name for title
                let displayNameFormatting = data.display_name;
                displayNameFormatting = displayNameFormatting.split(",");
                displayNameFormatting = displayNameFormatting[0];
                displayNameFormatting = displayNameFormatting.toString();


                this.setState({
                    rawLocation: "",
                    rawLocation2: "",
                    rawLocation3: "",
                    buttonLoadingClass: "button is-large content is-primary",
                    bounds: latLngBounds(viewbox1,viewbox2),
                    displayName: displayNameFormatting,
                    featureType: data.type,
                    featureID: data.place_id,
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
                //Get comments after each search
                this.commentsGetHandler();
            })
            .catch(error => console.log(error))
    }

//==============================================================================
//Comments Section
//==============================================================================

//Comments onChange Handlers
//============================

    headingChange = (event) => {
        this.setState({heading: event.target.value})
    }

    commentChange = (event) => {
        this.setState({paragraph: event.target.value})
    }

//Comments Axios
//============================

    //Load Initial Comments
    componentDidMount() {
        this.commentsGetHandler();
    }

    //Load initial comments
    commentsGetHandler = () => {
        axios({
            method: 'get',
            //LocalHost
            url: `http://localhost:3001/feature/${this.state.featureID}`,
            // //Heroku
            // url: `https://opinwater.herokuapp.com/feature/${this.state.featureID}`,
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response);
            this.setState({
                comments: response.data
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    //Save New Comment
    newCommentsPostHandler = () => {
        axios({
            method: 'post',
            //LocalHost
            url: `http://localhost:3001/feature/${this.state.featureID}`,
            // //Heroku
            // url: `https://opinwater.herokuapp.com/feature/${this.state.featureID}`,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                place_id: this.state.featureID,
                heading: this.state.heading,
                paragraph: this.state.paragraph
            }
        })
        .then(response => {
            console.log(response);
            //Clear out input fields
            this.setState({
                heading: "",
                paragraph: ""
            });
            //Reload comments to include the one just included
            this.commentsGetHandler();
        })
        .catch(error => {
            console.log(error);
        })
    }

    //Delete Comment (Yours Only)
    CommentsDeleteHandler = (selectedComment) => {
        axios.delete("https://opinwater.herokuapp.com/feature/"+selectedComment._id)
            .then(response => {
                console.log(response);
                this.setState({
                    paragraph: response.data
                });
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
                    <div id = "mapMediaQuery">
                        <Section>
                            <div id = "featureHeader" className = "subtitle has-text-primary">
                                {this.state.displayName}
                            </div>       
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
                    </div>
                    <div id = "contentMediaQuery">
                        <Section>
                            <Input
                                input = {this.state.rawLocation} 
                                updateInput = {this.inputHandler}
                                type = {"text"}
                                placeholder = {"Lake Michigan"}
                            />
                            <Input
                                id = {"rawLocation2"}
                                input = {this.state.rawLocation2} 
                                updateInput = {this.inputHandler2}
                                type = {"text"}
                                placeholder = {"State or City (Optional)"}
                            />
                            <Input
                                id = {"rawLocation3"}
                                input = {this.state.rawLocation3} 
                                updateInput = {this.inputHandler3}
                                type = {"text"}
                                placeholder = {"Country (Optional)"}
                            />
                            <Button
                                onClick = {this.mapSearchHandler}
                                text = {"Search"}
                            />
                        </Section>
                        <Section>
                            <CommentForm 
                                headingText = {this.state.heading}
                                headingOnChange = {this.headingChange}
                                commentText = {this.state.paragraph}
                                commentOnChange = {this.commentChange}
                                buttonText = {"Submit"}
                                onClick = {this.newCommentsPostHandler}
                            />
                        </Section>
                        <Section>
                            <CommentComponent
                                getComments = {this.state.comments} 
                                deleteComments = {() => this.CommentsDeleteHandler()}
                            />
                        </Section>
                    </div>
            </Fragment>
        )
    }
}

export default requireAuth(Feature);