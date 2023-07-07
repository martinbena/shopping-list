export default function Stats({ items, percentage }) {
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
