import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Header from './pages/components/Header';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ (props) => <Login { ...props } /> }
      />
      <Route exact path="/game" component={ Header } />
    </Switch>
  );
}
