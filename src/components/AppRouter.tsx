import React from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter as Router } from 'react-router-dom';
import { Home, Payments, ProjectBoard, ProjectsView, Settings, Weather } from 'views';
import { AuthenticationManager } from "./AuthenticationManager";

export const AppRouter = () => (
  <AuthenticationManager>
    <Router>
      <Switch>
        <Route exact={true} path='/' component={Home}/>
        <Route exact={true} path='/weather' component={Weather}/>
        <Route exact={true} path='/projects' component={ProjectsView}/>
        <Route path='/projects/:id' component={ProjectBoard}/>
        <Route exact={true} path='/settings' component={Settings}/>
        <Route exact={true} path='/payments' component={Payments}/>
      </Switch>
    </Router>
  </AuthenticationManager>
);
