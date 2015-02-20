(function (define, require) {
    define(['jquery', 'ko', 'svc/user', 'svc/rules'], function ($, ko, userService) {
        return function (app) {
            var self = this;
            self.app = app;
            self.username = ko.observable('').extend({                
                throttle: 750,
                required: true,
                pattern: {
                    message: 'Only letters and numbers.',
                    params: /^[A-Za-z0-9]{3,20}$/
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
                    params: /^[A-Za-z ]{3,48}$/,
                    message: 'Only letters and whitespace.',
                }
            })
            self.confirm = ko.observable('').extend({
                validation: {
                    params: self.password,
                    message: 'Password does not match confirmation.',
                    validator: function (val, other) {
                        return val === other;
                    },
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
                }, function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        app.user.isAuthenticated(userService.isAuthenticated());
                        app.list.loadProject(function () {
                            $('.bs-modal-user').hide();
                        });
                    }
                });
            };
        }
    });
})(window.define, window.require);