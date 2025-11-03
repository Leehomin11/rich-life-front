import "./navbar.css";
import logo from "../img/logo/5.png";
function Navbar() {
  return (
    <div className="navbar-box">
      <div>
        <a href="/">
          <img
            src={logo}
            width={90}
            height={90}
            className="navbar-logo"
            alt="logo"
          />
        </a>
      </div>
    </div>
  );
}
export default Navbar;
