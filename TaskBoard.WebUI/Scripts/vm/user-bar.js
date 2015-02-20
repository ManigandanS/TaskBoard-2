(function (define, require) {
  define(
  ['ko', 'vm/modal/user', 'svc/user'],
  function (ko, userModal, userService) {
    return function (app) {
      var self = this;
      self.app = app;
      self.isAuthenticated = ko.observable(userService.isAuthenticated());
      self.signIn = function () {
        userModal.show(function (err, user, done) {
          if (err) {
            console.error(err);
          } else {
            self.isAuthenticated = ko.observable(userService.isAuthenticated());
            self.app.projectList.loadProjects(function () {
            });
          }
        });
      };
      self.signOut = function () {
        userService.signOut(function () {
          self.isAuthenticated(userService.isAuthenticated());
          self.app.projectList.clear();
        });
      };
    }
  });
})(window.define, window.require);