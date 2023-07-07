import { useState } from "react";
import { v4 } from "uuid";

let initialItems = [
  { id: 1, name: "Egg", quantity: 6, purpose: "Pancakes", inCart: false },
  { id: 2, name: "Milk", quantity: 2, purpose: "Pancakes", inCart: false },
  { id: 3, name: "Sugar", quantity: 1, purpose: "Pancakes", inCart: false },
  { id: 4, name: "Flour", quantity: 1, purpose: "Pancakes", inCart: false },
];

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}

function ButtonSvg({ children, onClick }) {
  return (
    <button onClick={onClick} className="btnSvg">
      {children}
    </button>
  );
}

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState("input");

  const itemsInCart = items.filter((item) => item.inCart).length;
  const percentageInCart = Math.round((itemsInCart / items.length) * 100);

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "name")
    sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "purpose")
    sortedItems = items
      .slice()
      .sort((a, b) => a.purpose.localeCompare(b.purpose));
  if (sortBy === "needed")
    sortedItems = items.slice().sort((a, b) => +a.inCart - +b.inCart);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(item) {
    const approval = window.confirm(
      `Are you sure that you want to delete ${item.name}?`
    );

    if (!approval) return;

    setItems((items) => items.filter((cur) => cur.id !== item.id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, inCart: !item.inCart } : item
      )
    );
    setSelected((cur) => (cur?.id === id ? null : cur));
  }

  function handleSelection(item) {
    setSelected((cur) => (cur?.id === item.id ? null : item));
  }

  function handleClearList() {
    const approval = window.confirm(
      "Are you sure that you want to delete all items from your list?"
    );

    if (!approval) return;

    setItems([]);
  }

  function handleEditSelected(editedItem) {
    setItems(
      items.map((item) =>
        item.id !== editedItem.id
          ? item
          : {
              ...item,
              name: editedItem.name,
              quantity: editedItem.quantity,
              purpose: editedItem.purpose,
            }
      )
    );

    setSelected(null);
  }

  return (
    <>
      <Header />
      <AddItemForm onAddItem={handleAddItem} />
      <div className="container">
        <div className="grid">
          <ShoppingList
            onToggleItem={handleToggleItem}
            onDeleteItem={handleDeleteItem}
            onSelect={handleSelection}
            selected={selected}
            onClearList={handleClearList}
            sortedItems={sortedItems}
          />
          {selected && (
            <FormEditItem
              onSelect={setSelected}
              selected={selected}
              onEditSelected={handleEditSelected}
            />
          )}
        </div>
      </div>
      <Actions
        items={items}
        onClearList={handleClearList}
        sortBy={sortBy}
        onSortBy={setSortBy}
      />
      <Stats items={itemsInCart} percentage={percentageInCart} />
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <h1 className="heading-primary">Shopping list</h1>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M96,104a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H104A8,8,0,0,1,96,104Zm8,40h64a8,8,0,0,0,0-16H104a8,8,0,0,0,0,16Zm128,48a32,32,0,0,1-32,32H88a32,32,0,0,1-32-32V64a16,16,0,0,0-32,0c0,5.74,4.83,9.62,4.88,9.66h0A8,8,0,0,1,24,88a7.89,7.89,0,0,1-4.79-1.61h0C18.05,85.54,8,77.61,8,64A32,32,0,0,1,40,32H176a32,32,0,0,1,32,32V168h8a8,8,0,0,1,4.8,1.6C222,170.46,232,178.39,232,192ZM96.26,173.48A8.07,8.07,0,0,1,104,168h88V64a16,16,0,0,0-16-16H67.69A31.71,31.71,0,0,1,72,64V192a16,16,0,0,0,32,0c0-5.74-4.83-9.62-4.88-9.66A7.82,7.82,0,0,1,96.26,173.48ZM216,192a12.58,12.58,0,0,0-3.23-8h-94a26.92,26.92,0,0,1,1.21,8,31.82,31.82,0,0,1-4.29,16H200A16,16,0,0,0,216,192Z"></path>
        </svg>
      </span>
    </header>
  );
}

function AddItemForm({ onAddItem }) {
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
          />
        </div>

        <div className="add-form__item">
          <label>*Item:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Egg"
          />
        </div>

        <div className="add-form__item">
          <label>Purpose: </label>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Pancakes"
          />
        </div>

        <Button>Add</Button>
      </form>
    </div>
  );
}

function ShoppingList({
  showEdit,
  onToggleItem,
  onDeleteItem,
  onToggleEdit,
  onSelect,
  selected,
  sortedItems,
}) {
  return (
    <ul className="shopping-list">
      {sortedItems.map((item) => (
        <Item
          item={item}
          key={item.id}
          onToggleItem={onToggleItem}
          onDeleteItem={onDeleteItem}
          onToggleEdit={onToggleEdit}
          showEdit={showEdit}
          onSelect={onSelect}
          selected={selected}
        />
      ))}
    </ul>
  );
}

function FormEditItem({ onSelect, selected, onEditSelected }) {
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

function Item({ item, onToggleItem, onDeleteItem, onSelect, selected }) {
  return (
    <li
      className={`shopping-item${item.inCart ? "__cart" : ""} ${
        item.id === selected?.id ? "selected-item" : ""
      }`}
    >
      <div className="shopping-item__content">
        <div className="shopping-item__left">
          <div className="shopping-item__checkbox">
            <input
              type="checkbox"
              id={`checkbox-${item.id}`}
              onChange={(e) => onToggleItem(item.id)}
            />
            <label htmlFor={`checkbox-${item.id}`}>
              <div className="tick_mark"></div>
            </label>
          </div>

          <div className="shopping-item__quantity">
            <p>{item.quantity} x</p>
          </div>
        </div>

        <div className="shopping-item__text">
          <p>{item.name}</p>
          <p className="shopping-item__text-cause">{item.purpose}</p>
        </div>
        <div className="shopping-item__buttons">
          {!item.inCart && (
            <ButtonSvg onClick={() => onSelect(item)}>
              {(!selected || selected.id !== item.id) && (
                <svg
                  className="shopping-item__edit"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                >
                  <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                </svg>
              )}
              {selected?.id === item.id && (
                <svg
                  className="shopping-item__edit"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38l48.2,53L36.68,152A15.89,15.89,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31l50.4-50.39,47.69,52.46a8,8,0,1,0,11.84-10.76ZM92.69,208H48V163.31l53.06-53,42.56,46.81ZM227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L118.33,70.36a8,8,0,0,0,11.32,11.31L136,75.31,180.69,120l-9,9A8,8,0,0,0,183,140.34L227.32,96A16,16,0,0,0,227.32,73.37ZM192,108.69,147.32,64l24-24L216,84.69Z"></path>
                </svg>
              )}
            </ButtonSvg>
          )}

          <ButtonSvg onClick={() => onDeleteItem(item)}>
            <svg
              className="shopping-item__delete"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
            >
              <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
            </svg>
          </ButtonSvg>
        </div>
      </div>
    </li>
  );
}

function Actions({ onClearList, sortBy, onSortBy }) {
  return (
    <div className="actions">
      <select value={sortBy} onChange={(e) => onSortBy(e.target.value)}>
        <option value="input">Sort by input order</option>
        <option value="name">Sort by item name</option>
        <option value="purpose">Sort by purpose</option>
        <option value="needed">Sort by still needed</option>
      </select>
      <Button onClick={() => onClearList()}>Clear All</Button>
    </div>
  );
}

function Stats({ items, percentage }) {
  return (
    <footer className="stats u-text-center">
      <p>
        {percentage === 100
          ? "Good job! You now have all the items from your list!"
          : items === 0
          ? "Good luck with finding your desired items!"
          : `You already got ${items} items in the cart. That is ${percentage}% of all items.`}
      </p>
    </footer>
  );
}
