function Navbar(props) {
  return (
    <nav>
      <ul>
        <li onClick={props.captura} className={props.act[0]}><span> Captura </span></li>
        <p> | </p>
        <li onClick={props.simulador} className={props.act[1]}><span> Simulador </span></li>
      </ul>
    </nav>
  );
}

export default Navbar;
