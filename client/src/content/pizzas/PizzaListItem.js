import React from "react";

function PizzaListItem({ pizza, handleEditClick, handleDeleteClick }) {
  return (
    <li
      key={pizza.id}
      class="pizza-list-group-item d-flex justify-content-between align-items-center p-2"
    >
      <div class="column pizza-text p-2">
        <div class="pizza-name d-flex align-items-center pl-2">
          <h5>{pizza.pizza_name}</h5>
        </div>
        <div className="topping-subtitle row d-flex pizza-toppings pl-4">
          {pizza.topping_names.length === 0 ? (
            <span>None</span>
          ) : (
            pizza.topping_names.map((topping, index) => (
              <span key={topping}>
                {topping}
                {index !== pizza.topping_names.length - 1 && ", "}
              </span>
            ))
          )}
        </div>
      </div>

      <div class="pr-3">
        <button
          type="button"
          class="btn btn-default"
          onClick={(event) => handleEditClick(event, pizza)}
        >
          <span class="fa fa-pencil fa-lg"></span>
        </button>

        <button
          type="button"
          class="btn btn-default"
          onClick={() => handleDeleteClick(pizza.id)}
        >
          <span class="fa fa-trash fa-lg"></span>
        </button>
      </div>
    </li>
  );
}

export default PizzaListItem;
