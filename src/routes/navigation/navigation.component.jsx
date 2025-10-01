// Misc.
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";

// Logo.
import CrwnLogo from "../../assets/crown.svg";

// Styles.
import "./navigation.styles.scss";

// Components.
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

// Contexts.
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

// Utils.
import { signOutUser } from "../../utils/firebase.utils";

const Navigation = () => {
  // Contexts
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  // JSX Component
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={CrwnLogo} alt="crown logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {/* if signed in, change link text */}
          {currentUser ? (
            <span className="nav-link" to="/auth" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          {/* Shopping Icon */}
          <CartIcon />
        </div>
        {/* Utilizes Context to Open Cart Dropdown */}
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
