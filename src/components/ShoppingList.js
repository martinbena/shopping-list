import Item from "./Item";

export default function ShoppingList({
  showEdit,
  onToggleItem,
  onDeleteItem,
  onToggleEdit,
  onSelect,
  selected,
  sortedItems,
  onEditSelected,
}) {
  return (
    <div className="container">
      <ul className="shopping-list">
        <div className="grid">
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
              onEditSelected={onEditSelected}
            />
          ))}
        </div>
      </ul>
    </div>
  );
}
