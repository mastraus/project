import React, { Fragment } from "react";

function AddPizzaModal({
  allToppings,
  handleAddFormChange,
  handleAddFormSubmit,
}) {
  return (
    <form id="add-pizza" onSubmit={handleAddFormSubmit} className="form-style">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Add New Pizza</h4>
          </div>
          <div class="modal-body">
            <div class="custom-control custom-checkbox mr-3">
              <input
                className="add-pizza-input m-3 mb-4 mt-3 p-2"
                name="pizza_name"
                type="text"
                placeholder="Enter pizza name..."
                onChange={handleAddFormChange}
              />
              <div className="add-pizza-toppings">
                <h5>Select Toppings:</h5>
                <div className="mt-3">
                  {allToppings.map(({ id, topping_name }) => (
                    <Fragment>
                      <div class="customo control custmo-checkboox">
                        <input
                          className="mr-2"
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
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button className="btn btn-warning" type="submit">
              Submit
            </button>
          </div>
        </div>

    </form>
  );
}

export default AddPizzaModal;
