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
  const [newPizzaName, setNewPizzaName] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [checkedToppings, setCheckedToppings] = useState([]);

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

  // const newPizzas = [...allPizzas, newPizza]
  // setAllPizzas(newPizzas)

  async function savePizza() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pizza_name: addFormData.pizza_name,
        topping_ids: addFormData.toppings,
      }),
    };
    const response = await fetch("/pizzas", requestOptions);
    const data = await response.json();
    console.log(data);
    const extractedPizzas = extractedData;
    console.log(extractedPizzas);
    const newPizzas = [...extractedPizzas, data];
    setAllPizzas(newPizzas);
  }

  // const handleAddSubmit = (event) => {
  //   event.preventDefault();
  //   savePizza();
  // };

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };

    if (fieldName === "toppings") {
      newFormData[fieldName] = [...newFormData[fieldName], fieldValue];
    } else {
      newFormData[fieldName] = fieldValue;
    }

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    savePizza();
  };

  // const handleAddNewPizza = (pizzaName, toppings) => {
  //   setNewPizzaName(pizzaName);
  //   setSelectedToppings(toppings);
  //   savePizza(newPizzaName, selectedToppings);
  // };

  // const handleAddToppingsChange = (toppings) => {
  //   setSelectedToppings(toppings);
  //   console.log(selectedToppings);
  // };

  const handleChange = (event) => {
    setNewPizzaName(event.target.value);
  };

  const handleEditSubmit = (checkedToppings) => {
    savePizza(checkedToppings);
  };

  // const handleAddFormChange = (pizzaName, checkedToppings) => {
  //   const newFormData = {
  //     pizza_name: pizzaName,
  //     toppings: checkedToppings,
  //   };

  //   setAddFormData(newFormData);
  // };

  // const handleAddFormNameChange = (event) => {
  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;

  //   const newFormData = { ...addFormData };
  //   newFormData[fieldName] = fieldValue;
  //   setAddFormData(newFormData);
  //   console.log(newFormData);
  // };

  // function handleAddFormToppingsChange(checkedToppings) {
  //   const newFormData = { ...addFormData };
  //   newFormData["toppings"] = checkedToppings;
  //   setAddFormData(newFormData);
  //   console.log(newFormData);
  // }

  // const handleAddFormSubmit = (event, pizzaName, checkedToppings) => {
  //   const newPizza = {
  //     pizza_name: pizzaName,
  //     toppings: checkedToppings,
  //   };

  //   const newPizzas = [...allPizzas, newPizza];
  //   setAllPizzas(newPizzas);
  //   savePizza();
  // };

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const getChecked = (event) => {
    const { checked, value } = event.currentTarget;

    setCheckedToppings((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };

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
