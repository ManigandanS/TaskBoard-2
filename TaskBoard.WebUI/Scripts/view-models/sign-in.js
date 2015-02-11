(function (define, require) {
    define(['ko', 'services/user'], function (ko, userService) {
        return function () {
            var self = this;
            self.enabled = ko.observable(false);
            self.hasError = ko.observable(false);
            self.user = ko.validatedObservable({
                login: ko.observable(''),
                password: ko.observable(''),
            });
            self.click = function () {
                userService.signIn({
                    login: self.user().login(),
                    password: self.user().password(),
                })
                .error(function () {
                    self.hasError(true);
                });
            };
        }
    });
})(window.define, window.require);