(function (define) {
  define(
  ['ko', 'svc/user'],
  function (ko, userService) {
    return function (app) {
      var self = this;
      self.app = app;
      self.pending = ko.observable(false);
      self.authError = ko.observable(false);
      self.login = ko.observable('').extend({ required: true });
      self.password = ko.observable('').extend({ required: true });
      self.errors = ko.validation.group({
        login: self.login,
        password: self.password
      })
      self.enabled = ko.computed(function () {
        return 0 === self.errors().length;
      })
      self.signIn = function () {
        self.pending(true);
        userService.signIn({
          Username: self.login(),
          Password: self.password(),
        },
        function (err, res) {                    
          if (err) {
            self.pending(false);
            self.authError(true);
            self.password('')
            self.password.clearError();
          } else {
            app.user.isAuthenticated(userService.isAuthenticated());
            app.projectList.loadProjects(function () {
              self.pending(false);
              $('.bs-modal-user').hide();                           
            });                        
          }
        })
      };
    }
  });
})(window.define);