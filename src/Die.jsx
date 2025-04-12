import { useState, useEffect } from "react"


function Die(props) {
  const [btnValue, setBtnValue] = useState(props.value)
  
  useEffect(() => {
    const values = [1, 2, 3, 4, 5, 6, 1, 2, 3] 
    let i = 0
    const interval = setInterval(() => {      
      if (i < values.length) {
        setBtnValue(values[Math.floor(Math.random() * values.length)])
        i++
      } else {
        clearInterval(interval)
        setBtnValue(props.value)
      }
    }, 25)
    return () => clearInterval(interval)
  },[props.value] )




  return (
    <button
      onClick={() => props.action(props.id)}
      id={props.id}
      aria-pressed={props.isHeld}
      className={props.isHeld ? "die-button held" : "die-button"}
      aria-label={`Die with value ${props.value} ${
        props.isHeld ? "held" : "not held"
      }`}
    >
      {btnValue}
    </button>
  )
}

export default Die
