window.TaskPopvoer = (function (ko) {
  return function (args) {
    var self = this;
    var $viewModel = {};
    self.viewModel = $viewModel;
    $viewModel.pending = ko.observable(false);
    $viewModel.title = ko.observable(args.task.Title);
    $viewModel.desc = ko.observable(args.task.Description);
    $viewModel.asignedTo = ko.observableArray(args.task.AsignedTo);
    $viewModel.availableUsers = ko.observableArray(args.users);
    $viewModel.addUser = function(item) {
      $viewModel.availableUsers.remove(item);
      $viewModel.asignedTo.push(item);
    };
    $viewModel.removeUser = function (item) {
      $viewModel.asignedTo.remove(item);
      $viewModel.availableUsers.push(item);
    };
    $viewModel.delete = function () {
      $viewModel.pending(false);
      args.delete(function () {
        $viewModel.pending(false);
        $viewModel.$hidePopover();
      });
    };
    $viewModel.save = function () {
      args.task.Title = viewModel.title();
      args.task.Description = viewModel.desc();
      args.task.DueDate = viewModel.dueDate();
      args.task.StartDate = viewModel.startDate();
      args.task.AssignedTo = viewModel.asignedTo();
    };
  };
})(window.ko)