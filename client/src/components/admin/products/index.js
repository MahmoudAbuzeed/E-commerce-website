import React, { Fragment } from "react";
import AdminLayout from "../layout";
import Product from "./products";

const HeaderComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <Product />
    </div>
  );
};

const Products = (props) => {
  return (
    <Fragment>
      <AdminLayout children={<HeaderComponent />} />
    </Fragment>
  );
};

export default Products;
