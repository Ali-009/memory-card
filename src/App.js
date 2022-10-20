import './App.css';
import batman from './images/batman.jpg'
import courage from './images/courage.jpg'
import daffyDuck from './images/daffy-duck.jpg'
import dexter from './images/dexter.jpeg'
import jerry from './images/jerry.jpg'
import johnnyBravo from './images/johnny-bravo.jpg'
import scooby from './images/scooby.jpg'
import spiderMan from './images/spider-man.jpg'
import woodyWoodpecker from './images/woody.jpg'

import {useState, useEffect} from 'react'
import uniqid from 'uniqid'

function GameCard({image, characterName}){
  const [clicked, setClicked] = useState(false)

  const handleClick = (event) => {
    event.preventDefault()
    setClicked(true)
  }
  let clickedStyle = ''
  clicked ? clickedStyle = 'clicked' : clickedStyle = ''
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
    daffyDuck,
    dexter,
    jerry,
    johnnyBravo,
    scooby,
    spiderMan,
    woodyWoodpecker
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
    'Woody'
  ]

  const GameCardGrid = cardImages.map((image, index) => {
    return <GameCard key={uniqid()} image={image} characterName={characterNames[index]}/>
  })

  const randomizedGrid = randomizeArray(GameCardGrid)

  return (
    <div className="App">
      <div className="card-container">
        {randomizedGrid}
      </div>
    </div>
  );
}

export default App;
