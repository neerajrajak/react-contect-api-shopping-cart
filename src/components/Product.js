import React from "react";
import { Button, Card } from "react-bootstrap";
import "./style.css";
import Rating from "./Rating";
import { CartState } from "../context/Context";

const Product = ({ product }) => {
  const {
    state: { cart },
    dispatch
  } = CartState();
  return (
    <div className="products">
      <Card>
        <Card.Img
          alt={product.name}
          src={product.image}
          variant="top"
        ></Card.Img>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>INR {product.price.split(".")[0]}</span>
            {product?.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>Four Days Delivery</div>
            )}
            <Rating rating={product.ratings} />
          </Card.Subtitle>
          {cart.some((p) => p.id === product.id) ? (
            <Button variant="danger" onClick={()=>{
              dispatch({
                type: 'REMOVE_FROM_CART',
                payload: product
              })
            }}>Remove from cart</Button>
          ) : (
            <Button disabled={!product.inStock} onClick={()=>{
              dispatch({
                type: 'ADD_TO_CART',
                payload: product
              })
            }}>
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
