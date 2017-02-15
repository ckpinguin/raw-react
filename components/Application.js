var Application = React.createClass({
    propTypes: {
        location: React.PropTypes.array.isRequired,
        contacts: React.PropTypes.array.isRequired,
        newContact: React.PropTypes.object.isRequired
    },
    render: function() {
        switch (this.props.location[0]) {
            case 'contacts':
                if (this.props.location[1]) {
                    // props are just pass-through
                    return React.createElement(ContactView, Object.assign({}, this.props, {
                        id: this.props.location[1],
                        handleContactChange: updateContactForm, // use global handler
                        handleSaveContact: submitContactForm // use global handler
                    }));
                } else {
                    return React.createElement(ContactsView, Object.assign({}, this.props, {
                        handleContactChange: updateNewContact, // use global handler
                        handleSaveContact: submitNewContact // use global handler
                    }));
                }
                break;
            default:
                return React.createElement('div', {},
                    React.createElement('h1', {}, 'Not Found'),
                    React.createElement('a', { href: '#/contacts' }, 'Contacts')
                );
        }
    }
});
