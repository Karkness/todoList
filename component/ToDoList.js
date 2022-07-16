import html from '../js/core.js'
import ToDoItem from './ToDoItem.js'
import { connect } from '../js/store.js'

function ToDoList({ todoList, filter, filters }) {	
            return html`<section class="main">
			<input onchange="dispatch( 'toggleAll' , this.checked)" 
					${todoList.every(filters.completed) && 'checked'}
				id="toggle-all" class="toggle-all" type="checkbox">
			<label for="toggle-all">Mark all as complete</label>
			<ul class="todo-list">
				${todoList.filter(filters[filter]).map((todo , index) => ToDoItem({ todo , index}))}
			</ul>
		</section>
		`
}
export default connect()(ToDoList)

