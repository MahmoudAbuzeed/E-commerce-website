import React, { Fragment } from "react";
import AdminLayout from "../layout";
import Order from "./orders";

const OrderComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <div className="col-span-1 flex items-center">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center w-full">
          {/* It's open the add product modal */}
          <span
            style={{ background: "#303031" }}
            className="rounded-full cursor-pointer p-2 bg-gray-800 flex items-center text-gray-100 text-sm font-semibold uppercase"
          >
            Orders{" "}
          </span>
        </div>
      </div>
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
