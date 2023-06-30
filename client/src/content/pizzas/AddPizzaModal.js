import React, { Fragment } from "react";

function AddPizzaModal({
  allToppings,
  handleAddFormChange,
  handleAddFormSubmit,
}) {
  return (
    <div>
      <form
        id="add-pizza"
        className="test-2 d-flex justify-content-center mr-h"
        onSubmit={handleAddFormSubmit}
      >
        <div>
          <h5>Make your pizza</h5>
          <div class="custom-control custom-checkbox">
            <input
              className="pizza-name-input p-3 ml-5"
              name="pizza_name"
              type="text"
              placeholder="Enter pizza name..."
              onChange={handleAddFormChange}
            />
            {allToppings.map(({ id, topping_name }) => (
              <Fragment>
                <div class="customo control custmo-checkboox">
                  <input
                    type="checkbox"
                    name="toppings"
                    id={id}
                    value={id}
                    onChange={handleAddFormChange}
                  />
                  <label for={id}>{topping_name}</label>
                </div>
              </Fragment>
            ))}
          </div>

          <button className="pizza-add-btn p-3 ml-2" type="submit">
            Add Pizza
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPizzaModal;
