(function (define, require) {
  define(
  ['ko', 'jquery', 'vm/sign-in', 'vm/sign-up', 'svc/user', 'bootstrap'],
  function (ko, $, SignIn, SignUp, userService, bs) {
    var modal = function () {
      var self = this;
      self.viewModel = {};
      self.viewModel.signIn = new SignIn(self);
      self.viewModel.signUp = new SignUp(self);
      self.show = function () {
        $('#userModal').modal('show');
      };
      self.hide = function () {
        $('#userModal').modal('hide');
      };
    };
    return new modal();
  });
})(window.define, window.require);