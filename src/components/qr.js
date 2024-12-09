import QRCodeStyling from 'qr-code-styling'

export default class QR {
    constructor() {
        this.code = new QRCodeStyling({
            width: 100,
            height: 100,
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
                margin: 15
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
            this.context.save()
            this.context.drawImage(this.qrImage, this.x, this.y, this.size, this.size)
            this.context.restore()
        }
    }
}