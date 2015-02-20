(function (define, require) {
  define(
  ['jquery', 'ko'],
  function ($, ko) {
    var modal = function () {
      var self = this;
      self.viewModel = {};
      self.viewModel.pending = ko.observable(false);
      self.viewModel.title = ko.observable('').extend({ required: true });
      self.viewModel.desc = ko.observable('');
      self.viewModel.participants = ko.observableArray([]);
      self.viewModel.errors = ko.validation.group({
        title: self.title,
      })
      self.viewModel.enabled = ko.computed(function () {
        return 0 === self.errors().length && !self.pending();
      });
      self.viewModel.confirm = function () {
        self.pending(true);
        self.callback({
          Title: self.title(),
          Description: self.desc()
        }, function (err, res) {
          if (err) {
            console.error(err);
          } else {
            self.pending(false);
            $('.modal.in').hide();
            app.projectList.push(ko.mapping.fromJS(res));
          }
        })
      };
    }
    return new modal();
  });
})(window.define, window.require);