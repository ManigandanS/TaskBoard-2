(function (define, require) {
    define(['ko'], function (ko) {
        return function (app) {
            var self = this;
            self.app = app;
            self.title = ko.observable('');
            self.desc = ko.observable('');
            self.comments = ko.observableArray([]);
        }
    });
})(window.define, window.require);