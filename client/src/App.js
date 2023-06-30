import Header from "./shared/Header";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import PizzaList from "./content/pizzas/PizzaList";
import ToppingsList from "./content/toppings/ToppingsList";
import HomePage from "./shared/HomePage";
import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <br />
      <BrowserRouter>
        <Tab.Container id="left-tabs-example" defaultActiveKey="">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="pizzas" as={Link} to={`/pizzas`}>
                    <h5>Specialty Pizzas</h5>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="toppings" as={Link} to={`/toppings`}>
                    <h5>Available Toppings</h5>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Routes>
                  <Route path={`/`} element={<HomePage />} />
                  <Route path={`/pizzas`} element={<PizzaList />} />
                  <Route path={`/toppings`} element={<ToppingsList />} />
                </Routes>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
