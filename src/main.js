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
            this.txt.show()
            // dimensions
            this.onResize()
            this.animate()
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
        // frame
        this.drawFrame(this.context)
    }

    drawFrame(_ctx) {
        _ctx.save()
        _ctx.strokeStyle = "#FFF"
        _ctx.strokeRect(this.width * .05, this.height * .05, this.width * .9, this.height * .9)
        _ctx.strokeRect(this.width * .1, this.height * .1, this.width * .8, this.height * .8)
        // lines
        //top
        _ctx.beginPath()
        _ctx.moveTo(this.center.x, 0)
        _ctx.lineTo(this.center.x, this.height * .075)
        _ctx.closePath()
        _ctx.stroke()
        // left
        _ctx.beginPath()
        _ctx.moveTo(0, this.center.y)
        _ctx.lineTo(this.width * .075, this.center.y)
        _ctx.closePath()
        _ctx.stroke()
        // right
        _ctx.beginPath()
        _ctx.moveTo(this.width, this.center.y)
        _ctx.lineTo(this.width * .925, this.center.y)
        _ctx.closePath()
        _ctx.stroke()
        // bottom
        _ctx.beginPath()
        _ctx.moveTo(this.center.x, this.height)
        _ctx.lineTo(this.center.x, this.height * .925)
        _ctx.closePath()
        _ctx.stroke()
        //
        _ctx.restore()
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
        if (this.txt) {
            this.txt.onResize(this.center)
            console.log("Resize")
        }
    }

    get rect() {
        return this.container.getBoundingClientRect()
    }
}

const container = document.querySelector('main')
const opening_title = new OpeningTitle(container)
window["opening"] = opening_title