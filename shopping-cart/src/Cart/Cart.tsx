import CartItem from "../CartItem/CartItem";
//styles
import { Wrapper } from "./Cart.styles";
//types
import { CartItemType } from "../App";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

function Cart({
  cartItems,
  addToCart,
  removeFromCart,
}: Props): React.ReactElement {

    
  function calculateTotal(items: CartItemType[]) {
    return items.reduce((acu: number, item) => {
      return acu + item.amount * item.price;
    }, 0);
  }

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
}

export default Cart;
