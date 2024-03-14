const defaultState = {
    todos: []
}

export function totoReducer(state = defaultState, actions) {
    if (actions.type == "TODO_ADD") {
        let copied = JSON.parse(JSON.stringify(state.todos))
        copied.push(actions.payload)
        return { ...state, todos: copied }
    } else if (actions.type == 'TODO_REMOVE') {
        let copied = JSON.parse(JSON.stringify(state.todos))
        copied = copied.filter(el => {
            return el.id != actions.payload
        })
        return { ...state, todos: copied }
    } else {
        return state
    }
}