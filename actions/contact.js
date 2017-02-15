function _validateContact(contact) {
    // validation
    if (!contact.name) {
        contact.errors.name = ['Please enter your new contact\.s name'];
        console.log('error with name: ' + contact.errors.name);
    }
    if (!/.+@.+\..+/.test(contact.email)) {
        contact.errors.email = ['Please enter your new contact\'s email'];
        console.log('error with email: ' + contact.errors.email);
    }
}

function updateNewContact(contact) {
    // React automatically merges partial state into the current state
    setState({newContact: contact});
}

function submitContactForm() {
    saveNewContact();
    // this fires an event which calls our function `navigated`
    startNavigating('/contacts');
}

function saveNewContact() {
    var contact = Object.assign({}, state.newContact, { // filled only if the form component has submitted stuff
        key: state.contacts.length + 1, // incremented key analogue to array's idx
        errors: {}
    });

    _validateContact(contact);

    setState(
    // No validation errors?
    Object.keys(contact.errors).length === 0
        ? {
            newContact: Object.assign({}, CONTACT_TEMPLATE),
            contacts: state.contacts.slice(0).concat(contact)
        }
        : {
            newContact: contact
        } // newContact returned the same (from the form with errors)
    );
}
