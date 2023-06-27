import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PizzaGrid from "./PizzaGrid";
import { listPizzas } from "./PizzaProvider";

const API_BASE_URL = process.env.REACT_APP_DATABASE_URL;

function PizzaList() {
  const [allPizzas, setAllPizzas] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch("/pizzas")
      .then((resp) => {
        return resp.json();
      })
      .then((json) => setAllPizzas(json));
  }, []);

  const getAllPizzas = allPizzas.map((pizza) => (
    <div class="p-3" key={pizza.id}>
      <div class="card border-secondary mb-3" style={{ width: "20rem" }}>
        <div class="card-body">
          <h5 class="card-title">{pizza.pizza_name}</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="/toppings" class="btn btn-warning">
            Edit
          </a>
          {"  "}
          <a href="/pizzas" class="btn btn-danger">
            Delete
          </a>
        </div>
      </div>
    </div>
  ));

  // function PizzaCard({pizzaId, pizzaName}) {
  //   return (

  //   )
  // }

  return (
    <main className="container">
      <h2>Pizza</h2>
      <hr />
      <section className="row">{getAllPizzas}</section>
    </main>
  );
}

export default PizzaList;
