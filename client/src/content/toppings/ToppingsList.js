import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Row from "react-bootstrap/Row";

function ToppingsList() {
  const [allToppings, setAllToppings] = useState([]);

  useEffect(() => {
    fetch("/toppings")
      .then((resp) => {
        return resp.json();
      })
      .then((json) => setAllToppings(json));
  }, []);

  const getAllToppings = allToppings.map((topping) => (
    <>
      <div className="container">
        <ul class="list-group list-group-light">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">{topping.topping_name}</div>
            <div>
              <i class="fa fa-pencil fa-lg mr-3" title="Delete"></i>

              <i class="fa fa-trash fa-lg" title="Delete"></i>
            </div>
          </li>
        </ul>
      </div>
      <br />
    </>
  ));

  return <main className="container">{getAllToppings}</main>;
}

export default ToppingsList;
