import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import mplLogo from "../../assets/images/logos/mpl.png";
import rclLogo from "../../assets/images/logos/rcl.png";
import { useStoreContext } from "../../context/StoreContext";
import { isAdmin, isPlayer, getUser } from "../../util/tokenUtils";

export default function Header() {
  const { store, setStore } = useStoreContext();
  const [username, setUsername] = useState("");
  const [adminAccess, setAdminAccess] = useState(false);
  const [playerAccess, setPlayerAccess] = useState(false);

  useEffect(() => {
    if (store && store.token) {
      setAdminAccess(isAdmin(store.token));
      setPlayerAccess(isPlayer(store.token));
      setUsername(getUser(store.token));
    } else {
      let token = sessionStorage.getItem("token");
      if (token) {
        setStore(token);
        setAdminAccess(isAdmin(token));
        setPlayerAccess(isPlayer(token));
        setUsername(getUser(token));
      } else {
        setAdminAccess(false);
        setPlayerAccess(false);
        setUsername("");
      }
    }
  }, [store]);
  return (
    <header id="header" className="fixed-top ">
      <div className="container d-flex align-items-center">
        <NavLink
          to={
            adminAccess
              ? "/home"
              : playerAccess
              ? `/playerview/${username}`
              : "/"
          }
          className="logo me-auto text-decoration-none"
        >
          <img src={mplLogo} alt="MPL" />
          {/* <img src={rclLogo} alt="RCL" /> */}
        </NavLink>
        <Navbar />
      </div>
    </header>
  );
}
