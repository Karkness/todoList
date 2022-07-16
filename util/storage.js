
const TODOS_STORAGE_KEY = 'ToDoLists'

export default {
    get() {
        return JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY)) || []
    },
    set(todoList) {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todoList))
    }
}