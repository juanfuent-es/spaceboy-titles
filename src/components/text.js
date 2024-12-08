export default class Text {
    constructor(_title) {
        this.title = _title
        this.str = this.title.innerHTML
        console.log("Title: ", this.str)
    }
}