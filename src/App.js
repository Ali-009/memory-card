import './App.css';

import {useState} from 'react'
import cardArray from './game-card-data'
import RandomGrid from './components/RandomGrid'

function App() {
    const [gameOver, setGameOver] = useState(false)
    const [gameOverCard, setGameOverCard] = useState('')
    const [clickCount, setClickCount] = useState(0)

    let gameResult = ''

    if(clickCount === cardArray.length){
        setGameOver(true)
        gameResult = 'Congratulations You\'ve won!'
    } else if (gameOver && clickCount < cardArray.length){
        gameResult = `Oops, you\'ve lost! You clicked ${gameOverCard} twice! Your score is ${clickCount}`
    }

    function handlePlayAgain(e){
        window.location.reload()
    }

    return (
        <div className="App">
          <h1>Memory Game</h1>
          {!gameOver && <p className='click-count'>Click Count: {clickCount}</p>}
          {gameResult}
          <div className="card-container">
            <RandomGrid gameOver={gameOver} setGameOver={setGameOver}
            setClickCount={setClickCount} gameOverCard={gameOverCard}
            setGameOverCard={setGameOverCard} />
          </div>
          {gameOver && <button onClick={handlePlayAgain} className='game-reset-button'>Play Again</button>}
      </div>
      );

}

export default App;