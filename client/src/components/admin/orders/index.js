import React, { Fragment } from "react";
import AdminLayout from "../layout";
import Order from "./orders";

const OrderComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <Order />
    </div>
  );
};
const Orders = (props) => {
  return (
    <Fragment>
      <AdminLayout children={<OrderComponent />} />
    </Fragment>
  );
};

export default Orders;
