var ContactsView = React.createClass({
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
