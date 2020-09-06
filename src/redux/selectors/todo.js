export const getTodosByFilter = (todosList, filter) => {
    console.log(todosList, filter);
    let allTodos = [];
    for (var key in todosList) {
        allTodos.push(todosList[key]);
    }
    switch (filter) {
        case 'completed':
            return allTodos.filter(todo => todo.completed);
        case 'active':
            return allTodos.filter(todo => !todo.completed);
        case 'all':
        default:
            return allTodos;
    }
};