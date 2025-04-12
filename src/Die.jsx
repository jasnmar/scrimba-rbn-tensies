function Die(props) {

  

  return (
    <button
      onClick={() => props.action(props.id)}
      onChange={changer}
      id={props.id}
      aria-pressed={props.isHeld}
      className={props.isHeld ? "die-button held" : "die-button"}
      aria-label={`Die with value ${props.value} ${
        props.isHeld ? "held" : "not held"
      }`}
    >
      {props.value}
    </button>
  )
}

export default Die
