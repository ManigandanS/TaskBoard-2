(function (define, require) {
    define(['ko', 'view-models/sign-in', 'view-models/sign-up'], function (ko, SignIn, SignUp) {
        return function () {
            var self = this;
            self.signIn = new SignIn();
            self.signUp = new SignUp();
        }
    });
})(window.define, window.require);