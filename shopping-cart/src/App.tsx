import { useState } from "react";
import { useQuery } from "react-query";
//components
import Drawer from "@mui/material/Drawer";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
import Item from "./Item/Item";
//styles
import { Wrapper } from "./App.styles";
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

  function getTotalItems() {}
  function handleAddToCart(clickedItem: CartItemType) {}
  function handleRemoveFromCart() {}

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;

  return(
    <Wrapper>
      <Grid container spacing={3}>
        {
          data?.map((item) => {
            return(
              <Grid item key={item.id} xs={12} sm={4}>
                <Item item={item} handleAddToCart={handleAddToCart}/>
              </Grid>
            )
          })
        }
      </Grid>
    </Wrapper>
  )
}

export default App;
