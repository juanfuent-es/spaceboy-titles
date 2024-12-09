import './style.css'
import { gsap } from 'gsap'
import Canvas from './lib/canvas'
import Text from './components/text'
import QR from './components/qr'
import Frame from './components/frame'
class OpeningTitle extends Canvas {
    constructor(_container) {
        super(_container)
        this.container = _container
        this.title = this.container.querySelector('h1')
        // objects
        this.frame = null
        this.txt = null
        this.qr = null
        // dimensions
        this.width = this.rect.width
        this.height = this.rect.height
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        }
        //
        this.qr = new QR()
        this.frame = new Frame()
        this.addEvents()
    }

    addEvents() {
        document.fonts.ready.then(() => {
            this.txt = new Text(this.title)
            this.start()
        })
        //
        window.addEventListener('resize', () => this.onResize())
    }

    start() {
        this.animate()
        this.onResize()
        this.frame.show()
        gsap.delayedCall(.65, () => {
            this.txt.show()
        })
    }

    animate() {
        requestAnimationFrame(() => this.animate())
        this.render()
    }

    render() {
        this.clear()
        this.context.lineWidth = 1
        this.context.strokeStyle = '#FFF'
        this.context.fillStyle = '#FFF'
        //
        this.frame.draw(this.context)
        this.qr.draw(this.context)
        this.txt.draw(this.context)
        // frame
    }

    onResize() {
        const { width, height } = this.rect
        this.width = width
        this.height = height
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        }
        this.setSize(width, height)
        this.clear()
        //
        if (this.frame) this.frame.onResize(width, height, this.center)
        if (this.txt) this.txt.onResize(this.center)
        if (this.qr) this.qr.onResize(this.center, this.width * .2)
    }

    get rect() {
        return this.container.getBoundingClientRect()
    }
}

const container = document.querySelector('main')
const opening_title = new OpeningTitle(container)
window["opening"] = opening_title