(function (define, require) {
  define(
  ['ko', 'vm/sign-in', 'vm/sign-up', 'svc/user'],
  function (ko, SignIn, SignUp, userService) {
    var modal = function () {
      var self = this;
      self.app = app;
      self.signIn = new SignIn(self);
      self.signUp = new SignUp(self);
      self.isAuthenticated = ko.observable(userService.isAuthenticated());
      self.signOut = function () {
        userService.signOut(function () {
          self.isAuthenticated(userService.isAuthenticated());
        });
      };
    };
    return new modal();
  });
})(window.define, window.require);