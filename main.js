var ContactView = React.createClass({
    propTypes: {
        contacts: React.PropTypes.array.isRequired,
        newContact: React.PropTypes.object.isRequired,
        handleContactChange: React.PropTypes.func.isRequired,
        handleSaveContact: React.PropTypes.func.isRequired
    },
    render: function() {
        var contactItemElements = this.props.contacts.filter(function(contact) {
            return contact.email;
        }).map(function(contact) { // Array is a functor, map returns same-size array
            return React.createElement(ContactItem, contact);
        });
        return (React.createElement('div', {
            className: 'ContactView'
        }, React.createElement('h1', {
            className: 'ContactView-title'
        }, 'Contacts'), React.createElement('ul', {
            className: 'ContactView-list'
        }, contactItemElements), React.createElement(ContactForm, {
            value: this.props.newContact,
            onChange: this.props.handleContactChange,
            onSubmit: this.props.handleSaveContact
        })));
    }
});

var ContactItem = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        email: React.PropTypes.string,
        description: React.PropTypes.string
    },
    render: function() {
        return (React.createElement('li', {
            className: 'ContactItem'
        }, React.createElement('h2', {
            className: 'ContactItem-name'
        }, this.props.name), React.createElement('a', {
            className: 'ContactItem-email',
            href: 'mailto:' + this.props.email
        }, this.props.email), React.createElement('p', {
            className: 'ContactItem-description'
        }, this.props.description)));
    }
});

var ContactForm = React.createClass({
    propTypes: {
        value: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    },
    onNameChange: function(event) {
        this.props.onChange(Object.assign({}, this.props.value, {name: event.target.value}))
    },
    onEmailChange: function(event) {
        this.props.onChange(Object.assign({}, this.props.value, {email: event.target.value}))
    },
    onDescriptionChange: function(event) {
        this.props.onChange(Object.assign({}, this.props.value, {description: event.target.value}))
    },
    onSubmit: function(event) {
        event.preventDefault();
        this.refs.name.focus();
        this.props.onSubmit(); // no arg needed
    },
    onNameFocus: function() {
        console.log('haha, denied!');
        this.refs.name.blur(); // haha!
    },
    componentDidUpdate: function(prevProps) {
        var value = this.props.value;
        var prevValue = prevProps.value;
        console.log('componentDidUpdate');
        // not using this.mounted anymore (antipattern)
        if (value.errors && value.errors != prevValue.errors) {
            if (value.errors.name) {
                this.refs.name.focus(); // "real" DOM action
            } else if (value.errors.email) {
                this.refs.email.focus();
            }
        }
    },
    render: function() {
        var errors = this.props.value.errors || {};
        return (React.createElement('form', {
            className: 'ContactForm',
            onSubmit: this.onSubmit,
            noValidate: true // For development we want to validate on our own in the handler
        }, React.createElement('input', {
            className: errors.name && 'ContactForm-error',
            placeholder: 'Name (required)',
            ref: 'name', // for "real" DOM access via refs object
            //onFocus: this.onNameFocus,
            type: 'text',
            value: this.props.value.name,
            onChange: this.onNameChange,
            autoFocus: true
        }), React.createElement('input', {
            className: errors.email && 'ContactForm-error',
            placeholder: 'Email',
            ref: 'email',
            type: 'email',
            value: this.props.value.email,
            onChange: this.onEmailChange
        }), React.createElement('textarea', {
            className: errors.description && 'ContactForm-error',
            ref: 'description',
            placeholder: 'Description',
            value: this.props.value.description,
            onChange: this.onDescriptionChange
        }), React.createElement('button', {
            type: 'submit'
        }, 'Add Contact')));
    }
});

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