window.taskModal = new (function ($, ko) {
  var self = this;
  var viewModel = {};
  self.viewModel = viewModel;
  viewModel.detailsVisivle = ko.observable(false);
  viewModel.dialogTitle = ko.observable('');
  viewModel.pending = ko.observable(false);
  viewModel.title = ko.observable('').extend({ required: true });
  viewModel.desc = ko.observable('');
  viewModel.startDate = ko.observable('');
  viewModel.dueDate = ko.observable('');
  viewModel.errors = ko.validation.group({
    title: self.title
  });
  viewModel.enabled = ko.computed(function () {
    return 0 === viewModel.errors().length && !viewModel.pending();
  });
  viewModel.confirm = function () {
    viewModel.pending(true);

    self.task.Title = viewModel.title();
    self.task.Description = viewModel.desc();
    self.task.DueDate = viewModel.dueDate();
    self.task.StartDate = viewModel.startDate();

    self.callback(self.task, function () {
      self.viewModel.pending(false);
      delete self.task;
      delete self.callback;
      $('#taskModal').modal('hide');
    });
  };
  self.show = function (title, task, callback) {
    viewModel.dialogTitle(title);
    self.task = task;
    self.callback = callback;
    viewModel.title(task.Title);
    viewModel.desc(task.Description);
    viewModel.dueDate(task.DueDate);
    viewModel.startDate(task.StartDate);
    $('#taskModal').modal('show');
  }
})(window.jQuery, window.ko);