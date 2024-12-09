import { gsap } from 'gsap'
export default class Text {
    constructor(_title) {
        this.title = _title
        this.text = this.title.innerHTML.toUpperCase()
        this.str = ''
        //
        this.offset = { x: 0, y: 0 }
        this.fontSize = 34
        this._x = 0
        this._y = 0

        this.setup()
    }

    show() {
        let index = 0
        const randomChars = '-#/&%$·!¡?=)(/\\|@·$%&/()=?¡!·'
        const chars = this.text.split('');
        chars.forEach((char, index) => {
            gsap.to({}, {
                duration: 0.05 * index,
                onComplete: () => {
                    this.str += char
                }
            })
        })
    }

    hide() {

    }

    setup() {
        this.title.style.color = 'transparent'
    }

    onResize(_offset) {
        this.offset = _offset
        this.fontSize = this.getFontSize()
    }

    draw(_ctx) {
        _ctx.save()
        _ctx.translate(this.offset.x, this.offset.y)
        _ctx.font = `${this.fontSize}px Coolvetica`
        _ctx.fillStyle = '#FFF'
        _ctx.lineWidth = 2
        _ctx.strokeStyle = '#FFF'
        _ctx.textAlign = 'center'
        _ctx.textBaseline = 'middle'
        _ctx.strokeText(this.str, this.x, this.y)
        _ctx.restore()
    }
    
    getFontSize() {
        const style = window.getComputedStyle(this.title, null)
        return parseFloat(style.getPropertyValue('font-size'))
    }
    // setters
    set x(value) {
        this._x = value
    }

    set y(value) {
        this._y = value
    }

    // getters
    get x() {
        return this._x
    }

    get y() {
        /* El 10% es equivalente al line-height, que equivale a .8em
        *  este correspondería al alto de la fuente, por lo que el .2em restante es el espacio
        * que debe existir entre el aire superior del texto y el inferior. Resultando en [.2 / 2 = .1]
        */
        return this._y + (this.height * .1)
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