import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Layout/Dashboard';
import Profile from '../components/Layout/Profile';


const Routes = () => {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
    </Switch>
  );
};

export default Routes;