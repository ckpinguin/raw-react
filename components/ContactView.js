var ContactView = React.createClass({
    propTypes: {
        contacts: React.PropTypes.array.isRequired,
        //contactForms: React.PropTypes.object.isRequired,
        id: React.PropTypes.string.isRequired,
        handleContactChange: React.PropTypes.func.isRequired,
        handleSaveContact: React.PropTypes.func.isRequired
    },
    render: function() {
        var key = this.props.id; // we need a unique key to render many of these
        //var contactForm = this.props.contactForms[key] ||
        var contactForm = this.props.contacts.filter(function(contact) {
            return contact.key == key;
        })[0];

        return (
            !contactForm
                ? React.createElement('div', {},
                    React.createElement('h1', {}, 'Not Found'),
                    React.createElement('a', { href: '#/contacts' }, 'Contacts'))
                : React.createElement('div', { className: 'ContactView' },
                    React.createElement('h1', { className: 'ContactView-title' },
                        'Edit Contact'),
                    React.createElement(ContactForm, {
                        value: contactForm,
                        onChange: this.props.handleContactChange,
                        onSubmit: this.props.handleSaveContact
                    })
                )
        );
    }
});
