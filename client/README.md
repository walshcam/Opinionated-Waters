# OpinWater

## WHAT IS IT?

This is a web app that utilizes the MERN stack to allow users to input comments about any body of water on the globe. Other users can then log in, read existing comments, and input their own.

### AUTHORIZATION

Secure authorization is implimented using passport and bcrypt. At this time, sign in is only available using the local method. 

Passwords are salted and hashed with bcrypt before being stored in the Mongo database. 

Passport is used to create and verify the JWT (JSON Web Token). The JWT is used to verify the identity of the user during every API call to the backend of the application.

Redux is used to store the user's login information. This allows the webpage to be refreshed without the user needing to sign on again.

### MAP

The map is made using leaflet's react package. Mapbox's satellite overlay is utilized over OpenStreetMap data to create the base layer of the map.

GeoJSON data is found using the nominatim API to create a polygon over any body of water.

![Map Functionality](./readmeImages/MapFunction.gif)

### COMMENTS

Comments are passed to the mongo database and retrieved based on what body of water the user has searched for.

![Comment Functionality](./readmeImages/CommentFunction.gif)

## TECHNOLOGIES APPLIED

- MongoDB
    - mongoose
    - morgan
- node.js
    - Express
        - bcrypt-nodejs
        - body-parser
        - cors
        - jwt-simple
        - passport
        - passport-jwt
        - passport-local
- React
    - axios
    - react-leaflet
    - react-router-dom
    - Redux
        - redux
        - react-redux
        - redux-form
        - redux-thunk
- CSS
    - Bulma