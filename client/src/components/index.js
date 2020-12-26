import React from "react";
import { Home, PageNotFound } from "./shop";
import Signin from "../components/signin";
import Signup from "../components/signup";
import AdminDashboard from "../components/admin/adminDashboard"
import Categories from "../components/admin/categories"
import Products from "../components/admin/products"
import Orders from "../components/admin/orders"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Routing All page will be here */
const Routes = (props) => {
  return (
    <Router>
      <Switch>
        {/* Shop & Public Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/admin/dashboard/categories" component={Categories} />
        <Route exact path="/admin/dashboard/products" component={Products} />
        <Route exact path="/admin/dashboard/orders" component={Orders} />


        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />

        {/* 404 Page */}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
