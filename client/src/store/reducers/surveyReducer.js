import {
    GO_TO_NEXT_PAGE,
    GO_TO_PREV_PAGE,
    CREATE_SURVEY,
    FETCH_SURVEY,
    FETCH_SURVEYS,
    ADD_REPLY,
    SURVEY_FAILED,
    LOADING_START,
    CREATE_INIT,
    SURVEY_FILL_LOGIN, FETCH_REPLIES
} from "../actions/types";

const PAGES =  [
    {id: 0, name:'type'},
    {id: 1, name:'content'},
    {id: 2, name:'questions'},
    {id: 3, name:'summary'}

];

const initialState = {
    currentPage: PAGES[0],
    survey: null,
    surveys: null,
    replies: null,
    error: null,
    loading: false,
    surveyCreatedSuccess: false,
    surveyRepliedSuccess: false,
    surveyCreatedURL: null
};

const surveyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GO_TO_NEXT_PAGE:
            return{
            ...state,
                currentPage: PAGES[state.currentPage.id + 1]
        };
        case GO_TO_PREV_PAGE:
            return{
                ...state,
                currentPage: PAGES[state.currentPage.id - 1]
            };
        case FETCH_SURVEY:
            return{
                ...state,
                survey: {
                    ...action.payload,
                },
                surveyRepliedSuccess: false,
                loading: false,
            };
        case FETCH_SURVEYS:
            return{
                ...state,
                surveys: [
                    ...action.payload,
                ],
                loading: false,
            };
        case FETCH_REPLIES:
            return{
                ...state,
                replies: [
                    ...action.payload
                ],
                loading: false,
            };
        case CREATE_INIT:
            return{
                ...state,
                surveyCreatedSuccess: false,
                currentPage: PAGES[0],
                error: null,
            };
        case CREATE_SURVEY:
            return{
                ...state,
                loading: false,
                surveyCreatedSuccess: true,
                surveyCreatedURL: action.payload.URL,
                surveyCreatedPass: action.payload.password,
                currentPage: PAGES[0]
            };
        case SURVEY_FILL_LOGIN:
            return {
                ...state,
                surveyToken: action.token,
                error: null,
                loading: false
            };
        case ADD_REPLY:
            return{
                ...state,
                loading: false,
                error: null,
                surveyRepliedSuccess: true
            };
        case LOADING_START:
            return{
                ...state,
                loading: true
            };
        case SURVEY_FAILED:
            return{
                ...state,
                error: action.error,
                loading: false
            };
        default:
            return state;
    }
};

export default surveyReducer;
