import './style.css'
import Text from './components/text'
class OpeningTitle {
    constructor(_container) {
        this.container = _container
        this.title = this.container.querySelector('h1')
        this.txt = new Text(this.title)
    }
}

const container = document.querySelector('header')
const opening_title = new OpeningTitle(container)
window["opening"] = opening_title