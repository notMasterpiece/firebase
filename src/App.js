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


class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Router>
            <div className="app">
              <AppNavBar />
              <div className="container">
                <Switch>
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/' component={Dashboard} />
                  <Route exact path='/client/add' component={AddClient} />
                  <Route exact path='/client/edit/:id' component={EditClient} />
                  <Route exact path='/client/:id' component={ClientDetail} />
                </Switch>
              </div>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
