import { useState } from "react";
import { v4 } from "uuid";
import Button from "./Button";

export default function AddItemForm({ onAddItem }) {
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const id = v4();
    const newItem = {
      id: id,
      name: name,
      quantity: quantity,
      purpose: purpose,
      inCart: false,
    };

    onAddItem(newItem);

    setQuantity("");
    setName("");
    setPurpose("");
  }

  return (
    <div className="add-form__wrapper">
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="add-form__item">
          <label>*Quantity:</label>
          <input
            className="add-form__item-quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
            placeholder="6"
            min="1"
            required
          />
          {/* <p>Please fill in the quantity.</p> */}
        </div>

        <div className="add-form__item">
          <label>*Item:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Egg"
            pattern="[A-Za-z]{2,}"
            required
          />
          {/* <p>Please fill in the item.</p> */}
        </div>

        <div className="add-form__item">
          <label>Purpose: </label>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Pancakes"
            pattern="[A-Za-z]{2,}"
          />
        </div>

        <Button>Add</Button>
      </form>
    </div>
  );
}
