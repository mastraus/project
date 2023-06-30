import Card from "react-bootstrap/Card";

function HomePage() {
  return (
    <div className="container">
      <h2>Mindful Pizza Co. Dashboard</h2>
      <hr />
      <div className="d-flex justify-content-center pb-5 pt-3">
        <Card border="warning" style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title>
              {" "}
              "Why did the pizza use StrongMind digital curriculum?"
            </Card.Title>
            <hr />
            <Card.Text>
              Because it wanted to be "topp" of the class and find inner
              "peace-a"!
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div>
        <h5 className="pb-4">
          Welcome to your dashboard for managing Mindful Pizza Co.!
        </h5>

        <h5 className="pb-4">
          Use the navigation links to manage your available pizzas and toppings!
          This dashboard allows you to view, edit, delete, and add new
          pre-created specialty pizzas and toppings.
        </h5>
      </div>
      <div>
        <h5>Happy pizza-ing!</h5>
      </div>
    </div>
  );
}

export default HomePage;
