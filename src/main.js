import './style.css'
import Canvas from './lib/canvas'
import Text from './components/text'
class OpeningTitle extends Canvas {
    constructor(_container) {
        super(_container)
        this.container = _container
        this.title = this.container.querySelector('h1')
        // objects
        this.txt = null
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
        document.fonts.ready.then(() => {
            this.txt = new Text(this.title)
            // dimensions
            this.onResize()
            this.animate()
            console.log("FontsLoaded")
        })
        //
        window.addEventListener('resize', () => this.onResize())
        this.onResize()
    }

    animate() {
        requestAnimationFrame(() => this.animate())
        this.render()
    }

    render() {
        this.clear()
        this.txt.draw(this.context)
    }

    onResize() {
        const { width, height } = this.rect
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        }
        this.setSize(width, height)
        this.clear()
        //
        if (this.txt) this.txt.onResize(this.center)
    }

    get rect() {
        return this.container.getBoundingClientRect()
    }
}

const container = document.querySelector('main')
const opening_title = new OpeningTitle(container)
window["opening"] = opening_title