import html from '../js/core.js'
import {connect} from '../js/store.js'
import Header from './Header.js'
import ToDoList from './ToDoList.js'
import Footer from './Footer.js'

function App({todoList}) {
    return html`
    <section class="todoapp">
        ${Header()}
        ${todoList.length > 0 && ToDoList()}
        ${todoList.length > 0 && Footer()}
    </section>
    
    `
}


export default connect()(App)