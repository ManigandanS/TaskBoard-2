(function (define) {
    define(['ko', 'services/user'], function (ko, userService) {
        return function () {
            var self = this;
            self.hasError = ko.observable(false);
            self.login = ko.observable('');
            self.password = ko.observable('');
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