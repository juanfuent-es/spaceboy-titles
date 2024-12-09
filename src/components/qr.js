import QRCodeStyling from 'qr-code-styling'

export default class QR {
    constructor() {
        this.code = new QRCodeStyling({
            width: 300,
            height: 300,
            type: "svg",
            data: window.location.href,
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
        })
        const img = new Image()
        this.code.getRawData("svg").then((data) => {
            img.src = URL.createObjectURL(data)
            img.onload = () => {
                this.qrImage = img
            }
        })
    }

    onResize(center, _size) {
        this.size = _size
        this.x = center.x - this.size / 2
        this.y = center.y - this.size / 2
    }

    draw(_ctx) {
        if (this.qrImage) {
            _ctx.save()
            _ctx.drawImage(this.qrImage, this.x, this.y, this.size, this.size)
            _ctx.restore()
        }
    }
}