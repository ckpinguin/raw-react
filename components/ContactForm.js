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
    onFormSubmit: function(event) {
        event.preventDefault();
        this.refs.name.focus();
        this.props.onSubmit(); // no arg needed
    },
    onNameFocus: function() {
        console.log('haha, denied!');
        this.refs.name.blur(); // haha!
    },
    // Focusing components with errors
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
            onSubmit: this.onFormSubmit,
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
            noValidate: true,
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
        }, 'Save')));
    }
});
