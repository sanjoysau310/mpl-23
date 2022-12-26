import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useStoreContext } from "../../context/StoreContext";
import { isAdmin, isPlayer, getUser } from "../../util/tokenUtils";

export default function Navbar() {
  const { store, setStore } = useStoreContext();
  const [username, setUsername] = useState("");
  const [adminAccess, setAdminAccess] = useState(false);
  const [playerAccess, setPlayerAccess] = useState(false);

  const [navClass, setNavClass] = useState("navbar");

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
  const toggleNav = () => {
    navClass === "navbar"
      ? setNavClass("navbar-mobile")
      : setNavClass("navbar");
  };

  const closeNav = () => {
    setNavClass("navbar");
  };

  return (
    <nav id="navbar" className={navClass}>
      {/* {console.log(store)} */}
      <ul>
        <li>
          <NavLink
            to={
              adminAccess
                ? "/home"
                : playerAccess
                ? `/playerview/${username}`
                : "/"
            }
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={adminAccess ? "/auctionpage" : "/about"}
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            {adminAccess ? "Auction" : "About"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={adminAccess ? "/playerspage" : "/playersview"}
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            Players
          </NavLink>
        </li>
        <li>
          <NavLink
            to={adminAccess ? "/teamspage" : "/teams"}
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            Teams
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/events"
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            Events
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/gallery"
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            Gallery
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            Contact
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/signup"
            className="nav-link scrollto text-decoration-none"
            onClick={closeNav}
          >
            Signup
          </NavLink>
        </li> */}
        <li>
          {!store && (
            <NavLink
              to="/login"
              className="nav-link scrollto text-decoration-none"
              onClick={closeNav}
            >
              Login
              <i className="fa fa-right-to-bracket ms-2" aria-hidden="true" />
            </NavLink>
          )}
        </li>
        <li>
          {store && (
            <NavLink
              to="/login"
              className="nav-link scrollto text-decoration-none"
              onClick={() => {
                closeNav();
                sessionStorage.removeItem("token");
                setStore("");
              }}
            >
              {username}
              <i className="fa fa-right-to-bracket ms-2" aria-hidden="true" />
            </NavLink>
          )}
        </li>
        {/* {console.log(localStorage)} */}
      </ul>
      {navClass === "navbar" ? (
        <i className="fa fa-bars mobile-nav-toggle" onClick={toggleNav} />
      ) : (
        <i className="fa fa-times mobile-nav-toggle" onClick={toggleNav} />
      )}
    </nav>
  );
}
