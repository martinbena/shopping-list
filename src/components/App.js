import { useState } from "react";
import Header from "./Header";
import AddItemForm from "./AddItemForm";
import ShoppingList from "./ShoppingList";
import FormEditItem from "./FormEditItem";
import Actions from "./Actions";
import Stats from "./Stats";

let initialItems = [
  { id: 1, name: "Egg", quantity: 6, purpose: "Pancakes", inCart: false },
  { id: 2, name: "Milk", quantity: 2, purpose: "Pancakes", inCart: false },
  { id: 3, name: "Sugar", quantity: 1, purpose: "Pancakes", inCart: false },
  { id: 4, name: "Flour", quantity: 1, purpose: "Pancakes", inCart: false },
];

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
      {items.length > 0 && (
        <>
          <Actions
            items={items}
            onClearList={handleClearList}
            sortBy={sortBy}
            onSortBy={setSortBy}
          />
          <Stats items={itemsInCart} percentage={percentageInCart} />
        </>
      )}
    </>
  );
}
