import Item from "./Item";

export default function ShoppingList({
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
