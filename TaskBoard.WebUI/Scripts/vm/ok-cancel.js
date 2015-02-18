(function (define, require) {
    define(
    ['jquery', 'ko'],
    function($, ko) {
        return function (app) {
            var self = this;
            self.app = app;
            self.message = ko.observable('');
            self.pending = ko.observable(false);
            self.show = function (message, callback) {
                self.message(message);
                self.callback = callback;
                $('.bs-modal-ok-cancel').show();
            }
            self.ok = function () {
                self.pending(true);
                self.callback(function () {
                    self.pending(false);
                    $('.bs-modal-ok-cancel').hide();
                    delete self.callback;
                });
            }
        }
    });
})(window.define, window.require);