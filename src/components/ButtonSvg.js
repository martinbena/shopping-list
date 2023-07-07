export default function ButtonSvg({ children, onClick }) {
  return (
    <button onClick={onClick} className="btnSvg">
      {children}
    </button>
  );
}
