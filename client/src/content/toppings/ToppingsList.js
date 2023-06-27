import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createTopping } from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Row from "react-bootstrap/Row";
import AddTopping from "./AddTopping";

function ToppingsList() {
  const [allToppings, setAllToppings] = useState([]);
  const [toppingData, setToppingData] = useState("");

  useEffect(() => {
    fetchToppings();
  }, []);

  async function fetchToppings() {
    const response = await fetch("/toppings");
    const data = await response.json();
    setAllToppings(data);
  }

  async function saveToppings() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topping_name: toppingData }),
    };
    const response = await fetch("/toppings", requestOptions);
    const data = await response.json();
    const newToppings = [data, ...allToppings];
    setAllToppings(newToppings);
    setToppingData("");
    fetchToppings();
  }

  async function deleteTopping(toppingId) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(`/toppings/${toppingId}`, requestOptions);
    // const data = await response.json();
    // const newToppings = [data, ...allToppings];
    // setAllToppings(newToppings);
    fetchToppings();
  }

  // export async function createTopping(topping, signal) {
  //   const url = `${API_BASE_URL}/toppings`;
  //   const options = {
  //     method: "POST",
  //     headers,
  //     body: JSON.stringify(topping),
  //     signal,
  //   };
  //   return await fetchJson(url, options, topping);
  // }

  //async function updateTopping() {}

  // export async function updateTopping(toppingId, data) {
  //   const url = `${API_BASE_URL}/toppings/${toppingId}`;
  //   const options = {
  //     method: "PUT",
  //     headers,
  //     body: JSON.stringify({ data }),
  //   };
  //   return await fetchJson(url, options, {});
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    saveToppings();
  };

  const handleChange = (event) => {
    setToppingData(event.target.value);
  };

  const getAllToppings = allToppings.map((topping) => (
    <>
      <div className="container">
        <ul class="list-group list-group-light">
          <li
            key={topping.id}
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div class="d-flex align-items-center">{topping.topping_name}</div>
            <div>
              <i class="fa fa-pencil fa-lg mr-3" title="Edit"></i>

              <i
                class="fa fa-trash fa-lg"
                title="Delete"
                onClick={() => deleteTopping(topping.id)}
              ></i>
            </div>
          </li>
        </ul>
      </div>
      <br />
    </>
  ));

  return (
    <div>
      <h2>Toppings</h2>
      <main className="container">
        <form id="to do form" onSubmit={handleSubmit}>
          <input
            className="topping-input p-3 w-75"
            name="topping_name"
            type="text"
            placeholder="Enter new topping..."
            onChange={handleChange}
            required={true}
            value={toppingData}
          />
          <button className="topping-btn p-3" type="submit">
            Add
          </button>
        </form>
        <div class="p-3"></div>
        {getAllToppings}
      </main>
    </div>
  );
}

export default ToppingsList;
