import React, { useContext } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      {/* {console.log(children)} */}
    </>
  );
};

export default Layout;
