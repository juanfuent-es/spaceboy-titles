const PX_RATIO = window.devicePixelRatio

export default class Canvas {
    constructor(_container) {
        if (_container === undefined) this.container = document.body
        else this.container = _container
        //
        this.canvas = document.createElement("canvas")
        this.container.appendChild(this.canvas)
        this.context = this.canvas.getContext("2d")
    }

    setSize(_width, _height) {
        this.canvas.style.width = `${_width}px`
        this.canvas.style.height = `${_height}px`
        this.canvas.width = _width * PX_RATIO
        this.canvas.height = _height * PX_RATIO
        this.context.scale(PX_RATIO, PX_RATIO)
        this.clear()
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
	
    stroke(_color="black") {
        this.context.strokeStyle = _color
        this.context.stroke()
    }

    fill(_fill="black") {
        this.context.fillStyle = _fill
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
    
    bg(_fill) {
        return this.fill(_fill)
    }
}