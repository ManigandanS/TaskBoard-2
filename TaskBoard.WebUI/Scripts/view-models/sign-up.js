(function (define, require) {
    define(['ko', 'services/user', 'services/rules'], function (ko, userService) {
        return function () {
            var self = this;
            self.user = ko.validatedObservable({
                username: ko.observable('').extend({ uniqueUsername: { throttle: 500 } }),
                email: ko.observable('').extend({ uniqueEmail: { throttle: 500 } }),
                password: ko.observable(''),
                confirm: ko.observable('').extend({ equals: { param: this.password } })
            });
        }
    });
})(window.define, window.require);