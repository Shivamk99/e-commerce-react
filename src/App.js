import React from "react";
import { commerce } from "./api/Commerce";
import { Navbar, Products, Cart } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

  const handleUpdateCartQuantity = async (product_id, quantity) => {
    const update = await commerce.cart.update(product_id, { quantity });

    setCart(update.cart);
  };

  const handleRemoveCartItems = async (product_id) => {
    const remove = await commerce.cart.remove(product_id);

    setCart(remove.cart);
  };

  const handleEmptyItems = async () => {
    const empty = await commerce.cart.empty();

    setCart(empty.cart);
  };

  React.useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <BrowserRouter>
      <div>
        <Navbar totalItems={cart?.total_items} />
        <Routes>
          <Route
            path="/"
            element={
              <Products products={products} handleAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateCartQuantity={handleUpdateCartQuantity}
                handleRemoveCartItems={handleRemoveCartItems}
                handleEmptyItems={handleEmptyItems}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
