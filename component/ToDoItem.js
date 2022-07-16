import html from '../js/core.js'

export default function ToDoItem({todo, index}) {
            return html
			`
			<li class="${todo.complete && 'completed'}">
			<div class="view">
				<input onchange="dispatch('toggle', ${index})" class="toggle" type="checkbox" ${todo.complete && 'checked'}>
				<label>${todo.title}</label>
				<button class="destroy" onclick="dispatch('destroy', ${index})"></button>
			</div>
			<input class="edit" value="${todo.title}">
		</li>
		`
}