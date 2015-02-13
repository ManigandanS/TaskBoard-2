(function (define, require) {
    define(['ko', 'services/user', 'services/rules'], function (ko, userService) {
        return function (app) {
            var self = this;
            self.app = app;
            self.username = ko.observable('').extend({
                required: true,
                throttle: 750,
                pattern: {
                    message: 'Only letters and numbers.',
                    params: /^[A-Za-z0-9_-]$/
                },
                uniqueUsername: {                    
                    message: 'Username already used.',
                }
            });
            self.email = ko.observable('').extend({
                throttle: 750,
                required: true,
                email: true,
                uniqueEmail: {                    
                    message: 'E-mail already used.',
                }
            });
            self.password = ko.observable('').extend({ required: true, });
            self.fullname = ko.observable('').extend({
                required: true,
                pattern: {
                    params: /^[A-Za-z]$/,
                    message: 'Only letters and whitespace.',
                }
            })
            self.confirm = ko.observable('').extend({
                equals: {
                    params: this.password,
                    message: 'Password does not match confirmation.'
                }
            });
            self.errors = ko.validation.group({
                login: self.username,
                email: self.email,
                password: self.password,
                confirm: self.confirm
            });
            self.enabled = ko.computed(function () {
                return 0 === self.errors().length;
            });
            self.signUp = function () {
                if (0 !== self.errors().length) { return; }
                userService.signUp({
                    Username: self.username(),
                    Email: self.email(),
                    Password: self.password(),
                    FullName: self.fullname()
                });
            };
        }
    });
})(window.define, window.require);