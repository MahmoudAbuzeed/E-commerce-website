import React from "react";
import { Home } from "./shop";
import { DashboardAdmin } from "./admin";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Routing All page will be here */
const Routes = (props) => {
  return (
    <Router>
      <Switch>
        {/* Shop & Public Routes */}
        <Route exact path="/" component={Home} />

        {/* Admin Routes */}
        <Route
          exact={true}
          path="/admin/dashboard"
          component={DashboardAdmin}
        />
        {/* Admin Routes */}
      </Switch>
    </Router>
  );
};

export default Routes;
