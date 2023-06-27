import React, { useState } from "react";
import { createTopping } from "../../utils/api";
import AddToppingForm from "./AddToppingForm";
import "../../index.css";

function AddTopping() {
  const [newTopping, setNewTopping] = useState([]);

  // function handleSubmit(topping) {
  //   createTopping(topping)
  // }

  function onSubmitTopping(newTopping) {
    createTopping(newTopping);
  }

  // function changeHandler({ topping }) {
  //   setAddNewTopping((prevState) => ({
  //     ...prevState,
  //     topping,
  //   }));
  // }

  // function submitHandler(event) {
  //   event.preventDefault();
  //   onSubmitTopping({ ...addNewTopping });
  //   setAddNewTopping(addNewTopping);
  // }

  function handleNewToppingChange(event) {
    event.preventDefault();
    setNewTopping(event.target.value);
  }

  // const handleAddNewTopping = (event) => {
  //   event.preventDefault();
  //   const toppingName = event.target.value;

  //   setAddNewTopping(toppingName);
  // };

  //add items
  //entering text: handleInput()
  //when click on button, addItem()

  //handleInput(): current item{text:, key:}

  // handleInput = (e) => {
  //     e.preventDefaut();
  //     alert(ref.)
  // }

  // addItem(e) {

  // }

  return (
    <form id="to do form" onSubmit={onSubmitTopping}>
      <input
        className="topping-input p-3 w-75"
        name="topping_name"
        type="text"
        placeholder="Enter new topping..."
        onChange={handleNewToppingChange}
        required={true}
        value={newTopping}
      />
      <button className="topping-btn p-3 " type="submit">
        Add
      </button>
    </form>
  );
}

export default AddTopping;
