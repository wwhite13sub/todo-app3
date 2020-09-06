const initialState = {
    todosList: {},
    filter: 'all'
}

export default function todo(state=initialState, action) {
    let todoId = 0;
    let todosListCopy = {};

    switch(action.type) {
        case 'ADD_TODO':
            const newTask = {
                id: action.payload.id,
                taskDescription: action.payload.taskDescription,
                assignedTo: parseInt(action.payload.assignedTo),
                completed: false,
                status: 'active'
            }
            todosListCopy = Object.assign({}, state.todosList);
            todosListCopy[action.payload.id] = newTask;
            
            return {...state, todosList: todosListCopy};
        case 'MARK_COMPLETE':
            todoId = action.payload.id;
            return {
                ...state,
                todosList: {
                    ...state.todosList,
                    [todoId]: {
                        ...state.todosList[todoId],
                        completed: true,
                        status: 'completed'
                    }
                }
            };
        case 'DELETE_TODO':
            todoId = action.payload.id;
            todosListCopy = Object.assign({}, state.todosList);
            delete todosListCopy[todoId];
            return {...state, todosList: todosListCopy};
        case 'CHANGE_FILTER':
            return {...state, filter: action.payload.filter};
        default:
            return state;
    }
}