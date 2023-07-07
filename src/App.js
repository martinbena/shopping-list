import { useState } from "react";
import { v4 } from "uuid";

let initialItems = [
  { id: 1, item: "Egg", quantity: 6, purpose: "Pancakes", inCart: false },
  // { id: 2, item: "Milk", quantity: 2, purpose: "Pancakes" },
  // { id: 3, item: "Sugar", quantity: 1, purpose: "Pancakes" },
  // { id: 4, item: "Flour", quantity: 1, purpose: "Pancakes" },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, inCart: !item.inCart } : item
      )
    );
  }

  return (
    <>
      <Header />
      <AddItemForm onAddItem={handleAddItem} />
      <div className="container">
        <div className="grid">
          <ShoppingList items={items} onToggleItem={handleToggleItem} />
          <FormEditItem />
        </div>
      </div>
      <Actions />
      <Stats />
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
  const [item, setItem] = useState("");
  const [purpose, setPurpose] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const id = v4();
    const newItem = {
      id: id,
      item: item,
      quantity: quantity,
      purpose: purpose,
      inCart: false,
    };

    onAddItem(newItem);

    setQuantity("");
    setItem("");
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
            value={item}
            onChange={(e) => setItem(e.target.value)}
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

        <button className="btn">Add</button>
      </form>
    </div>
  );
}

function ShoppingList({ items, onToggleItem }) {
  return (
    <ul className="shopping-list">
      {items.map((item) => (
        <Item
          item={item.item}
          id={item.id}
          quantity={item.quantity}
          purpose={item.purpose}
          cart={item.inCart}
          key={item.id}
          onToggleItem={onToggleItem}
        />
      ))}
    </ul>
  );
}

function FormEditItem() {
  return (
    <div className="edit-item__wrapper">
      <h2 className="heading-secondary">Edit XX</h2>
      <form className="edit-item">
        <div className="edit-item__groups">
          <div className="edit-item__group">
            <label>*Item</label>
            <input type="text" />
          </div>

          <div className="edit-item__group">
            <label>*Quantity</label>
            <input type="text" />
          </div>

          <div className="edit-item__group">
            <label>For</label>
            <input type="text" />
          </div>
        </div>
        <div className="u-text-center">
          <button className="btn">Edit</button>
        </div>
      </form>

      <svg
        className="edit-item__close"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
      >
        <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
      </svg>
    </div>
  );
}

function Item({ item, quantity, purpose, id, cart, onToggleItem }) {
  return (
    <li className={`shopping-item${cart ? "__cart" : ""}`}>
      <div className="shopping-item__content">
        <div className="shopping-item__left">
          <div className="shopping-item__checkbox">
            <input
              type="checkbox"
              id={`checkbox-${id}`}
              onChange={(e) => onToggleItem(id)}
            />
            <label htmlFor={`checkbox-${id}`}>
              <div className="tick_mark"></div>
            </label>
          </div>

          <div className="shopping-item__quantity">
            <p>{quantity} x</p>
          </div>
        </div>

        <div className="shopping-item__text">
          <p>{item}</p>
          <p className="shopping-item__text-cause">{purpose}</p>
        </div>
        <div className="shopping-item__buttons">
          <svg
            className="shopping-item__edit"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
          >
            <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
          </svg>
          <svg
            className="shopping-item__delete"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
          >
            <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
          </svg>
        </div>
      </div>
    </li>
  );
}

function Actions() {
  return (
    <div className="actions">
      <select>
        <option value="">Sort by input order</option>
        <option value="">Sort by item name</option>
        <option value="">Sort by cause</option>
        <option value="">Sort by still needed</option>
      </select>
      <button className="btn">Clear All</button>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats u-text-center">
      <p>You already got XX items. That is XX% of all items.</p>
    </footer>
  );
}
