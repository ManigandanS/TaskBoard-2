(function (define, require) {
    define(['jquery'], function ($) {
        var service = function () {
            var self = this;
            self.signIn = function (user, done) {
                $.ajax({
                    url: 'api/auth/signin',
                    type: 'POST',
                    dataType: 'json',
                    data: user,
                    success: function (user) {
                        self.user = user;
                        done(null, self.user);
                    },
                    error: function (err) {
                        self.user = false;
                        done(err, self.user);
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
                        callback(null, res);
                    },
                    error: function (err) {
                        self.user = false;
                        callback(err, self.user);
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
            self.getUser = function (login, done) {
                $.ajax({
                    url: 'api/user/' + login,
                    type: 'GET',
                    dataType: 'json',
                    success: function (user) {
                        done(true);
                    },
                    error: function (err) {
                        done(false);
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