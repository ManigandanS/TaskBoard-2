window.userModal = new (function (ko, $, signIn, signUp, userService) {
  var self = this;
  self.viewModel = {};
  self.viewModel.signIn = signIn;
  self.viewModel.signUp = signUp;
  self.viewModel.signUpClick = function () {
    self.viewModel.signUp.pending(true);
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
    self.viewModel.signIn.pending(true);
    userService.signIn({
      Username: self.viewModel.signIn.login(),
      Password: self.viewModel.signIn.password()
    }, function (err, user) {
      if (err && err.responseJSON) {
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
})(window.ko, window.jQuery, window.signIn, window.signUp, window.userService);