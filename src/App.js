import './App.css';
import batman from './images/batman.jpg'
import courage from './images/courage.jpg'
import daffy from './images/daffy-duck.jpg'
import dexter from './images/dexter.jpeg'
import jerry from './images/jerry.jpg'
import johnny from './images/johnny-bravo.jpg'
import scooby from './images/scooby.jpg'
import spiderman from './images/spider-man.jpg'
import woody from './images/woody.jpg'

import {useState, useEffect} from 'react'
import uniqid from 'uniqid'

function GameCard({image, characterName, isCardClicked, clickCard, clickCount, setClickCount, setGameResult}){

  const handleClick = (event) => {
    if(!isCardClicked){
      clickCard(true)
      setClickCount(clickCount + 1)
    } else {
      setGameResult('Oops, you\'ve lost! You clicked ' + characterName + ' twice! '+'Your score is ' + clickCount)
    }
  }
  let clickedStyle = ''
  isCardClicked ? clickedStyle = 'clicked' : clickedStyle = ''
  return (
    <figure onClick={handleClick} className={'card ' + clickedStyle}>
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

  //The state object of the GameCard components is lost when the app randomizes its positions in the React DOM
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

  const clickCard = [
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
  const [gameResult, setGameResult] = useState('')

  if(clickCount === cardImages.length){
    setGameResult('Congratulations! You\'ve won!')
    setClickCount(0)
  }

  //conditionally render either the gameBoard or gameResultDisplay
  let gameBoard = null
  let gameResultDisplay = null
  if(!gameResult){
    const GameCardGrid = cardImages.map((image, index) => {
      return (
        <GameCard key={uniqid()} image={image} characterName={characterNames[index]}
        isCardClicked={isCardClicked[index]} clickCard={clickCard[index]} 
        clickCount={clickCount} setClickCount={setClickCount}
        setGameResult={setGameResult}/>
      ) 
    })
    gameBoard = (
      <div className="App">
        <h1>Memory Game</h1>
        <p>Click Count: {clickCount}</p>
        <div className="card-container">
          {randomizeArray(GameCardGrid)}
        </div>
      </div>
    ) 
  } else {
    const resetGameState = (e) => {
      setGameResult('')
      for(let i = 0; i < clickCard.length; i++){
        clickCard[i](false)
      }
      setClickCount(0)
    }
    gameResultDisplay = (
      <div>
        {gameResult}
        <button onClick={resetGameState}>Play Again</button>
      </div>
    )
  }
  

  return (
    gameBoard || gameResultDisplay
  );
}

export default App;
