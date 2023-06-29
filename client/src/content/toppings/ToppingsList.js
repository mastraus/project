import React, { useEffect, useState, Fragment } from "react";
import EditToppingRow from "./EditToppingRow";
import ToppingsListItem from "./ToppingsListItem";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToppingsList() {
  const [allToppings, setAllToppings] = useState([]);
  const [addTopping, setAddTopping] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTopping, setEditTopping] = useState("");

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
      body: JSON.stringify({ topping_name: addTopping }),
    };
    const response = await fetch("/toppings", requestOptions);
    const data = await response.json();
    const newToppings = [data, ...allToppings];
    setAllToppings(newToppings);
    setAddTopping("");
    fetchToppings();
  }

  async function updateTopping() {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topping_name: editTopping }),
    };
    const response = await fetch(`/toppings/${editId}`, requestOptions);
    const data = await response.json();
    const newToppings = [...allToppings];
    const index = allToppings.findIndex((topping) => topping.id === editId);
    newToppings[index] = data;
    setAllToppings(newToppings);
    setEditId(null);
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

    const newToppings = [...allToppings];
    const index = newToppings.findIndex((topping) => topping.id === toppingId);
    newToppings.splice(index, 1);
    setAllToppings(newToppings);
    fetchToppings();
  }

  const handleAddChange = (event) => {
    setAddTopping(event.target.value);
  };

  const handleEditChange = (event) => {
    setEditTopping(event.target.value);
  };

  const confirmAddedTopping = () => {
    toast.success("Topping added successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveToppings();
    confirmAddedTopping();
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    updateTopping();
  };

  const handleEditClick = (event, topping) => {
    event.preventDefault();
    setEditId(topping.id);
  };

  const handleCancelClick = () => {
    setEditId(null);
  };

  return (
    <main className="container">
      <h2>Toppings</h2>
      <hr />

      <form
        id="add-topping"
        onSubmit={handleSubmit}
        className="add-container d-flex justify-content-center mr-5"
      >
        <input
          className="topping-input p-3 ml-5"
          name="topping_name"
          type="text"
          placeholder="Enter new topping..."
          onChange={handleAddChange}
          required={true}
          value={addTopping}
        />
        <button className="topping-btn p-3 ml-2" type="submit">
          Add
        </button>
      </form>

      <div>
        <ul class="mr-5">
          <form onSubmit={handleEditSubmit}>
            {allToppings.map((topping) => (
              <Fragment>
                {editId === topping.id ? (
                  <>
                    <br />
                    <EditToppingRow
                      editToppingName={editTopping}
                      handleEditChange={handleEditChange}
                      topping={topping}
                      handleCancelClick={handleCancelClick}
                    />
                    <br />
                  </>
                ) : (
                  <>
                    <br />
                    <ToppingsListItem
                      topping={topping}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={deleteTopping}
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

export default ToppingsList;
