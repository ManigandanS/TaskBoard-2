(function (define, require) {
    define(['ko', 'services/user'], function (ko, userService) {
        return function () {
            var userTimeoutId = 0;
            var emailTimeoutId = 0;
            var self = this;
            self.username = ko.observable('');
            self.email = ko.observable('');
            self.password = ko.observable('');
            self.confirm = ko.observable('');
            self.usernameUsed = ko.observable(false);
            self.emailUsed = ko.observable(false);
            self.usernameChange = function () {                                     // debounce: 500
                clearTimeout(userTimeoutId);
                userTimeoutId = setTimeout(function () {
                    userService.checkUsername(self.username(), function (used) {
                        self.usernameUsed(used);
                    });
                }, 500);
            };
            self.emailChange = function () {
                clearTimeout(emailTimeoutId);                                       // debounce: 500
                emailTimeoutId = setTimeout(function () {
                    userService.checkEmail(self.email(), function (used) {
                        self.emailUsed(used);
                    });
                }, 500);
            };
        }
    });
})(window.define, window.require);