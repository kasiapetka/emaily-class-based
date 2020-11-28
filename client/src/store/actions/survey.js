import {
    GO_TO_NEXT_PAGE,
    GO_TO_PREV_PAGE,
    CREATE_SURVEY,
    FETCH_SURVEY,
    ADD_REPLY,
    SURVEY_FAILED,
    FETCH_REPLIES,
    LOADING_START,
    FETCH_SURVEYS,
    CREATE_INIT,
    SURVEY_FILL_LOGIN,
} from "./types";

import axios from "axios";

export const goToNextPage =()=>
    async dispatch => {
        dispatch({type: GO_TO_NEXT_PAGE});
    };

export const goToPrevPage =()=>
    async dispatch => {
        dispatch({type: GO_TO_PREV_PAGE});
    };

export const createInit = () =>
    async dispatch => {
        dispatch({type: CREATE_INIT});
    };

export const loginToSurvey = (password, id) =>
    async dispatch => {
        dispatch({type: LOADING_START});
        try {
            const res = await axios.post('/api/surveys/' + id, {password: password});
            dispatch({type: SURVEY_FILL_LOGIN, token: res.data});
        }catch (error) {
            dispatch({type: SURVEY_FAILED, error: error.response.status});
        }
    };


export const fetchSurvey =(id,surveyToken)=>
    async dispatch => {
        dispatch({type: LOADING_START});
        try {
            let headers;
            if(surveyToken){
                headers={
                    token: surveyToken
                }
            }
            const res = await axios.get('/api/surveys/'+id,{headers : headers});
            dispatch({type: FETCH_SURVEY, payload: res.data});
        } catch (error) {
            dispatch({type: SURVEY_FAILED, error: error.response.status});
        }
    };

export const fetchSurveys =()=>
    async dispatch => {
        dispatch({type: LOADING_START});
        try {
            const res = await axios.get('/api/surveys');
            dispatch({type: FETCH_SURVEYS, payload: res.data});
        } catch (error) {
            dispatch({type: SURVEY_FAILED, error: error.response.status});
        }
    };

export const fetchReplies =(id)=>
async dispatch => {
    dispatch({type: LOADING_START});
    try {
        const res = await axios.get('/api/surveys/reply/'+id);
        dispatch({type: FETCH_REPLIES, payload: res.data});
    } catch (error) {
        dispatch({type: SURVEY_FAILED, error: error});
    }
};

export const createSurvey =(values)=>
    async dispatch => {
        dispatch({type: LOADING_START});
        try {
            const res = await axios.post('/api/surveys', values);
            dispatch({type: CREATE_SURVEY, payload: res.data});
        } catch (error) {
            dispatch({type: SURVEY_FAILED, error: error.response.status});
        }
    };

export const addReply =(surveyURL,answers,surveyToken)=>
    async dispatch => {
        dispatch({type: LOADING_START});
        try {
            let headers;
            if(surveyToken){
                headers={
                    token: surveyToken
                }
            }
            const res = await axios.post('/api/surveys/reply/'+surveyURL, answers, {headers : headers});
            dispatch({type: ADD_REPLY, payload: res});
        } catch (error) {
            dispatch({type: SURVEY_FAILED, error: error.message});
        }
    };

