import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  const style = {
    background: `linear-gradient(rgba(241, 172, 61, 1.0), rgba(255, 221, 170, 1.0))`,
    backgroundPosition: "center",
  };

  return (
    <Container fluid style={style}>
      <Navbar>
        <Col sm={3}>
          <img src="../pizza-logo.png" alt="Logo" class="w-50 h-50 m-3" />
        </Col>

        <Col sm={8}>
          <Row>
            {" "}
            <h1 className="font-poppins-heading">Mindful Pizza Co.</h1>
          </Row>
          <Row>
            <h4 className="font-poppins">Feeding Strong Minds</h4>
          </Row>
        </Col>
      </Navbar>
    </Container>
  );
}

export default Header;

/*
 * Created with https://www.css-gradient.com
 * Gradient link: https://www.css-gradient.com/?c1=ffddaa&c2=e08138&gt=l&gd=dbb
 */
// background: rgba(255, 221, 170, 1.0);
// background: linear-gradient(0deg, rgba(255, 221, 170, 1.0), rgba(224, 129, 56, 1.0));
