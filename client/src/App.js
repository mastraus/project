import Header from "./shared/Header";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import PizzaList from "./content/pizzas/PizzaList";
// import PizzaGrid from "./shared/PizzaGrid";
// import { activeTabs } from "./utils/tabs";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Switch, Routes, Route } from "react-router-dom";

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
                    Specialty Pizzas
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="toppings" as={Link} to={`/toppings`}>
                    Available Toppings
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Routes>
                  <Route path={`/pizzas`} element={<PizzaList />} />
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
