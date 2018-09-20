import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './store/store';

import Dashboard from './layout/Dashboard';
import AddClient from './clients/AddClient';
import EditClient from './clients/EditClient';
import ClientDetail from './clients/ClientDetail';
import AppNavBar from './layout/AppNavBar';
import Login from './auth/Login';

import { UserIsAuthenticated,UserIsNotAuthenticated } from './helpers/auth';


class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Router>
            <div className="app">
              <AppNavBar />
              <div className="container">
                <Switch>
                  <Route exact path='/login' component={UserIsNotAuthenticated(Login)} />
                  <Route exact path='/' component={UserIsAuthenticated(Dashboard)} />
                  <Route exact path='/client/add' component={UserIsAuthenticated(AddClient)} />
                  <Route exact path='/client/edit/:id' component={UserIsAuthenticated(EditClient)} />
                  <Route exact path='/client/:id' component={UserIsAuthenticated(ClientDetail)} />
                </Switch>
              </div>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
