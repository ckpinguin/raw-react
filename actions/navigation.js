function navigated() {
    setState({
        location: window.location.hash.replace(/^#\/?|\/$/g, '').split('/')
    });
};
