const initialState = {
    contactsList: {},
    contactWasAdded: false
}

export default function contact(state=initialState, action) {
    switch(action.type) {
        case 'ADD_CONTACT':
            const newContact = {
                id: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                comments: action.payload.comments
            }
            let contactsListCopy = Object.assign({}, state.contactsList);
            contactsListCopy[action.payload.id] = newContact;
            
            return {...state, contactsList: contactsListCopy, contactWasAdded: true};
        default:
            return state;
    }
}