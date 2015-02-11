(function (define, require) {
    define(['ko'], function (ko) {
        return function () {
            var self = this;
            self.message = ko.observable('Hello world');
        }
    });
})(window.define, window.require);