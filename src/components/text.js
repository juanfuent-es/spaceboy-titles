export default class Text {
    constructor(_title) {
        this.title = _title;
        this.str = this.title.innerHTML;
        this._x = 0;
        this._y = 0;
        console.log("Title: ", this.str);
    }

    onResize() {
        console.log("Width: ", this.width);
        console.log("Height: ", this.height);
    }

    // setters
    set x(value) {
        this._x = value;
    }

    set y(value) {
        this._y = value;
    }

    // getters
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
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