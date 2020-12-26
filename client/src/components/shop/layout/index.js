import React, { Fragment } from "react";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <div className="flex-grow">
        {/* All Children pass from here */}
        {children}
      </div>
    </Fragment>
  );
};

export default Layout;
