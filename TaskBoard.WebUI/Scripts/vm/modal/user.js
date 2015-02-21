(function (define, require) {
  define(
  ['ko', 'jquery', 'vm/sign-in', 'vm/sign-up', 'svc/user', 'bootstrap'],
  function (ko, $, SignIn, SignUp, userService, bs) {
    var modal = function () {
      var self = this;
      self.viewModel = {};
      self.viewModel.signIn = new SignIn();
      self.viewModel.signUp = new SignUp();
      self.viewModel.signUpClick = function () {
        userService.signUp({
          Username: self.viewModel.signUp.username(),
          Email: self.viewModel.signUp.email(),
          FullName: self.viewModel.signUp.fullname(),
          Password: self.viewModel.signUp.password(),
        }, function (err, user) {
          if (err) {
            console.error(err);
          } else {
            self.callback(err, user, function () {
              self.viewModel.signUp.clear();
              $('#userModal').modal('hide');
              delete self.callback;
            });
          }
        });
      };
      self.viewModel.signInClick = function () {
        userService.signIn({
          Username: self.viewModel.signIn.login(),
          Password: self.viewModel.signIn.password()
        }, function (err, user) {
          if (err && err.message) {
            self.viewModel.signIn.loginError();
          } else if (err) {
            console.error(err);
          } else {
            self.callback(err, user, function () {
              self.viewModel.signIn.clear();
              $('#userModal').modal('hide');
              delete self.callback;
            });
          }
        });
      };
      self.show = function (callback) {
        self.callback = callback;
        $('#userModal').modal('show');
      };
    };
    return new modal();
  });
})(window.define, window.require);