export default class Pipe {
    constructor(maxHeight: number) {
        const displacement = Math.random() * maxHeight
    }

    getHTMLElement(): HTMLImageElement {
        const pipe = document.createElement('img');
        pipe.src = "./resources/pipe.png"
        pipe.className = "pipe"
        pipe.style.width = "10%"
        pipe.style.height = "100%"
        pipe.style.marginLeft = "20px"
        pipe.style.marginRight = "20px"
        return pipe
    }
}