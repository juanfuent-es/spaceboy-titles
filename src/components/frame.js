export default class Frame {
    constructor() {
        this.width = 0
        this.height = 0
        this.center = {
            x: 0,
            y: 0
        }
    }

    onResize(_width, _height, _center) {
        this.width = _width
        this.height = _height
        this.center = _center
    }

    draw(_ctx) {
        _ctx.save()
        _ctx.strokeStyle = "#FFF"
        _ctx.strokeRect(this.width * .05, this.height * .05, this.width * .9, this.height * .9)
        _ctx.strokeRect(this.width * .1, this.height * .1, this.width * .8, this.height * .8)
        // lines
        this.top(_ctx)
        this.left(_ctx)
        this.right(_ctx)
        this.bottom(_ctx)
        //
        _ctx.restore()
    }

    left(_ctx) {
        _ctx.beginPath()
        _ctx.moveTo(0, this.center.y)
        _ctx.lineTo(this.width * .075, this.center.y)
        _ctx.closePath()
        _ctx.stroke()
    }

    right(_ctx) {
        _ctx.beginPath()
        _ctx.moveTo(this.width, this.center.y)
        _ctx.lineTo(this.width * .925, this.center.y)
        _ctx.closePath()
        _ctx.stroke()
    }

    top(_ctx) {
        _ctx.beginPath()
        _ctx.moveTo(this.center.x, 0)
        _ctx.lineTo(this.center.x, this.height * .075)
        _ctx.closePath()
        _ctx.stroke()
    }

    bottom(_ctx) {
        _ctx.beginPath()
        _ctx.moveTo(this.center.x, this.height)
        _ctx.lineTo(this.center.x, this.height * .925)
        _ctx.closePath()
        _ctx.stroke()
    }
}