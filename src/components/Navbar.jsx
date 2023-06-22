import { FaSearch, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Navbar = ({ pageName, onSearchProduct }) => {
  const location = useLocation();

  return (
    <div className="w3-bar w3-padding-xlarge w3-text-white">
      <span className="w3-xlarge w3-bar-item" style={{ fontWeight: "400" }}>
        {pageName}
      </span>
      &nbsp;
      <div className="w3-right">
        {location.pathname !== "/" && (
          <input
            type="text"
            className="w3-input w3-bar-item w3-round-xxlarge"
            placeholder="search"
            style={{
              width: "150px",
              backgroundImage: "linear-gradient(to right, #173389, #13216e)",
              marginTop: "5px",
              marginRight: "25px",
            }}
            onChange={onSearchProduct}
          />
        )}

        <a
          className="w3-bar-item w3-tag w3-round w3-card"
          style={{
            backgroundColor: "rgba(77,56,136, 0.5)",
            marginTop: "5px",
            marginRight: "15px",
          }}
        >
          <FaUser />
          {window.celo.selectedAddress.slice(0, 4)}...
          {window.celo.selectedAddress.slice(-5)}
        </a>
      </div>
    </div>
  );
};

export default Navbar;
