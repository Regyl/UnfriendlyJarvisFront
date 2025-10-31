import React from 'react';
import ReactDOM from 'react-dom';
import StyledEngineProvider from '@mui/material/StyledEngineProvider'
import reportWebVitals from './reportWebVitals';
import {createBrowserHistory} from 'history'
import {BrowserRouter} from "react-router-dom";
import App from "./components/AppRouter";
import {Provider} from "react-redux";
import store from "./redux/store";

const history = createBrowserHistory()

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <StyledEngineProvider injectFirst>
                <App style={{width: '100%', height: '100%'}}/>
            </StyledEngineProvider>
        </BrowserRouter>
    </Provider>,
document.getElementById('root')
);

reportWebVitals();
