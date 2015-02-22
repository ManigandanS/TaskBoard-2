//(function (define, require) {
//  define(
//  ['jquery'],
window.userService = new (function ($) {
  var self = this;
  self.signIn = function (user, callback) {
    $.ajax({
      url: 'api/auth/signin',
      type: 'POST',
      dataType: 'json',
      data: user,
      success: function (res) {
        self.user = res.user;
        self.token = res.token;
        callback(null, self.user);
      },
      error: function (err) {
        self.user = false;
        callback(err);
      }
    });
  };
  self.signUp = function (user, callback) {
    $.ajax({
      url: 'api/auth/signup',
      type: 'POST',
      dataType: 'json',
      data: user,
      success: function (res) {
        self.user = res.user;
        self.token = res.token;
        callback(null, self.user);
      },
      error: function (err) {
        self.user = false;
        callback(err);
      }
    });
  };
  self.signOut = function (callback) {
    $.ajax({
      url: 'api/auth/signout',
      type: 'POST',
      success: function () {
        self.user = false;
        callback();
      },
      error: function (err) {
        callback(err);
      }
    });
  };
  self.checkLogin = function (login, callback) {
    $.ajax({
      url: 'api/users/exists',
      type: 'GET',
      data: { login: login },
      success: function () {
        callback(true);
      },
      error: function () {
        callback(false);
      }
    });
  };
  self.getUser = function (login, callback) {
    $.ajax({
      url: 'api/user/' + login,
      type: 'GET',
      dataType: 'json',
      success: function (res) {
        delete self.user;
        callback(null, res);
      },
      error: function (err) {
        callback(err);
      }
    });
  };
  self.isAuthenticated = function () {
    return self.user && (self.user._id || self.user.id);
  };
})(window.jQuery);
//  });
//})(window.define, window.require);