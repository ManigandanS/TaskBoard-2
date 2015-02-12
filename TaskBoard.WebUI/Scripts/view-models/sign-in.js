(function (define) {
    define(['ko', 'services/user'], function (ko, userService) {
        return function () {
            var self = this;
            self.enabled = ko.observable(false);
            self.hasError = ko.observable(false);
            self.login = ko.observable(''),
            self.password = ko.observable(''),
            self.errors = ko.validation.group({ login: self.login, password: self.password });
            self.enabled = ko.computed(function () {
                return 0 === self.errors().length;
            });
            self.signIn = function () {
                userService.signIn({
                    Username: self.login(),
                    Password: self.password(),
                },
                function () {
                    self.hasError(true);
                })
            };
        }
    });
})(window.define);