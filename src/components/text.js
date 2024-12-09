import { gsap } from 'gsap'
export default class Text {
    constructor(_title) {
        this.title = _title
        this.text = this.title.innerHTML.toUpperCase()
        this.str = ''
        //
        this.offset = { x: 0, y: 0 }
        this.fontSize = 28

        this.setup()
    }

    show() {
        this.str = '';
        const randomChars = '-#/·=';
        const chars = this.text.split('');
        const maxRandomChanges = 2; // Number of random changes before showing the final character

        chars.forEach((char, index) => {
            let randomChangeCount = 0;

            const animateChar = () => {
                if (randomChangeCount < maxRandomChanges) {
                    const randomChar = randomChars.charAt(Math.floor(Math.random() * randomChars.length));
                    this.str = this.text.slice(0, index) + randomChar;
                    randomChangeCount++;
                    gsap.to({}, { duration: 0.05, onComplete: animateChar });
                } else {
                    this.str = this.text.slice(0, index + 1);
                }
            }
            gsap.to({}, { delay: 0.1 * index, onComplete: animateChar });
        });
    }

    hide() {

    }

    setup() {
        this.title.style.color = 'transparent'
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
        _ctx.lineWidth = 1
        _ctx.fillStyle = '#FFF'
        _ctx.strokeStyle = '#FFF'
        _ctx.textAlign = 'left'
        _ctx.textBaseline = 'middle'
        _ctx.fillText(this.str, this.x, this.y)
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