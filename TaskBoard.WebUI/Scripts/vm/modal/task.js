window.taskModal = new (function ($, ko) {
  var self = this;
  self.viewModel = {};
  self.viewModel.dialogTitle = ko.observable('');
  self.viewModel.pending = ko.observable(false);
  self.viewModel.title = ko.observable('').extend({ required: true });
  self.viewModel.desc = ko.observable('');
  self.viewModel.startDate = ko.observable('');
  self.viewModel.dueDate = ko.observable('');
  self.viewModel.errors = ko.validation.group({
    title: self.title
  });
  self.viewModel.enabled = ko.computed(function () {
    return 0 === self.viewModel.errors().length && !self.viewModel.pending();
  });
  self.viewModel.confirm = function () {
    self.viewModel.pending(true);

    self.task.Title = self.viewModel.title();
    self.task.Description = self.viewModel.desc();
    self.task.DueDate = self.viewModel.dueDate();
    self.task.StartDate = self.viewModel.startDate();

    self.callback(self.task, function () {
      self.viewModel.pending(false);
      delete self.task;
      delete self.callback;
      $('#taskModal').modal('hide');
    });
  };
  self.show = function (title, task, callback) {
    self.viewModel.dialogTitle(title);
    self.task = task;
    self.callback = callback;
    self.viewModel.title(task.Title);
    self.viewModel.desc(task.Description);
    self.viewModel.dueDate(task.DueDate);
    self.viewModel.startDate(task.StartDate);
    $('#taskModal').modal('show');
  }
})(window.jQuery, window.ko);