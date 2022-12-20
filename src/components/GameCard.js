import {useState} from 'react'

function GameCard(props){
    const [isClicked, setIsClicked] = useState(false)
    const {image, name} = props
    const {setClickCount, gameOver, setGameOver, setGameOverCard} = props

    const handleClick = (e) => {
        if(!gameOver && !isClicked){
            setIsClicked(true)
            setClickCount(clickCount => clickCount + 1)
        } else if(!gameOver && isClicked){
            setGameOver(true)
            setGameOverCard(name)
        }
    }
    
    return (
        <figure onClick={handleClick} className='card'>
            <img className={'card-image'} src={image} alt={name} />
            <figcaption>{name}</figcaption>
        </figure>
    )
}

export default GameCard