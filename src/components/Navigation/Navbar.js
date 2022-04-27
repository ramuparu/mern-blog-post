import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";

const Navbar = () => {
  const store = useSelector(state => state.users)
  const {userAuth} = store
  const isAdmin = userAuth?.isAdmin
  return (
    <>
      {isAdmin ? <AdminNavbar />  : userAuth ? <PrivateNavbar /> : <PublicNavbar />  }
      
    </>
  );
};

export default Navbar;
