import React from 'react';
import ReactDOM from 'react-dom';
import StylesProvider from '@material-ui/styles/StylesProvider'
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
            <StylesProvider injectFirst>
                <App style={{width: '100%', height: '100%'}}/>
            </StylesProvider>
        </BrowserRouter>
    </Provider>,
document.getElementById('root')
);

reportWebVitals();
