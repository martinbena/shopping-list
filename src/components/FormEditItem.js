import { useState } from "react";
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
      <div className="edit-item__content">
        <form className="edit-item" onSubmit={handleEdit}>
          <div className="edit-item__groups">
            <div className="edit-item__group">
              <input
                type="number"
                value={editedQuantity}
                onChange={(e) => setEditedQuantity(+e.target.value)}
                min="1"
                required
                placeholder="6"
              />
            </div>
            <div className="edit-item__group">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                pattern="[A-Za-z]{2,}"
                required
                placeholder="Egg"
              />
              <input
                type="text"
                value={editedPurpose}
                onChange={(e) => setEditedPurpose(e.target.value)}
                pattern="[A-Za-z]{2,}"
                placeholder="Pancakes"
              />
            </div>
          </div>

          <div className="edit-item__buttons">
            <ButtonSvg>
              <svg
                className="edit-item__confirm"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,120v88a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h88a8,8,0,0,1,0,16H48V208H208V120a8,8,0,0,1,16,0Z"></path>
              </svg>
            </ButtonSvg>
            <ButtonSvg onClick={onSelect}>
              <svg
                className="edit-item__close"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
              </svg>
            </ButtonSvg>
          </div>
        </form>
      </div>
    </div>
  );
}
