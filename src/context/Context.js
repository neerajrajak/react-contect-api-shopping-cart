import React, { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer, filterReducer } from "./Reducer";

const cart = createContext();

const Context = ({ children }) => {
  const products = [...Array(50)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.url(),
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }));

  console.log("Products: ", products);

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, dispatchFilter] = useReducer(filterReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: ""
  });

  return (
    <cart.Provider value={{ state, dispatch, productState, dispatchFilter }}>
      {children}
    </cart.Provider>
  );
};

export default Context;

export const CartState = () => useContext(cart);
