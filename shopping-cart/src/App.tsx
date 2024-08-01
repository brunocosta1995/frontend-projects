import { ReactElement, useState } from "react";
import { useQuery } from "react-query";
//components
import Drawer from "@mui/material/Drawer";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
//styles
import { Wrapper } from "./App.styles";
import { StyledButton } from "./App.styles";
//types
export type CartItemType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  amount: number;
};

async function fetchProducts(): Promise<CartItemType[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }
    const result = await response.json();
    const data: CartItemType[] = result;
    return data;
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "There was an error...";
    console.log(errorMsg);
    return [];
  }
}

function App() {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    fetchProducts
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  function getTotalItems(items: CartItemType[]) {
    return items.reduce((acu: number, item) => acu + item.amount, 0);
  }

  function handleAddToCart(clickedItem: CartItemType) {
    setCartItems((prevValue) => {
      //Check if the item is already added to the cart
      const checkItem = prevValue.find((item) => item.id === clickedItem.id);

      if (checkItem) {
        return prevValue.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      //Add the item if i'ts not added to the cart
      return [...prevValue, { ...clickedItem, amount: 1 }];
    });
  }

  function handleRemoveFromCart(idItem: number) {
    setCartItems((prevValue) => {
      return prevValue.reduce((acu, item) => {
        if (item.id === idItem) {
          if (item.amount === 1) return acu;
          return [...acu, {...item, amount: item.amount - 1}]
        } else {
          return [...acu, item];
        }
      }, [] as CartItemType[])
    })
  }

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => {
          return (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
}

export default App;
