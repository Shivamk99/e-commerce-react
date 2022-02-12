import React from "react";
import { commerce } from "./api/Commerce";
import { Navbar, Products } from "./components";

const App = () => {
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (product_id, quantity) => {
    const item = await commerce.cart.add(product_id, quantity);
    console.log({ item });
    setCart(item.cart);
  };

  React.useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  console.log(cart);
  return (
    <div>
      <Navbar totalItems={cart?.total_items} />
      <Products products={products} handleAddToCart={handleAddToCart} />
    </div>
  );
};

export default App;
