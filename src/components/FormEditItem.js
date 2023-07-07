import { useState } from "react";
import Button from "./Button";
import ButtonSvg from "./ButtonSvg";

export default function FormEditItem({ onSelect, selected, onEditSelected }) {
  const [editedName, setEditedName] = useState(selected.name);
  const [editedQuantity, setEditedQuantity] = useState(selected.quantity);
  const [editedPurpose, setEditedPurpose] = useState(selected.purpose);

  function handleEdit(e) {
    e.preventDefault();

    const editedItem = {
      ...selected,
      name: editedName,
      quantity: editedQuantity,
      purpose: editedPurpose,
    };

    onEditSelected(editedItem);
  }
  return (
    <div className="edit-item__wrapper">
      <h2 className="heading-secondary">Edit {selected.name}</h2>
      <form className="edit-item" onSubmit={handleEdit}>
        <div className="edit-item__groups">
          <div className="edit-item__group">
            <label>*Item</label>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>

          <div className="edit-item__group">
            <label>*Quantity</label>
            <input
              type="number"
              value={editedQuantity}
              onChange={(e) => setEditedQuantity(+e.target.value)}
            />
          </div>

          <div className="edit-item__group">
            <label>Purpose</label>
            <input
              type="text"
              value={editedPurpose}
              onChange={(e) => setEditedPurpose(e.target.value)}
            />
          </div>
        </div>
        <div className="u-text-center">
          <Button>Edit</Button>
        </div>
      </form>

      <span className="edit-item__close">
        <ButtonSvg onClick={() => onSelect(null)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
          </svg>
        </ButtonSvg>
      </span>
    </div>
  );
}
