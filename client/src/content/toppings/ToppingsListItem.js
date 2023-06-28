import React from "react";

function ToppingsListItem({ topping, handleEditClick, handleDeleteClick }) {
  return (
    <li
      key={topping.id}
      class="list-group-item d-flex justify-content-between align-items-center p-2"
    >
      <div class="d-flex align-items-center pl-4">{topping.topping_name}</div>
      <div class="pr-3">
        <button
          type="button"
          class="btn btn-default"
          onClick={(event) => handleEditClick(event, topping)}
        >
          <span class="fa fa-pencil fa-lg"></span>
        </button>
        <button
          type="button"
          class="btn btn-default"
          onClick={() => handleDeleteClick(topping.id)}
        >
          <span class="fa fa-trash fa-lg"></span>
        </button>
      </div>
    </li>
  );
}

export default ToppingsListItem;
