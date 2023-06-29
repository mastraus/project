import React, { useEffect, useState, Fragment } from "react";
import PizzaListItem from "./PizzaListItem";
import AddPizzaModal from "./AddPizzaModal";
import EditPizzaRow from "./EditPizzaRow";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    return Object.values(allPizzas).map((item) => {
      const { pizza_name, toppings } = item;
      const toppingNames = toppings.map((topping) => topping.topping_name);
      const toppingIds = toppings.map((topping) => topping.topping_id);

      return {
        pizza_name: pizza_name,
        topping_names: toppingNames,
        topping_ids: toppingIds,
      };
    });
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
    //might need to model how it was done with POST
    const response = await fetch(`/pizzas/${editId}`, requestOptions);
    const data = await response.json();
    const newPizzas = [...allPizzas];
    const index = allPizzas.findIndex((pizza) => pizza.id === editId);
    newPizzas[index] = data;
    setAllPizzas(newPizzas);
    setEditId(null);
    fetchToppings();
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
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };

    if (fieldName === "toppings") {
      newFormData[fieldName] = [...newFormData[fieldName], fieldValue];
    } else {
      newFormData[fieldName] = fieldValue;
    }

    setEditFormData(newFormData);
  };

  const confirmAddedPizza = () => {
    toast.success("Pizza added successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    savePizza();
    setModalOpen(false);
    confirmAddedPizza();
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    updatePizza();
  };

  const handleEditClick = (event, pizza) => {
    event.preventDefault();
    setEditId(pizza.id);

    const formValues = {
      pizza_name: pizza.pizza_name,
      toppings: pizza.toppings,
    };

    setEditFormData(formValues);
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
          <form onSubmit={handleEditFormSubmit}>
            {extractPizzaAndToppingNames(allPizzas).map((pizza) => (
              <Fragment>
                {editId === pizza.id ? (
                  <>
                    <br />
                    <EditPizzaRow
                      pizza={pizza}
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
                    />
                    <br />
                  </>
                )}
              </Fragment>
            ))}
          </form>
        </ul>
      </div>
      <ToastContainer />
    </main>
  );
}

export default PizzaList;
