const defaultState = {
    users: []
}

export function userInfoReducer(state = defaultState, actions) {
    let copied = JSON.parse(JSON.stringify(state.users));

    switch (actions.type) {

        case "ADD":
            copied.push(actions.payload);
            return { ...state, users: copied };

        case "REMOVE":
            copied = copied.filter(el => el.id !== actions.payload);
            return { ...state, users: copied };

        case 'EDIT':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === actions.payload.id ? { ...user, ...actions.payload.updatedUser } : user
                )
            };

        default:
            return state;
    }

}