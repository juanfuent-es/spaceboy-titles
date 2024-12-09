import QRCodeStyling from 'qr-code-styling'
import { gsap } from 'gsap';
export default class QR {
    constructor() {
        this.size = 0;
        this.x = 0;
        this.y = 0;
        this.scale = 0
        this.alpha = 1;
        this.qrImage = null;
        this.code = new QRCodeStyling({
            width: 300,
            height: 300,
            type: "svg",
            data: "https://spaceboy.mx/",
            image: "/logo.svg",
            dotsOptions: {
                color: "#FFF",
                type: "square"
            },
            backgroundOptions: {
                color: "#000",
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 10
            }
        });

        const img = new Image();
        this.code.getRawData("svg").then((data) => {
            img.src = URL.createObjectURL(data);
            img.onload = () => {
                this.qrImage = img;
                this.show()
            }
        })
    }

    onResize(center, _size) {
        this.size = _size;
        this.x = center.x - this.size / 2
        this.y = center.y - this.size / 2
    }

    show() {
        if (this.qrImage) {
            gsap.to(this, { 
                scale: 2,
                duration: 1,
                ease: "steps(8)",
                onUpdate: () => {
                    this.alpha = Math.random() > .7 ? 0 : 1
                },
                onComplete: () => {
                    this.alpha = 0
                }
            })
        }
    }

    draw(_ctx) {
        if (this.qrImage) {
            const scaledSize = this.size * this.scale
            const offsetX = (scaledSize - this.size) / 2
            const offsetY = (scaledSize - this.size) / 2
            _ctx.save()
            _ctx.globalAlpha = this.alpha
            _ctx.drawImage(this.qrImage, this.x - offsetX, this.y - offsetY, scaledSize, scaledSize)
            _ctx.restore()
        }
    }
}