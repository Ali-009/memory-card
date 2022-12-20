
import batman from './images/batman.jpg'
import courage from './images/courage.jpg'
import daffy from './images/daffy-duck.jpg'
import dexter from './images/dexter.jpg'
import jerry from './images/jerry.jpg'
import johnny from './images/johnny-bravo.jpg'
import scooby from './images/scooby.jpg'
import spiderman from './images/spider-man.jpg'
import woody from './images/woody.jpg'

import uniqid from 'uniqid'

const cardArray = [
    {
        id: uniqid(),
        name: 'Batman',
        image: batman,

    },
    {
        id: uniqid(),
        name: 'Courage',
        image: courage,
    },
    {
        id:uniqid(),
        name: 'Daffy Duck',
        image: daffy,
    },
    {
        id:uniqid(),
        name: 'Dexter',
        image: dexter,
    },
    {
        id:uniqid(),
        name: 'Jerry',
        image: jerry,
    },
    {
        id:uniqid(),
        name: 'Johnny Bravo',
        image: johnny,
    },
    {
        id:uniqid(),
        name: 'Scooby',
        image: scooby,
    },
    {
        id:uniqid(),
        name: 'Spider-man',
        image: spiderman,
    },
    {
        id:uniqid(),
        name: 'Woody',
        image: woody,
    }
]

export default cardArray