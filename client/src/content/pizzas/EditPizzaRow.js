import React, { Fragment } from "react";

function EditPizzaRow({
  pizza,
  handleEditFormChange,
  editFormData,
  handleCancelClick,
  allToppings,
}) {
  return (
    <li
      key={pizza.id}
      class="list-group-item d-flex justify-content-between align-items-center p-2"
    >
      <div class="column edit-pizza-toppings">
        <input
          class="edit-form d-flex align-items-center pl-4"
          type="text"
          placeholder={pizza.pizza_name}
          name="pizza_name"
          value={editFormData.pizza_name}
          onChange={handleEditFormChange}
        ></input>
        {allToppings.map(({ id, topping_name }) => (
          <Fragment class="row">
            <input
              type="checkbox"
              name="toppings"
              id={id}
              value={id}
              onChange={handleEditFormChange}
              defaultChecked={pizza.topping_ids.includes(id)}
            />
            <label for={id}>{topping_name}</label>
          </Fragment>
        ))}
      </div>
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
