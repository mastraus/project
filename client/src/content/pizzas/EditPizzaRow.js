import React from "react";

function EditPizzaRow({
  pizza,
  handleEditFormChange,
  editFormData,
  handleCancelClick,
}) {
  return (
    <li
      key={pizza.id}
      class="list-group-item d-flex justify-content-between align-items-center p-2"
    >
      <input
        class="edit-form d-flex align-items-center pl-4"
        type="text"
        required={true}
        placeholder={pizza.pizza_name}
        name="pizza_name"
        value={editFormData.pizza_name}
        onChange={handleEditFormChange}
      ></input>
      <div className="pr-3">
        <button type="submit" class="btn btn-default">
          <span class="fa fa-check fa-lg"></span>
        </button>
        <button
          type="button"
          class="btn btn-default"
          onClick={handleCancelClick}
        >
          <span class="fa fa-close fa-lg"></span>
        </button>
      </div>
    </li>
  );
}

export default EditPizzaRow;
