(function (define) {
    define(['ko', 'services/user'], function (ko, userService) {
        return function (app) {
            var self = this;
            self.app = app;
            self.hasError = ko.observable(false);
            self.login = ko.observable('').extend({ required: true });
            self.password = ko.observable('').extend({ required: true });
            self.errors = ko.validation.group({
                login: self.login,
                password: self.password
            })
            self.enabled = ko.computed(function () {
                return 0 === self.errors().length;
            })
            self.signIn = function () {
                userService.signIn({
                    Username: self.login(),
                    Password: self.password(),
                },
                function (err) {
                    self.hasError(true);
                    self.password('');
                })
            };
        }
    });
})(window.define);