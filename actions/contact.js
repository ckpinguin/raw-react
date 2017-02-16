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

/**
* These are global action callback functions (global here means top-level)
* They usually are handed down the component-chain until they are called
* by some DOM-element's event on which they are registered. They are global
* because state only should be updated here.
*/

/**
*  This one is easy: Just update the current `state.newContact`. Basically this
*  is just the state-component connection and should be small and quick, be
*  cause it is called on every input event in the corresponding fields
*/
function updateNewContact(contact) {
    // React automatically merges partial state into the current state
    // as we are getting updates from different DOM-form-fields here
    setState({newContact: contact});
}

/**
*  This one is trickier. We have to build the new contact from the form-supplied
*  `newContact` (controlled by state.newContact), adding `key` and `errors` to it.
*  Then the contact object is validated before setState is called and finally
*  navigating back to contacts again.
*/
function submitNewContact() {
    var contact = Object.assign({}, state.newContact, { // filled only if the form component has submitted stuff
        key: state.contacts.length + 1, // incremented key analogue to array's idx
        errors: {}
    });

    _validateContact(contact);

    setState(
    // No validation errors?
    Object.keys(contact.errors).length === 0
        ? {
            // "refill" the newContact.
            newContact: Object.assign({}, CONTACT_TEMPLATE),
            // and add the created `contact` to `contacts`
            contacts: state.contacts.slice(0).concat(contact)
        }
        : {
            // newContact is returned the same (it has errors)
            newContact: contact
        }
    );
    // this indirectly fires an event which calls our function `navigated`
    startNavigating('/contacts');
}

/**
*  Here we update a single contact-edit from the single-form. Basically same
*  procedure as in `updateNewContact`.
*/
function updateContactForm(contact) {
    var update = {}; // object to be saved in state
    // We are getting updates from different DOM-form-fields here
    update[contact.key] = contact;

    // This seems to be a bug in James' code. State should not be amended
    // here, we only should use `setState` for that purpose...
    // var contactForms = Object.assign(state.contactForms, update);

    var contactForms = Object.assign({}, update);
    // React automatically merges partial state into the current state
    setState({ contactForms: contactForms });
}

/**
*  Here we have an existing single contact, that has to be saved in our `state`.
*
*/
function submitContactForm() {
    var key = state.location[1];
    var contactForm = state.contactForms[key];

    // if empty, just navigate home
    if (!contactForm) {
        startNavigating('/contacts');
    } else {
        // Now we build the object to be used in `state`
        var contact = Object.assign({}, contactForm, {errors: {}});

        _validateContact(contact);

        // copy the current `contactForms` from the state
        var contactForms = Object.assign({}, state.contactForms);
        // and now build the update to be used with `setState` later
        var update = { contactForms: contactForms };

        // check for errors
        if (Object.keys(contact.errors).length === 0) {
            // if ok, we can safely delete the entry from the `contactForms` array
            delete contactForms[key];
            // Now we put the updated contact (with key) into `update.contacts`
            // while taking the original contacts for the rest
            update.contacts = state.contacts.slice(0).map(function (c) {
                return c.key == key ? contact : c;
            });

            startNavigating('/contacts');
        } else {
            contactForms[key] = contact;
        }

        setState(update);
    }
}
