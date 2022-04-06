import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './pages/components/Header';
import './App.css';
import Config from './pages/Config';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ (props) => <Login { ...props } /> }
      />
      <Route exact path="/game" component={ Header } />
      <Route exact path="/Config" component={ Config } />
    </Switch>
  );
}
