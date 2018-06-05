//==============================================================================
//Import Packages Required For Reducers
//==============================================================================
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

//==============================================================================
//Import Reducers
//==============================================================================
//Reducer in charge of user authentication
import auth from "./auth"

//==============================================================================
//Export The Combined Reducers
//==============================================================================
export default combineReducers({
    auth,
    form: formReducer
});