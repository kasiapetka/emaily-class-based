import 'materialize-css/dist/css/materialize.min.css';
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import reducers from './store/reducers';
import reduxThunk from 'redux-thunk';
import './styles/Flex.scss';
import './styles/Element.scss';
import './styles/Size.scss';
import './styles/General.scss';
import './styles/Input.scss';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}> <App/> </Provider>,
    document.querySelector('#root'));
