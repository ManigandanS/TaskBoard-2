(function (define, require) {
    define(['ko', 'view-models/sign-in', 'view-models/sign-up', 'services/user'], function (ko, SignIn, SignUp, userService) {
        return function (app) {
            var self = this;
            self.app = app;
            self.signIn = new SignIn(app);
            self.signUp = new SignUp(app);
            self.isAuthenticated = ko.observable(userService.isAuthenticated());
            self.signOut = function () {

            };
        }
    });
})(window.define, window.require);