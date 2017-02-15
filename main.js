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

// Set the app's initial state
var state = {
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
    newContact: Object.assign({}, CONTACT_TEMPLATE),
    location: window.location.hash
};

// setting state also triggers rerendering (normally this is done by React's
// own setState implementation)
function setState(changes) {
    Object.assign(state, changes);
    var application = React.createElement(Application, {
        contacts: state.contacts,
        location: state.location,
        newContact: state.newContact
    });
    if (!state.transitioning)
        ReactDOM.render(application, document.getElementById('react-app'));
}

window.addEventListener('hashchange', navigated, false);
navigated();
