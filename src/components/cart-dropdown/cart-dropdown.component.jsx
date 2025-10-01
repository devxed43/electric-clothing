import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />
      <button
        style={{
          height: "50px",
        }}
      >
        Go To Checkout
      </button>
    </div>
  );
};

export default CartDropdown;
