window.taskModal = new (function ($, ko) {
  var self = this;
  var viewModel = {};
  self.viewModel = viewModel;
  viewModel.detailsVisible = ko.observable(false);
  viewModel.dialogTitle = ko.observable('');
  viewModel.pending = ko.observable(false);
  viewModel.title = ko.observable('').extend({ required: true });
  viewModel.desc = ko.observable('');
  viewModel.startDate = ko.observable((null !== task.StartDate) ? new Date(Date.parse(task.StartDate)) : new Date());
  viewModel.dueDate = ko.observable((null !== task.DueDate) ? new Date(Date.parse(task.DueDate)) : new Date());
  viewModel.assignedTo = ko.observableArray(task.AssignedTo || []);
  viewModel.availableUsers = ko.observableArray(
        (self.column.project.Participants || [])
          .filter(function (entry) {
            return -1 === $self.assignedTo().map(function () {
              return entry.Username
            })
            .indexOf(entry.Username)
          }));
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