(function (define, require) {
  define(['jquery'], function ($) {
    var service = function () {
      var self = this;
      self.signIn = function (user, callback) {
        $.ajax({
          url: 'api/auth/signin',
          type: 'POST',
          dataType: 'json',
          data: user,
          success: function (user) {
            self.user = user;
            if ('function' == typeof callback) { callback(null, self.user); }
          },
          error: function (err) {
            self.user = false;
            if ('function' == typeof callback) { callback(err, self.user); }
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
            self.user = res;
            if ('function' == typeof callback) { callback(null, res); }
          },
          error: function (err) {
            self.user = false;
            if ('function' == typeof callback) { callback(err, self.user); }
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
    };
    return new service();
  });
})(window.define, window.require);