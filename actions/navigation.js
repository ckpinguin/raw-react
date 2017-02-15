function navigated() {
    var normalizedHash = window.location.hash.replace(/^#\/?|\/$/g, '');

    if (normalizedHash == '') {
        startNavigating('/contacts');
    } else {
        setState({
            location: normalizedHash.split('/')
        });
    }
}

function startNavigating(newLocation) {
    setState({
        transitioning: true
    });
    window.location.replace(
        // this will fire an event which calls `navigated`, so setState
        // should only be called, when all intermediate routes are done
        window.location.pathname + window.location.search + '#' + newLocation
    );
    setState({
        transitioning: false
    });
}
