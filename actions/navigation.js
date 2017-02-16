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

/*
*  Before actually navigating (via hashchange event callback `navigated`), set
*  transittioning state, so a render function can suspend rendering while
*  navigation is hopping (in `setState` that is)
*/
function startNavigating(newLocation) {
    setState({
        transitioning: true
    });
    // this will fire a `hashchange` event which calls `navigated`, so setState
    // should only be called, when all intermediate routes are done
    window.location.replace(
        window.location.pathname + window.location.search + '#' + newLocation
    );
    setState({
        transitioning: false
    });
}
