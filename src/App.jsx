import "./App.css"
import { useState, useEffect, useRef } from "react"
import { nanoid } from "nanoid"
import Die from "./Die.jsx"
import ReactConfetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(() => allNewDice())
  const [rolls, setRolls] = useState(0)

  let lowRoll = JSON.parse(localStorage.getItem("rolls"))

  const mainButton = useRef(null)

  function allNewDice() {
    return new Array(10).fill(0).map(() => {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        version: 0,
        id: nanoid()
      }
    })
  }

  const heldAr = dice.map((die) => die.isHeld)
  const valAr = dice.map((die) => die.value)

  const heldSet = new Set(heldAr)
  const valSet = new Set(valAr)
  let gameWon = false
  if (heldSet.size === 1 && valSet.size === 1 && heldSet.has(true)) {
    gameWon = true
  }

  useEffect(() => {
    if (gameWon) {
      mainButton.current = document.getElementById("main-button")
      mainButton.current.focus()
      if (rolls < lowRoll) {
        localStorage.setItem("rolls", JSON.stringify(rolls))
      } else if (lowRoll === null) {
        localStorage.setItem("rolls", JSON.stringify(rolls))
      }
    }
  }, [gameWon, rolls, lowRoll])

  function hold(id) {
    const newDice = dice.map((die) => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    })
    setDice(newDice)
  }

  const diceElems = dice.map((die) => {
    return (
      <Die
        key={die.id}
        id={die.id}
        action={hold}
        value={die.value}
        isHeld={die.isHeld}
        version={die.version}
      />
    )
  })

  function reRoll() {
    if (gameWon) {
      setDice(allNewDice())
      setRolls(0)
    } else {
      setRolls((prevRolls) => prevRolls + 1)
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return die.isHeld
            ? die
            : { ...die, value: Math.ceil(Math.random() * 6), version: die.version + 1}
        })
      })
    }
  }

  return (
    <>
      <main>
        {gameWon && <ReactConfetti />}
        <div aria-live="polite" className="sr-only">
          {gameWon && (
            <p>Congratulations! You won! Press "New Game" to start again.</p>
          )}
        </div>
        <p className="record">Low roll record: {lowRoll}</p>
        <p className="record">Current Rolls: {rolls}</p>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElems}</div>
        <button id="main-button" onClick={reRoll}>
          {gameWon ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  )
}

export default App
