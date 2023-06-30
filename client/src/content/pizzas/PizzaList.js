import React, { useEffect, useState, Fragment } from "react";
import PizzaListItem from "./PizzaListItem";
import AddPizzaModal from "./AddPizzaModal";
import EditPizzaRow from "./EditPizzaRow";
import Modal from "react-modal";

function PizzaList() {
  const [allPizzas, setAllPizzas] = useState([]);
  const [allToppings, setAllToppings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [addFormData, setAddFormData] = useState({
    pizza_name: "",
    toppings: [],
  });
  const [editFormData, setEditFormData] = useState({
    pizza_name: "",
    toppings: [],
  });

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

  function extractPizzaAndToppingNames(allPizzas) {
    return Object.entries(allPizzas).map(([key, item]) => {
      const { pizza_name, toppings } = item;
      const toppingNames = toppings.map((topping) => topping.topping_name);
      const toppingIds = toppings.map((topping) => topping.topping_id);

      return {
        id: key,
        pizza_name: pizza_name,
        topping_names: toppingNames,
        topping_ids: toppingIds,
      };
    });
  }

  function extractToppingsById(pizzaId, allPizzas) {
    const pizza = allPizzas[pizzaId];

    if (pizza) {
      return pizza.toppings.map(({ topping_id }) => topping_id);
    }

    return [];
  }

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
    await fetch("/pizzas", requestOptions);
    fetchPizzas();
  }

  async function updatePizza() {
    console.log(`front updatePizza func ${editFormData.pizza_name}`);
    console.log(typeof editFormData.pizza_name);
    console.log(`front updatePizza func ${editFormData.toppings}`);
    console.log(typeof editFormData.toppings);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pizza_name: editFormData.pizza_name,
        topping_ids: editFormData.toppings,
      }),
    };
    await fetch(`/pizzas/${editId}`, requestOptions);
    fetchPizzas();
  }

  async function deletePizza(pizzaId) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(`/pizzas/${pizzaId}`, requestOptions);
    fetchPizzas();
  }

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

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    console.log(`fieldName: ${fieldName}`);
    const fieldValue = event.target.value;
    console.log(`fieldValue: ${fieldValue}`);
    const isChecked = event.target.checked;

    setEditFormData((prevFormData) => {
      if (fieldName === "toppings") {
        let updatedToppings;

        if (isChecked) {
          updatedToppings = [...prevFormData[fieldName], Number(fieldValue)];
        } else {
          updatedToppings = prevFormData[fieldName].filter(
            (topping) => topping !== Number(fieldValue)
          );
        }

        return {
          ...prevFormData,
          [fieldName]: updatedToppings,
        };
      } else {
        return {
          ...prevFormData,
          [fieldName]: fieldValue,
        };
      }
    });
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    savePizza();
    setModalOpen(false);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    console.log(`handleEditSubmit edit form: ${editFormData.pizza_name}`);
    console.log(`handleEditSubmit edit form: ${editFormData.toppings}`);
    updatePizza();
    setEditId(null);
  };

  const handleEditClick = (event, pizza) => {
    event.preventDefault();
    const pizzaId = pizza.id;
    setEditId(pizzaId);

    const toppings = extractToppingsById(pizzaId, allPizzas);

    const newFormData = {
      pizza_name: pizza.pizza_name,
      toppings,
    };

    setEditFormData(newFormData);
  };

  const handleCancelClick = () => {
    setEditId(null);
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
      <div className="d-flex justify-content-center">
        <button className="pizza-btn p-4" onClick={openModal}>
          Add New Pizza!
        </button>
      </div>

      {/* <div classname="modal-dialog modal-dialog-centered"> */}

        <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          portalClassName="test1"
        >
          <AddPizzaModal
            allToppings={allToppings}
            handleAddFormChange={handleAddFormChange}
            handleAddFormSubmit={handleAddFormSubmit}
          />
        </Modal>
     
      <br />

      <div>
        <ul class="mr-5">
          <form onSubmit={handleEditFormSubmit}>
            {extractPizzaAndToppingNames(allPizzas).map((pizza) => (
              <Fragment>
                {editId === pizza.id ? (
                  <>
                    <br />
                    <EditPizzaRow
                      pizza={pizza}
                      allToppings={allToppings}
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                    <br />
                  </>
                ) : (
                  <>
                    <br />
                    <PizzaListItem
                      pizza={pizza}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={deletePizza}
                    />
                    <br />
                  </>
                )}
              </Fragment>
            ))}
          </form>
        </ul>
      </div>
    </main>
  );
}

export default PizzaList;
