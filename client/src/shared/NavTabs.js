import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import PizzaGrid from "./PizzaGrid";

function NavTabs() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="pizza">Specialty Pizzas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="toppings">Available Toppings</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="pizza">
              <Col sm={10}>
                <PizzaGrid />
              </Col>
            </Tab.Pane>
            <Tab.Pane eventKey="toppings">Second tab content</Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default NavTabs;
