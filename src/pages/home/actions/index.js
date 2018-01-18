export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const ITEMS_IS_LOADING = 'ITEMS_IS_LOADING';
export const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED';
export const ITEM_REQUEST_SUCCESS = 'ITEM_REQUEST_SUCCESS';
export const UPDATE_PROPERTY = 'UPDATE_PROPERTY';
export const ADD_ADITIONAL_SKILL = 'ADD_ADITIONAL_SKILL';


export const authSuccess = () => {
    return {
        type: AUTH_SUCCESS
    };
}

export const authError = () => {
    return {
        type: AUTH_ERROR
    };
}

export const authRequest = () => {
    return {
        type: AUTH_REQUEST
    };
}


export const itemsIsLoading = () => {
    return {
        type: ITEMS_IS_LOADING
    };
}


export const itemsFetchDataSuccess = (response) => {
    return {
        type: ITEM_REQUEST_SUCCESS,
        response
    };
}

export const itemsHasErrored = () => {
    return {
        type: ITEMS_HAS_ERRORED
    };
}

export const updateProperty = (prop,value) => {
    return {
        type: UPDATE_PROPERTY,
        prop,
        value
    };
}

export const addAdditionalSKill = (label) => {
    return {
        type: ADD_ADITIONAL_SKILL,
        label
    };
}



export const getSkills = () => {

    let endpoint = 'http:///localhost:8090/skills';
    let params = { method: 'GET',
       headers: {  'Accept': 'application/json','Content-Type': 'application/json',
             'Authorization':'bearer '+sessionStorage.getItem('token') }
    };

    return (dispatch) => {

        dispatch(itemsIsLoading());
           
        fetch(endpoint,params)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored()));
    };
}

export const login = (userData) => {

    let endpoint = 'http:///localhost:8090/login';

    return (dispatch) => {

        dispatch(authRequest());

        fetch(endpoint,{
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {"Content-Type": "application/json"}
              })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((response) =>  sessionStorage.setItem('token',response.token))
            .then(() =>  dispatch(authSuccess()))
            .catch(() => dispatch(authError()));
    };
}

