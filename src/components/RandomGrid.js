import GameCard from './GameCard'
import cardArray from '../game-card-data'

function RandomGrid({ gameOver, setGameOver, setClickCount, 
    gameOverCard, setGameOverCard}){

    const Grid = cardArray.map(card => {
        return (
            <GameCard key={card.id} image={card.image}
            name={card.name} setClickCount={setClickCount}
            gameOver={gameOver} setGameOver={setGameOver} 
            gameOverCard={gameOverCard} setGameOverCard={setGameOverCard}/>
        )
    })

    return randomizeArray(Grid)
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

export default RandomGrid