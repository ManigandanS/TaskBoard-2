//(function (define, require) {
//  define(
//  ['jquery', 'ko'],
window.okCancelModal = new (function ($, ko) {
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
})(window.jQuery, window.ko)