//(function (define) {
//  define(
//  ['ko'],
window.signIn = new (function (ko) {
  var self = this;
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
  });
  self.loginError = function () {
    self.pending(false);
    self.authError(true);
    self.password('');
    self.password.clearError();
  };
  self.clear = function () {
    self.pending(false);
    self.authError(false);
    self.login('');
    self.password('');
    self.login.clearError();
    self.password.clearError();
  };
})(window.ko);

//  });
//})(window.define);