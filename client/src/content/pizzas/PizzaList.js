import React, { useEffect, useState, Fragment } from "react";
import PizzaListItem from "./PizzaListItem";
import AddPizzaModal from "./AddPizzaModal";
import Modal from "react-modal";

function PizzaList() {
  const [allPizzas, setAllPizzas] = useState([]);
  const [allToppings, setAllToppings] = useState([]);
  const [addFormData, setAddFormData] = useState({
    pizza_name: "",
    toppings: [],
  });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchPizzas();
    fetchToppings();
  }, []);

  async function fetchToppings() {
    const response = await fetch("/toppings");
    const data = await response.json();
    setAllToppings(data);
  }

  async function fetchPizzas() {
    const response = await fetch("/pizzas");
    const data = await response.json();
    setAllPizzas(data);
  }

  function extractPizzaAndToppingNames(data) {
    return Object.values(data).map((item) => {
      const { pizza_name, toppings } = item;
      const toppingNames = toppings.map((topping) => topping.topping_name);

      return {
        pizza_name: pizza_name,
        topping_names: toppingNames,
      };
    });
  }

  const extractedData = extractPizzaAndToppingNames(allPizzas);

  const handleAddFormChange = (pizzaName, checkedToppings) => {
    const newFormData = {
      pizza_name: pizzaName,
      toppings: checkedToppings,
    };

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newPizza = {
      pizza_name: addFormData.pizza_name,
      toppings: addFormData.toppings,
    };

    const newPizzas = [...allPizzas, newPizza];
    setAllPizzas(newPizzas);
  };

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <main className="container">
      <h2>Specialty Pizzas</h2>
      <hr />

      <button onClick={openModal}>Add New Pizza!</button>

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Pizza"
      >
        <AddPizzaModal
          allToppings={allToppings}
          handleAddFormChange={handleAddFormChange}
          handleAddFormSubmit={handleAddFormSubmit}
        />
      </Modal>

      <div>
        <ul class="mr-5">
          <form>
            {extractedData.map((pizza) => (
              <PizzaListItem pizza={pizza} />
            ))}
          </form>
        </ul>
      </div>
    </main>
  );
}

export default PizzaList;
