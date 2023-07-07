import Button from "./Button";

export default function Actions({ onClearList, sortBy, onSortBy }) {
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
