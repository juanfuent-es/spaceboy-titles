import './style.css'
import Canvas from './lib/canvas'
import Text from './components/text'
class OpeningTitle extends Canvas {
    constructor(_container) {
        super(_container)
        this.container = _container
        this.title = this.container.querySelector('h1')
        this.txt = new Text(this.title)
        // dimensions
        this.width = this.rect.width
        this.height = this.rect.height
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        }
        //
        this.addEvents()
    }

    addEvents() {
        window.addEventListener('resize', () => this.onResize())
        this.onResize()
    }

    onResize() {
        const { width, height } = this.rect
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        }
        this.setSize(width, height)
        this.clear()
    }

    get rect() {
        return this.container.getBoundingClientRect()
    }
}

const container = document.querySelector('main')
const opening_title = new OpeningTitle(container)
window["opening"] = opening_title