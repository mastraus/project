import React, { Fragment, useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";

// const checkedBoxes = document.querySelectorAll("input[type=checkbox]:checked");

function AddPizzaModal({
  allToppings,
  handleChange,
  newPizzaName,
  handleEditSubmit,
  handleAddSubmit,
  getChecked,
  handleAddFormChange,
  handleAddFormSubmit,
}) {
  const [checkedToppings, setCheckedToppings] = useState([]);
  // var checkboxes = document.querySelectorAll("input[type=checkbox]");

  // const getChecked = (event) => {
  //   const { checked, value } = event.currentTarget;

  //   setCheckedToppings((prev) =>
  //     checked ? [...prev, value] : prev.filter((val) => val !== value)
  //   );
  // };

  useEffect(() => {
    console.log(checkedToppings);
  }, [checkedToppings]);

  // const handleAddName = (event) => {
  //   setPizzaName(event.target.value);
  // };

  // function getChecked() {
  //   var checked = [];
  //   console.log(checked);

  //   for (var i = 0; i < checkboxes.length; i++) {
  //     var checkbox = checkboxes[i];
  //     if (checkbox.checked) checked.push(checkbox.value);
  //   }
  //   return checked;
  // }

  // var toppingArray = [];
  // var checkboxes = document.querySelectorAll("input[type=checkbox]");

  // function getChecked() {
  //   for (var checkbox of checkboxes) {
  //     if (checkbox.checked === true) {
  //       toppingArray.push(this.id);
  //     } else {
  //       toppingArray = toppingArray.filter((e) => e !== this.id);
  //     }
  //   }
  //   console.log(toppingArray);
  // }

  // function getSelectedToppings() {
  //   const selected = new Array();
  //   const toppingIdSelect = document.getElementById("toppings");
  //   for (var i = 0; i < toppingIdSelect.clientHeight; i++) {
  //     if (toppingIdSelect[i].checked) {
  //       selected.push(toppingIdSelect[i].value);
  //     }
  //   }
  //   console.log(selected);
  // }

  // const handleChange = (e) => {
  //   if (e.target.checked === true) {
  //     setCheckedToppings([...checkedToppings, Number(e.target.value)]);
  //   } else {
  //     const selectedAcc = checkedToppings.filter((a) => {
  //       if (a === Number(e.target.value)) return false;
  //       return true;
  //     });
  //     setCheckedToppings([...selectedAcc]);
  //   }
  // };

  return (
    <form
      id="add-pizza"
      className="add-pizza-container d-flex justify-content-center mr-h"
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
              {/* <Checkbox
                checked
                defaultChecked={false}
                id="toppings"
                onChange={getChecked}
                value={topping.id}
              /> */}

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
  );
}

export default AddPizzaModal;
