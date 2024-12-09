import { gsap } from 'gsap'
export default class Text {
    constructor(_title) {
        this.title = _title
        this.text = this.title.innerHTML.toUpperCase()
        this.str = ''
        this.stroked = false
        //
        this.offset = { x: 0, y: 0 }
        this.fontSize = 28
        this.setup()
        this.createTimeline()
    }

    setup() {
        this.title.style.color = 'transparent'
    }

    createTimeline() {
        const chars = this.text.split('');
        this.timeline = gsap.timeline({
            paused: true, onComplete: () => {
                this.str = this.text
                this.stroked = false
            }
        })
        chars.forEach((char, index) => this.animateChar(index))
    }

    animateChar(charIdx) {
        const duration = 1; // Duration for each random change
        const randomChars = '-/·=+*^%$#@!¡?¿';
        this.timeline.to({}, {
            duration: duration,
            onComplete: () => {
                let extraChar = randomChars.charAt(Math.floor(Math.random() * randomChars.length));
                this.str = this.text.slice(0, charIdx) + extraChar
                this.stroked = Math.random() > .5
            }
        })
    }

    show() {
        this.timeline.duration(1).play()
    }

    hide() {
        this.str = ""
    }

    onResize(_offset) {
        this.fontSize = this.getFontSize()
        this.offset = _offset
    }

    draw(_ctx) {
        _ctx.save()
        _ctx.translate(this.offset.x, this.offset.y)
        // _ctx.fillStyle = "red"
        // _ctx.fillRect(this.x, this.y - (this.height / 2), this.width, this.height)
        _ctx.font = `${this.fontSize}px Coolvetica`
        _ctx.textAlign = 'left'
        _ctx.textBaseline = 'middle'
        if (this.stroked) {
            _ctx.strokeText(this.str, this.x, this.y)
        } else {
            _ctx.fillText(this.str, this.x, this.y)
        }
        _ctx.restore()
    }

    getFontSize() {
        const style = window.getComputedStyle(this.title, null)
        return parseFloat(style.getPropertyValue('font-size'))
    }
    // getters
    get x() {
        return -this.width / 2
    }
    get y() {
        /* El 10% es equivalente al line-height, que equivale a .8em
        *  este correspondería al alto de la fuente, por lo que el .2em restante es el espacio
        * que debe existir entre el aire superior del texto y el inferior. Resultando en [.2 / 2 = .1]
        */
        return this.height * .1
    }

    get rect() {
        return this.title.getBoundingClientRect()
    }

    get width() {
        return this.rect.width
    }

    get height() {
        return this.rect.height
    }
}