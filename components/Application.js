var Application = React.createClass({
    propTypes: {
        location: React.PropTypes.array.isRequired
    },
    render: function() {
        switch (this.props.location[0]) {
            case 'contacts':
                if (this.props.location[1]) {
                    return React.createElement(ContactView, Object.assign({}, this.props, {
                        id: this.props.location[1],
                        handleContactChange: ()=>{},
                        handleSaveContact: ()=>{}
                    }));
                } else {
                    return React.createElement(ContactsView, Object.assign({}, this.props, {
                        handleContactChange: updateNewContact,
                        handleSaveContact: submitNewContact
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
