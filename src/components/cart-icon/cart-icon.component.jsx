import ShopLogo from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleHandler = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleHandler}>
      <img className="shopping-icon" src={ShopLogo} alt="shop logo" />
      <span className="item-count">10</span>
    </div>
  );
};

export default CartIcon;
