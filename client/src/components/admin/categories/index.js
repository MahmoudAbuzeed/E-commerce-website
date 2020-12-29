import React, { Fragment } from "react";
import AdminLayout from "../layout";
import Category from "./category";

const CategoryComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <Category />
    </div>
  );
};

const Categories = (props) => {
  return (
    <Fragment>
      <AdminLayout children={<CategoryComponent />} />
    </Fragment>
  );
};

export default Categories;
