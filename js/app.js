// The app's namespace.
var App = Em.Application.create();

// The app's top-level controller.
App.ApplicationController = Em.Controller.extend();

// The app's top-level view.
App.ApplicationView = Em.View.extend({ templateName: 'application' });

// Displays the home template.
App.HomeView = Em.View.extend({ templateName: 'home' });

// Presents the `authenticated` property.
App.AuthController = Em.Controller.extend({

  authenticated: function() {
    return this.get('email') === 'ember@example.org'
        && this.get('password') === 'foobar';
  }.property('email', 'password')

});

// Displays the sign-in form.
App.AuthView = Em.View.extend({
  tagName: 'form',
  templateName: 'auth',
  classNames: 'form-inline well well-large'
});

// An extended TextField, which recognises autofocus as a property.
App.TextField = Em.TextField.extend({
  attributeBindings: ['type', 'value', 'size', 'autofocus']
});

// Responsible for moving through the different states of the app.
App.Router = Em.Router.extend({

  // When the `authenticated` state of the authController singleton
  // changes, the router will transition to the corresponding state.
  authenticatedDidChange: function() {
    if (this.get('authController.authenticated')) {
      this.transitionTo('authenticated');
    } else {
      this.transitionTo('unauthenticated');
    }
  }.observes('authController.authenticated'),

  // The initial state for the router, contains every other.
  root: Em.Route.extend({

    // Routes available to the app in its authenticated state.
    authenticated: Em.Route.extend({
      initialState: 'home',

      // Displays the home view.
      home: Em.Route.extend({
        route: '/home',
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('home');
        }
      })

    }),

    // Routes available to the app in its unauthenticated state.
    unauthenticated: Em.Route.extend({
      initialState: 'auth',

      // Displays the sign-in form.
      auth: Em.Route.extend({
        route: '/auth',
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('auth');
        }
      })

    })

  })
});

App.initialize();
