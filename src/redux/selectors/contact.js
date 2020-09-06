export const getContacts = (contactsList) => {
    let contacts = [];
    for (var key in contactsList) {
        contacts.push(contactsList[key]);
    }
    return contacts;
};

let targetContact = {};
export const contactFirstNameById = (contactsList, id) => {
    targetContact = contactsList.filter(contact => (contact.id == id));
    return targetContact[0].firstName;
};

export const contactLastNameById = (contactsList, id) => {
    targetContact = contactsList.filter(contact => (contact.id == id));
    return targetContact[0].lastName;
};