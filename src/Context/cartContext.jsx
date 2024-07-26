import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = Object.values(cartItems).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const addItemToCart = (newItem) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [newItem.artNo]: {
        ...newItem,
        quantity: prevItems[newItem.artNo]
          ? prevItems[newItem.artNo].quantity + 1
          : 1,
      },
    }));
  };

  const removeItemFromCart = (itemToRemove) => {
    setCartItems((prevCartItems) => {
      const { [itemToRemove.artNo]: _, ...rest } = prevCartItems;
      return rest;
    });
  };

  const reduceItemQuantity = (itemToReduce) => {
    setCartItems((prevItems) => {
      const currentItem = prevItems[itemToReduce.artNo];

      if (!currentItem) return prevItems;

      if (currentItem.quantity > 1) {
        return {
          ...prevItems,
          [itemToReduce.artNo]: {
            ...currentItem,
            quantity: currentItem.quantity - 1,
          },
        };
      } else {
        const { [itemToReduce.artNo]: _, ...rest } = prevItems;
        return rest;
      }
    });
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    reduceItemQuantity,
    totalPrice,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
