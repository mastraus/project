import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

function NavTabs() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <NavLink href="/pizzas">SpecialtyPizzas</NavLink>
        </Col>
      </Row>
    </Tab.Container>
  );
}

function NavLink({ href, children, ...props }) {
  return (
    <Nav variant="pills" className="flex-column">
      <Nav.Item>
        <Nav.Link href={href} {...props}>
          {children}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavTabs;
