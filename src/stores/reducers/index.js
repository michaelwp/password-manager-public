import {
    ADD_NEW_PASSWORD_START,
    ADD_NEW_PASSWORD_SUCCESS,
    ADD_NEW_PASSWORD_ERROR,
    FETCH_LIST_PASSWORD_START,
    FETCH_LIST_PASSWORD_SUCCESS,
    FETCH_LIST_PASSWORD_ERROR,
    DELETE_LIST_PASSWORD_START,
    DELETE_LIST_PASSWORD_SUCCESS,
    DELETE_LIST_PASSWORD_ERROR
} from '../actionTypes'

const initialState = {
    data: [],
    loading: false,
    error: null
};

export const passReducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LIST_PASSWORD_START:
            return {
                ...state,
                loading: true
            };
        case FETCH_LIST_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.reverse()
            };
        case FETCH_LIST_PASSWORD_ERROR:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};


export const inputPassReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_PASSWORD_START:
            return {
                ...state,
                loading: true
            };
        case ADD_NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false
            };
        case ADD_NEW_PASSWORD_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export const deletePassReducers = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_LIST_PASSWORD_START:
            return {
                ...state,
                loading: true
            };
        case DELETE_LIST_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case DELETE_LIST_PASSWORD_ERROR:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};