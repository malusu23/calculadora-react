

const Button = ({ texto, clase, handleClick }) => (
  <button className={clase} onClick={() => handleClick(texto)}>
    {texto}
  </button>
);

export default Button;