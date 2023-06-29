import React, { Fragment, useState } from "react";

// const checkedBoxes = document.querySelectorAll("input[type=checkbox]:checked");

function AddPizzaModal({
  allToppings,
  handleAddFormChange,
  handleAddFormSubmit,
}) {
  const [checkedToppings, setCheckedToppings] = useState([]);
  const [pizzaName, setPizzaName] = useState("");

  const handleChange = (e) => {
    if (e.target.checked === true) {
      setCheckedToppings([...checkedToppings, Number(e.target.value)]);
    } else {
      const selectedAcc = checkedToppings.filter((a) => {
        if (a === Number(e.target.value)) return false;
        return true;
      });
      setCheckedToppings([...selectedAcc]);
    }
  };

  return (
    <form
      id="add-pizza"
      className="add-pizza-container d-flex justify-content-center mr-h"
      onSubmit={() => handleAddFormSubmit}
    >
      <div>
        <h5>Make your pizza</h5>
        <div class="custom-control custom-checkbox">
          <input
            className="pizza-name-input p-3 ml-5"
            name="pizza_name"
            type="text"
            placeholder="Enter pizza name..."
            value={pizzaName}
            onChange={setPizzaName}
          />
          {allToppings.map((topping) => (
            <Fragment>
              <div class="customo control custmo-checkboox">
                <input
                  type="checkbox"
                  name="toppings"
                  id={topping.id}
                  value={topping.id}
                  onChange={(e) => handleChange(e)}
                />
                <label for={topping.id}>{topping.topping_name}</label>
                <button
                  type="button"
                  onClick={handleAddFormChange(pizzaName, checkedToppings)}
                >
                  Save Toppings
                </button>
              </div>
            </Fragment>
          ))}
        </div>

        <button className="pizza-add-btn p-3 ml-2" type="submit" onClick>
          Add Pizza
        </button>
      </div>
    </form>
  );
}

export default AddPizzaModal;
