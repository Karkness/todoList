import storage from "../util/storage.js"

const init = {
    todoList: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: (todo) => !todo.complete,
        completed: (todo) => todo.complete
    }
}


const actions = {
    add({todoList}, title) {
        if (title) {
            todoList.push({title, complete: false})
            storage.set(todoList)
        }
    },
    toggle({todoList}, index) {
        const todo = todoList[index]
        todo.complete = !todo.complete
        storage.set(todoList)
    },
    toggleAll({todoList}, checked){
        todoList.forEach(todo => todo.complete = checked)
        storage.set(todoList)
    },
    destroy({todoList}, index) {
        todoList.splice(index,1)
        storage.set(todoList)

    }
}
export default function reducer(state = init, action, args) {
    actions[action] &&  actions[action](state, ...args)
            return state
    }
