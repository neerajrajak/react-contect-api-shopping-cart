import React, { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import "./style.css";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((product) => (
            <ListGroup.Item key={product.id}>
              <Row>
                <Col md={2}>
                  <Image src={product.image} alt={product.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{product.name}</span>
                </Col>
                <Col md={2}>
                  <span>INR {product.price}</span>
                </Col>
                <Col md={2}>
                  <Rating rating={product.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={product.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: product.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(product.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <AiFillDelete
                    fontSize="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: product,
                      });
                    }}
                  />
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          Total: INR {total}
        </span>
        <Button type="button" disabled={!cart.length}>
          Proceed To Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
