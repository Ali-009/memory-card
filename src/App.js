import './App.css';
import batman from './images/batman.jpg'
import courage from './images/courage.jpg'
import daffy from './images/daffy-duck.jpg'
import dexter from './images/dexter.jpg'
import jerry from './images/jerry.jpg'
import johnny from './images/johnny-bravo.jpg'
import scooby from './images/scooby.jpg'
import spiderman from './images/spider-man.jpg'
import woody from './images/woody.jpg'

import {useState, useEffect} from 'react'
import uniqid from 'uniqid'

function GameCard(props){

  const {image, characterName, isCardClicked, setIsCardClicked} = props
  const {clickCount, setClickCount, gameOver, setGameOver, setGameResult} = props

  const handleClick = (event) => {
    if(!isCardClicked && !gameOver){
      setIsCardClicked(true)
      setClickCount(clickCount + 1)
    } else if(!gameOver){
      setGameOver(true)
      setGameResult('Oops, you\'ve lost! You clicked ' + characterName + ' twice! '+'Your score is ' + clickCount)
    }
  }

  return (
    <figure onClick={handleClick} className='card'>
      <img className={'card-image'} src={image} alt={characterName} />
      <figcaption>{characterName}</figcaption>
    </figure>
  )
}

function randomizeArray(array){
  let randomizedArray = []
  let indexArray = []
  //creating an array of indexes based on the length of the array we want to randomize
  for(let i = 0; i < array.length; i++){
    indexArray[i] = i
  }

  for(let i = 0; i < array.length; i++){
    //Choose a randomIndex within the range of indexArray
    //This works because the length of indexArray is reduced on every iteration
    let randomIndex = Math.floor(Math.random()*indexArray.length)
    //randomizedArray always has a valid value because our indexes aren't totally random
    //They are randomly picked from within indexArray
    randomizedArray[indexArray[randomIndex]] = array[i]
    //Once a value is used within indexArray, it is removed from indexArray
    indexArray.splice(randomIndex, 1)
  }

  return randomizedArray
}

function App() {

  const cardImages = [
    batman,
    courage,
    daffy,
    dexter,
    jerry,
    johnny,
    scooby,
    spiderman,
    woody,
  ]

  const characterNames = [
    'Batman',
    'Courage',
    'Daffy Duck',
    'Dexter',
    'Jerry',
    'Johnny Bravo',
    'Scooby',
    'Spider-man',
    'Woody',
  ]

  //The state object of the GameCard components is lost when the app randomizes its position in the React DOM
  //This why its best to store the state of GameCard components in the App component,
  //as its position is never changed in the React DOM
  const [batmanClicked, setBatmanClicked] = useState(false)
  const [courageClicked, setCourageClicked] = useState(false)
  const [daffyClicked, setDaffyClicked] = useState(false)
  const [dexterClicked, setDexterClicked] = useState(false)
  const [jerryClicked, setJerryClicked] = useState(false)
  const [johnnyClicked, setJohnnyClicked] = useState(false)
  const [scoobyClicked, setScoobyClicked] = useState(false)
  const [spidermanClicked, setSpidermanClicked] = useState(false)
  const [woodyClicked, setWoodyClicked] = useState(false)


  const isCardClicked = [
    batmanClicked,
    courageClicked,
    daffyClicked,
    dexterClicked,
    jerryClicked,
    johnnyClicked,
    scoobyClicked,
    spidermanClicked,
    woodyClicked,
  ]

  const setIsCardClicked = [
    setBatmanClicked,
    setCourageClicked,
    setDaffyClicked,
    setDexterClicked,
    setJerryClicked,
    setJohnnyClicked,
    setScoobyClicked,
    setSpidermanClicked,
    setWoodyClicked,
  ]

  const [clickCount, setClickCount] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameResult, setGameResult] = useState('')
  
  const GameCardGrid = cardImages.map((cardImage, index) => {
    return (
      <GameCard key={uniqid()} image={cardImage} characterName={characterNames[index]}
      isCardClicked={isCardClicked[index]} setIsCardClicked={setIsCardClicked[index]} 
      clickCount={clickCount} setClickCount={setClickCount}
      gameOver={gameOver} setGameOver={setGameOver}
      setGameResult={setGameResult}/>
    )
  })
  
  const [randomGrid, setRandomGrid] = useState(GameCardGrid)

  //Randomize Grid on mount
  useEffect(() => {
    //To make use of effects, we need them to change state variables
    //Otherwise the effects won't cause a re-render
    setRandomGrid(randomizeArray(GameCardGrid))
  }, [])

  //Randomize Grid when the clickCount is incremented
  //This won't cause an infinite loop, as the effect is only applied on the condition that clickCount chnages
  useEffect(() => {
    if(!gameOver){
      if(clickCount === characterNames.length){
        setGameOver(true)
        setGameResult('Congratulations! You\'ve won!')
      } else {
        setRandomGrid(randomizeArray(GameCardGrid))
      }
    }
  }, [clickCount])
  
  useEffect(() => {
    setRandomGrid(randomizeArray(GameCardGrid))
  }, [gameOver])

  const handleGameReset = (e) => {
    setGameOver(false)
    setClickCount(0)
    //Make all the cards not clicked
    for(let i = 0; i < setIsCardClicked.length; i++){
      setIsCardClicked[i](false)
    }
    setGameResult('')
    setRandomGrid(randomizeArray(GameCardGrid))
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      {!gameOver && <p className='click-count'>Click Count: {clickCount}</p>}
      {gameOver && <p className='game-result'>{gameResult}</p>}
      <div className="card-container">
        {randomGrid}
      </div>
      {gameOver && <button className='game-reset-button' onClick={handleGameReset}>Play Again</button>}
  </div>
  );
}

export default App;
