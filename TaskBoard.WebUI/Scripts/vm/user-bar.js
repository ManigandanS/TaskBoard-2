window.UserBar = (function (ko, userModal, userService) {
   return function (app) {
    var self = this;
    self.app = app;
    self.isAuthenticated = ko.observable(userService.isAuthenticated());
    self.signIn = function () {
      userModal.show(function (err, user, done) {
        if (err) {
          console.error(err);
        } else {
          self.isAuthenticated(userService.isAuthenticated());
          self.app.projectList.loadProjects(function () {
            done();
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
})(window.ko, window.userModal, window.userService);