const initialState = {
    active: ''
}

export default function navbar(state=initialState, action) {
    switch(action.type) {
        case 'CHANGE_ACTIVE':
            return {...state, active: action.payload.name};
        default:
            return state;
    }
}