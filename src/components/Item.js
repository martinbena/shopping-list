import ButtonSvg from "./ButtonSvg";

export default function Item({
  item,
  onToggleItem,
  onDeleteItem,
  onSelect,
  selected,
}) {
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
