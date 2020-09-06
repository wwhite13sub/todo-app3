let nextTodoId = 0;

export const addTodo = (state) => ({
    type: 'ADD_TODO',
    payload: {
        id: ++nextTodoId,
        taskDescription: state.taskDescription,
        assignedTo: state.assignedTo
    }
});

export const changeFilter = (filter) => ({
    type: 'CHANGE_FILTER',
    payload: {
        filter: filter
    }
});

export const markComplete = (id) => ({
    type: 'MARK_COMPLETE',
    payload: {
        id: id
    }
});

export const deleteTodo = (id) => ({
    type: 'DELETE_TODO',
    payload: {
        id: id
    }
});