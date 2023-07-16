import React from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CartState } from "../context/Context";
import './style.css';
import { AiFillDelete } from 'react-icons/ai';

const Header = () => {
  const {
    state: { cart },
    dispatch,
    dispatchFilter
  } = CartState();
  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a product"
            className="m-auto"
            onChange={(e) => {
              dispatchFilter({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge style={{ padding: 10}}>{ cart.length }</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {
                !cart.length ? (
                  <span style={{ marginLeft: 10 }}>Cart is Empty!</span>
                ) :
                (
                  <>
                  {
                    cart.map((product)=>(
                      <span className="cartitem" key={product.id}>
                        <img 
                          src={product.image}
                          className="cartItemImg"
                          alt={product.name}
                        />
                        <div className="cartItemDetail">
                          <span>{ product.name }</span>
                          <span>INR { product.price }</span>
                        </div>
                        <AiFillDelete 
                          fontSize="20px"
                          style={{ cursor: "pointer"}}
                          onClick={()=>{
                            dispatch({
                              type: 'REMOVE_FROM_CART',
                              payload: product
                            })
                          }}
                        />
                      </span>
                    ))
                    
                  }
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                  </>
                )
              }
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
