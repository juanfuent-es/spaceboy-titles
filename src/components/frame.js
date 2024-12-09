import { gsap } from "gsap"
export default class Frame {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.center = {
            x: 0,
            y: 0
        }
        this.scale = 2
        this.alpha = 0
    }

    onResize(_width, _height, _center) {
        this.width = _width;
        this.height = _height;
        this.center = _center;
    }

    show() {
        gsap.to(this, {
            scale: 1,
            alpha: 1,
            duration: 1,
            ease: "steps(10)"
        })
    }

    draw(_ctx) {
        this.context = _ctx;
        _ctx.save();
        _ctx.globalAlpha = this.alpha;
        
         // Calculate the offset to center the scaled content
         const offsetX = (this.width - this.width * this.scale) / 2;
         const offsetY = (this.height - this.height * this.scale) / 2;
 
         _ctx.translate(offsetX, offsetY);
         _ctx.scale(this.scale, this.scale);

        // Draw rectangles
        const rects = [
            { x: this.width * 0.05, y: this.height * 0.05, w: this.width * 0.9, h: this.height * 0.9 },
            { x: this.width * 0.1, y: this.height * 0.1, w: this.width * 0.8, h: this.height * 0.8 }
        ];
        rects.forEach(rect => _ctx.strokeRect(rect.x, rect.y, rect.w, rect.h));

        // Draw lines
        const lines = [
            { moveTo: [0, this.center.y], lineTo: [this.width * 0.075, this.center.y] }, // left
            { moveTo: [this.width, this.center.y], lineTo: [this.width * 0.925, this.center.y] }, // right
            { moveTo: [this.center.x, 0], lineTo: [this.center.x, this.height * 0.075] }, // top
            { moveTo: [this.center.x, this.height], lineTo: [this.center.x, this.height * 0.925] } // bottom
        ];
        lines.forEach(line => {
            _ctx.beginPath();
            _ctx.moveTo(...line.moveTo);
            _ctx.lineTo(...line.lineTo);
            _ctx.closePath();
            _ctx.stroke();
        });

        _ctx.restore();
    }
}