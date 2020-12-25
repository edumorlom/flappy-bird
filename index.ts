// USE `tsc --module esnext  --watch *.ts`

import Bird from './Bird.js'
import Pipe from './Pipe.js'

type positionType = Pipe | null;

const HEIGHT = 10
const WIDTH = 10

const SPEED = 100

const bird = new Bird()
const map: positionType[] = new Array(WIDTH)
const sky = document.getElementsByClassName("sky")[0]


const renderScreen = () => {
    sky.innerHTML = ""
    const birdHTMLElement = bird.getHTMLElement()
    sky.appendChild(birdHTMLElement)
    map.forEach((position, index) => {
        if (position !== null) {
            const pipeHTMLElement = position.getHTMLElement()
            pipeHTMLElement.style.right = 100 - (index * WIDTH) + "%"
            sky.appendChild(pipeHTMLElement)
        }
    })
}

// Refreshes the screen and re-draws all elements.
setInterval(renderScreen, 1)

setInterval(() => {
    const placePipe = Math.random() >= 0.7
    let pipe = null;
    if (placePipe) {
        pipe = new Pipe(HEIGHT)
    }
    map.push(pipe)
    map.shift()
}, SPEED)

document.addEventListener("keypress", () => {
    bird.flyUp()
})

