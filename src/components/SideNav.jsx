import { Link } from "react-router-dom";

import { navbar } from "../assets/appData";
const SideNav = () => {
  return (
    <div
      className="w3-sidebar w3-hide-small w3-text-white w3-round-xlarge"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #0e2a76, rgba(26,65,159, 0.9) )",
        margin: "10px",
        width: "250px",
      }}
    >
      <div className="w3-center">
        <br />
        <br />
        <span className="w3-large" style={{ fontWeight: "600" }}>
          ICE CREAM
        </span>
        <br />
        <span style={{ fontWeight: "600" }}>MANAGER</span>
        <br />
        <br />
        {navbar.map(({ navName, navIcon, navLink }) => {
          return (
            <Link
              to={navLink}
              className="w3-bar-item w3-padding-large w3-round-large w3-btn"
            >
              {navIcon}&nbsp;&nbsp;&nbsp;{navName}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
