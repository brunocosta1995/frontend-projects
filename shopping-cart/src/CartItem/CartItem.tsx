import Button from "@mui/material/Button";
//types
import { CartItemType } from "../App";
//styles
import { Wrapper } from "./CartItem.styles";
import { ReactElement } from "react";

type Props = {
  item: CartItemType;
  addToCart: (clicked: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

function CartItem({
  item,
  addToCart,
  removeFromCart,
}: Props): React.ReactElement {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >-</Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >+</Button>
          <img src={item.image} alt={item.title}/>
        </div>
      </div>
    </Wrapper>
  );
}

export default CartItem;
