import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";

function App() {
  return (
    <BrowserRouter basename="/react-contect-api-shopping-cart">
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/cart" exact Component={Cart} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
