(function (define, require) {
    define(['ko', 'services/user', 'services/rules'], function (ko, userService) {
        return function () {
            var self = this;
            self.username = ko.observable('').extend({ uniqueUsername: { throttle: 500 } });
            self.email = ko.observable('').extend({ uniqueEmail: { throttle: 500 } });
            self.password = ko.observable('');
            self.confirm = ko.observable('').extend({ equals: { param: this.password } });
        }
    });
})(window.define, window.require);