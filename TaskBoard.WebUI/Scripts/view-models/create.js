(function (define, require) {
    define(['ko', 'services/project'],
        function(ko) {
            return function (app) {
                var self = this;
                self.app = app;
            }
        });
})(window.define, window.require);