var React = require('./react.js');
var ReactDOM = require('./react-dom.js');

var contacts = [
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
];

var ContactView = React.createClass({
    propTypes: {
        contacts: React.PropTypes.array.isRequired,
        newContact: React.PropTypes.object.isRequired
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
        }, contactItemElements), React.createElement(ContactForm, {contact: this.props.newContact})));
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
        contact: React.PropTypes.object.isRequired
    },
    render: function() {
        var contact = this.props.contact;
        return (React.createElement('form', {
            className: 'ContactForm'
        }, React.createElement('input', {
            className: 'ContactForm-input',
            placeholder: 'Name (required)',
            type: 'text',
            value: contact.name
        }), React.createElement('input', {
            className: 'ContactForm-input',
            placeholder: 'Email',
            type: 'email',
            value: contact.email
        }), React.createElement('textarea', {
            className: 'ContactForm-textarea',
            placeholder: 'Description',
            value: contact.description
        }), React.createElement('button', {
            className: 'ContactForm-button',
            type: 'submit'
        }, 'Add Contact')));
    }
});

var newContact = {
    name: '',
    email: '',
    description: ''
};
var rootElement = React.createElement(ContactView, {contacts, newContact});

ReactDOM.render(rootElement, document.getElementById('react-app'));
