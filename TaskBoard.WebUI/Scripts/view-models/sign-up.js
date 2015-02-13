(function (define, require) {
    define(['ko', 'services/user', 'services/rules'], function (ko, userService) {
        return function (app) {
            var self = this;
            self.app = app;
            self.username = ko.observable('').extend({
                required: true,
                pattern: {
                    message: 'Only letters and numbers',
                    params: '^[A-Za-z0-9].$'
                },
                uniqueUsername: {
                    throttle: 500,
                    message: 'Username already used',
                }
            });
            self.email = ko.observable('').extend({
                required: true,
                uniqueEmail: {
                    throttle: 500,
                    message: 'E-mail already used',
                }
            });
            self.password = ko.observable('');
            self.fullname = ko.observable('');
            self.confirm = ko.observable('').extend({ equals: { params: this.password } });
            self.errors = ko.validation.group({
                login: self.username,
                email: self.email,
                password: self.password,
                confirm: self.confirm
            });
            self.disabled = ko.computed(function () {
                var errs = self.errors();
                return 0 !== errs.length;
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