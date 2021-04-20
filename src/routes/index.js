import React from 'react';
import { Switch } from 'react-router-dom';
import RouteWrapper from './Route';

import SignIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';
import Users from '~/pages/Users';
import Settings from '~/pages/Settings';
import Deliveries from '~/pages/Deliveries';

const Routes = () => {
  return (
    <Switch>
      <RouteWrapper path="/" exact component={SignIn} />
      <RouteWrapper path="/dashboard" isPrivate exact component={Dashboard} />
      <RouteWrapper path="/dashboard/users" isPrivate exact component={Users} />
      <RouteWrapper
        path="/dashboard/deliveries"
        isPrivate
        exact
        component={Deliveries}
      />
      <RouteWrapper
        path="/dashboard/settings"
        isPrivate
        exact
        component={Settings}
      />
    </Switch>
  );
};

export default Routes;
