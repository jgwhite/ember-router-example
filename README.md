Ember Router Example
====================

A very simple example of binding router states to computed properties.

In this case, the router observes the `authenticated` property on our
`authController` singleton. When `authenticated` changes, the router
automatically transitions to the appropriate state.

Authenticated is itself a computed property depending on the value
of `email` and `password`. These properties are bound to inputs in
`AuthView`. As a result, the moment the correct values are entered
by the user, we’re magically transitioned to the authenticated
state - no submit button required!

An important point to note is that the `authenticatedDidChange`
observer method is defined on `App.Router` itself.
For me, this was a penny-drop moment regarding Ember’s router.

That is to say, a `Route` is inherently dumb and should only send
messages to controllers or the `Router`. `Router` is only the
object that has an overall view of the app.

Comments? Discussion? Yes please: [@jgwhite](http://twitter.com/jgwhite)
