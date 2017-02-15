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

// setting stage triggers rerendering
function setState(changes) {
    Object.assign(state, changes);
    var application = React.createElement(Application, { location: state.location });
    ReactDOM.render(application, document.getElementById('react-app'));
}

window.addEventListener('hashchange', navigated, false);
navigated();
