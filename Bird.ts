export default class Bird {
    altitude = 50
    domElement: HTMLElement;
    constructor() {
        this.domElement = document.createElement("img")
        this.domElement.id = "bird"
        this.domElement.setAttribute("src", "./resources/bird.png")
        this.domElement.style.width = "100px"
        this.domElement.innerHTML = '<img  width=100></img>'

        // Start a 40% percent Y axis.
        this.setAltitude(0)

        setInterval(() => {
            this.setAltitude(this.altitude + 0.5)
        }, 10)
    }

    flyUp = () => {
        const a = setInterval(() => {
            this.setAltitude(this.altitude - 0.4)
        }, 1)

        setTimeout(() => {
            clearTimeout(a)
        }, 200)
    }

    setAltitude = (altitude: number) => {
        this.altitude = altitude
        this.domElement.style.top = altitude + "%"
    }

    getHTMLElement = (): HTMLElement => {
        return this.domElement
    }
}