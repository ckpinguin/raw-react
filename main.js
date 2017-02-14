/*
* Constants
*/
var CONTACT_TEMPLATE = {
    name: '',
    email: '',
    description: '',
    errors: null
};

/*
* Model
*/

// The app's current state
var state = {};

// setting stage triggers rerendering
function setState(changes) {
    var component;
    Object.assign(state, changes);
    switch (state.location) {
        case '#/contacts':
            component = React.createElement(ContactView, Object.assign({}, state, {
                handleContactChange: updateNewContact,
                handleSaveContact: submitNewContact
            }));
            break;
        default:
            component = React.createElement('div', {}, React.createElement('h1', {}, 'Not Found'), React.createElement('a', {
                href: '#/contacts'
            }, 'Contacts'));
    }
    ReactDOM.render(component, document.getElementById('react-app'));
}

// Set initial data first time (implicit rendering)
setState({
    contacts: [
        {
            key: 1,
            name: 'Chrigi Kälin',
            email: 'ckpinguin@gmail.com',
            description: 'Front-end noob'
        }, {
            key: 2,
            name: 'Johnny Cash',
            email: 'johnny@cash.com'
        }, {
            key: 3,
            name: 'Joe Jim'
        }
    ],
    newContact: Object.assign({}, CONTACT_TEMPLATE)
});

window.addEventListener('hashchange', navigated, false);
navigated();
