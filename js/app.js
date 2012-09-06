// The app's namespace.
var App = Ember.Application.create();

// App controller and view - every app needs these.
App.ApplicationController = Ember.Controller.extend();
App.ApplicationView = Ember.View.extend({ templateName: 'application' });

// Home controller and view.
App.HomeController = Ember.Controller.extend();
App.HomeView = Ember.View.extend({ templateName: 'home' });

// Auth controller and view.
// AuthController presents the `authenticated` property.
App.AuthController = Ember.Controller.extend({

  authenticated: function() {
    return this.get('email') === 'ember@example.org'
        && this.get('password') === 'foobar';
  }.property('email', 'password')

});
App.AuthView = Ember.View.extend({
  tagName: 'form',
  templateName: 'auth',
  classNames: 'form-inline well well-large'
});

// An extended TextField, which recognises autofocus as a property.
App.TextField = Ember.TextField.extend({
  attributeBindings: ['type', 'value', 'size', 'autofocus']
});

// Responsible for moving through the different states of the app.
App.Router = Ember.Router.extend({

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
  root: Ember.Route.extend({

    // Routes available to the app in its authenticated state.
    authenticated: Ember.Route.extend({
      initialState: 'home',

      // Displays the home view.
      home: Ember.Route.extend({
        route: '/home',
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('home');
        }
      })

    }),

    // Routes available to the app in its unauthenticated state.
    unauthenticated: Ember.Route.extend({
      initialState: 'auth',

      // Displays the sign-in form.
      auth: Ember.Route.extend({
        route: '/auth',
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('auth');
        }
      })

    })

  })
});

App.initialize();
