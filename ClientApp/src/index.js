import './css/site.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import * as RoutesModule from './App';
import { LoginPage } from './components/LoginPage';
import { authenticationService } from './services/AuthenticationService';

let routes = RoutesModule.routes;
const rootElement = document.getElementById('root');

function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    const currentUser = authenticationService.currentUserValue;
    if (!currentUser) {
          ReactDOM.render(
           <BrowserRouter basename={baseUrl}>
                <LoginPage />
            </BrowserRouter>,
            rootElement);
    } else {
        ReactDOM.render(
            <BrowserRouter children={ routes } basename={ baseUrl } />,
            rootElement);
    }
}

renderApp();

 // Allow Hot Module Replacement
//if (module.hot) {
  //  module.hot.accept('./App', () => {
    //   routes = require('./App').routes;
      //  renderApp();
   //});
//}