let nextContactId = 0;

export const addContact = (state) => ({
    type: 'ADD_CONTACT',
    payload: {
        id: ++nextContactId,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        comments: state.comments
    }
});