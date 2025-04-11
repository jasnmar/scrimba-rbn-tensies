import './App.css'
import { useState } from 'react'
import Die from './Die.jsx'


function App() {
  const [dice, setDice] = useState(allNewDice())
  
  function allNewDice() {
    return new Array(10).fill(0).map(() => (
       Math.ceil(Math.random() * 6)

    ))
  }

  const diceElems = dice.map(die => {
    return <Die value={die} />
  })

  function reRoll() {
    setDice(allNewDice())
  }
  
  return (
    <>
    <main>
      <div className='dice-container'>
        {diceElems}
      </div>
      <button onClick={reRoll}>Roll</button>
    </main>
    </>
  )
}

export default App
