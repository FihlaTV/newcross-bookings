import * as actionTypes from '../actions/index';
import moment from 'moment';

const authError = (state, action) => {
    return {...state, authenticationError: true,  authenticationRequested:false}
}

const authSuccess = (state, action) => {
    return {...state, isAuthenticated: true, authenticationRequested:false}
}

const authRequest = (state, action) => {
    return {...state, authenticationRequested: true}
}

const itemsHasErrored = (state, action) => {
    return {...state, hasErrored: true }
}

const itemIsLoading = (state, action) => {
    return {...state, isLoading: true}
}


const itemsFetchDataSuccess =(state, action) =>{
    let result = {...state, 
        skills: action.response.skills.map((item,index) => ({value:index, label:item})), //convert it to object to populate select
        isLoading: false,
        isReady:true
    };
    return result;
}



const updateProperty = (state, action) => {
    let result = {...state, 
        formData : {...state.formData, [action.prop] : action.value}
    };
    return result;
}

const addAdditionalSKill = (state, action) => {
    let result = {...state, 
            skills : [...state.skills, {value:state.skills.length ,label:action.label }]
        };
    return result;
}


const initialState = {
    skills: [],
    formData : {selectedSkills: [],
                clientSummary: '',
                startDate: moment(),
                endDate: '',
                genderPreference: {}            
            },
    hasErrored: false,
    isLoading: false,
    authenticationRequested: false,
    isAuthenticated: false,
    authenticationError: false,
    isReady: false
};

const ACTION_HANDLERS = {
    [actionTypes.AUTH_REQUEST] : (state, action) => authRequest(state,action),
    [actionTypes.AUTH_ERROR] : (state, action) => authError(state,action),
    [actionTypes.AUTH_SUCCESS] : (state, action) => authSuccess(state,action),
    [actionTypes.ITEM_REQUEST_SUCCESS] : (state, action) => itemsFetchDataSuccess(state,action),
    [actionTypes.ITEMS_HAS_ERRORED] : (state, action) => itemsHasErrored(state,action),
    [actionTypes.ITEMS_IS_LOADING] : (state, action) => itemIsLoading(state,action),
    [actionTypes.UPDATE_PROPERTY] : (state, action) => updateProperty(state,action),
    [actionTypes.ADD_ADITIONAL_SKILL] : (state, action) => addAdditionalSKill(state,action),
};

export default (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type]
    const resultState = handler ? handler(state, action) : state
    return resultState
};
