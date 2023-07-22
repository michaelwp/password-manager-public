import {
    ADD_NEW_PASSWORD_START,
    ADD_NEW_PASSWORD_SUCCESS,
    ADD_NEW_PASSWORD_ERROR,
    FETCH_LIST_PASSWORD_START,
    FETCH_LIST_PASSWORD_SUCCESS,
    FETCH_LIST_PASSWORD_ERROR,
    DELETE_LIST_PASSWORD_START,
    DELETE_LIST_PASSWORD_SUCCESS,
    DELETE_LIST_PASSWORD_ERROR,
} from '../actionTypes';
import firebase from '../../config/firebase';

const db = firebase.firestore();

export const addNewPassword = (payload) => (dispatch) => {
    dispatch({
        type: ADD_NEW_PASSWORD_START
    });

    db.collection("password-manager")
        .doc(payload.uuidNo)
        .set({
            id: payload.uuidNo,
            url: payload.url,
            userName: payload.userName,
            password: payload.password,
            createdDate: payload.createdDate,
            updatedDate: payload.updatedDate
        }).then(response => {
        dispatch({
            type: ADD_NEW_PASSWORD_SUCCESS,
            payload: response
        })
    }).catch(err => {
        dispatch({
            type: ADD_NEW_PASSWORD_ERROR,
            payload: err
        })
    });
};

export const fetchListPassword = () => (dispatch) => {
    let data = [];

    dispatch({
        type: FETCH_LIST_PASSWORD_START
    });

    db.collection("password-manager")
        .orderBy('updatedDate')
        .onSnapshot((querySnapshot) => {
            data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            dispatch({
                type: FETCH_LIST_PASSWORD_SUCCESS,
                payload: data
            })
        }, err => {
            dispatch({
                type: FETCH_LIST_PASSWORD_ERROR,
                payload: err
            })
        });
};

export const deleteListPassword = (payload) => (dispatch) => {
    dispatch({
        type: DELETE_LIST_PASSWORD_START
    });

    db.collection("password-manager")
        .doc(payload)
        .delete()
        .then(response => {
            dispatch({
                type: DELETE_LIST_PASSWORD_SUCCESS,
                payload: response
            })
        })
        .catch(err => {
            dispatch({
                type: DELETE_LIST_PASSWORD_ERROR,
                payload: err
            })
        })
};