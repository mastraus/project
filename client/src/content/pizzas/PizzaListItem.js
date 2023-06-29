import React from "react";

function PizzaListItem({ pizza }) {
  return (
    <li
      key={pizza.id}
      class="list-group-item d-flex justify-content-between align-items-center p-2"
    >
      <div class="column pizza-text">
        <div class="pizza-name d-flex align-items-center pl-4">
          {pizza.pizza_name}
        </div>
        <div class="row pizza-toppings">
          {pizza.topping_names.map((topping) => (
            <h5>{topping}</h5>
          ))}
        </div>
      </div>

      <div class="pr-3">
        <button type="button" class="btn btn-default">
          <span class="fa fa-pencil fa-lg"></span>
        </button>

        <button type="button" class="btn btn-default">
          <span class="fa fa-trash fa-lg"></span>
        </button>
      </div>
    </li>
  );
}

export default PizzaListItem;
