import React from "react";

function EditToppingRow({
  topping,
  editToppingName,
  handleEditChange,
  handleCancelClick,
}) {
  return (
    <li
      key={topping.id}
      class="list-group-item d-flex justify-content-between align-items-center p-2"
    >
      <input
        class="edit-form d-flex align-items-center pl-4"
        type="text"
        required={true}
        placeholder={topping.topping_name}
        name="topping_name"
        value={editToppingName.topping_name}
        onChange={handleEditChange}
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

export default EditToppingRow;
