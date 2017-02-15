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
    transitioning: false,
    location: null,
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
    contactForms: {},
    newContact: Object.assign({}, CONTACT_TEMPLATE),
};

// setting state also triggers rerendering (normally this is done by React's
// own setState implementation)
function setState(changes) {
    Object.assign(state, changes);
    if (!state.transitioning) {
        // Simply using `state` for the props seems to be appropriate here
        var application = React.createElement(Application, state);
        ReactDOM.render(application, document.getElementById('react-app'));
    }
}

window.addEventListener('hashchange', navigated, false);
navigated();
