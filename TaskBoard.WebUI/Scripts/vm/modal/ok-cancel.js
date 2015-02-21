(function (define, require) {
  define(
  ['jquery', 'ko'],
  function ($, ko) {
    var modal = function () {
      var self = this;

      self.viewModel = {};
      self.viewModel.message = ko.observable('');
      self.viewModel.pending = ko.observable(false);
      self.viewModel.ok = function () {
        self.viewModel.pending(true);
        self.callback(function () {
          self.viewModel.pending(false);
          $('#okCancelModal').modal('hide');
          delete self.callback;
        });
      };

      self.show = function (message, callback) {
        self.viewModel.message(message);
        self.callback = callback;
        $('#okCancelModal').modal('show');
      };
    }
    return new modal();
  });
})(window.define, window.require);