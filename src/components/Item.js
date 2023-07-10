import ButtonSvg from "./ButtonSvg";
import FormEditItem from "./FormEditItem";

export default function Item({
  item,
  onToggleItem,
  onDeleteItem,
  onSelect,
  selected,
  onEditSelected,
}) {
  return (
    <>
      <li
        className={`shopping-item${item.inCart ? "__cart" : ""} ${
          item.id === selected?.id ? "selected-item" : ""
        }`}
      >
        {item.id !== selected?.id && (
          <div className="shopping-item__content">
            <div className="shopping-item__left">
              <div className="shopping-item__checkbox">
                <input
                  type="checkbox"
                  id={`checkbox-${item.id}`}
                  onChange={() => onToggleItem(item.id)}
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
                </ButtonSvg>
              )}

              <ButtonSvg onClick={() => onDeleteItem(item)}>
                <svg
                  className="shopping-item__delete"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                </svg>
              </ButtonSvg>
            </div>
          </div>
        )}
        {item.id === selected?.id && (
          <FormEditItem
            onSelect={onSelect}
            selected={selected}
            onEditSelected={onEditSelected}
          />
        )}
      </li>
    </>
  );
}
