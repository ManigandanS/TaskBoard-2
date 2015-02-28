window.projectModal = new (function ($, ko, userService) {
  var self = this;
  self.viewModel = {};
  self.viewModel.dialogTitle = ko.observable('');
  self.viewModel.pending = ko.observable(false);
  self.viewModel.title = ko.observable('').extend({ required: true });
  self.viewModel.desc = ko.observable('');
  self.viewModel.participants = ko.observableArray([]);
  self.viewModel.errors = ko.validation.group({
    title: self.title,
  })
  self.viewModel.enabled = ko.computed(function () {
    return 0 === self.viewModel.errors().length && !self.viewModel.pending();
  });
  self.viewModel.confirm = function () {
    self.viewModel.pending(true);
    self.project.Title = self.viewModel.title();
    self.project.Description = self.viewModel.desc();
    self.callback(self.project, function () {
      self.viewModel.title('');
      self.viewModel.title.clearError();
      self.viewModel.desc('');
      self.viewModel.pending(false);
      $('#projectModal').modal('hide');
      delete self.callback;
      delete self.project;
    })
  };
  self.viewModel.addUser = function (user) {

  };
  self.viewModel.searchUsers = function (q, callback) {
    userService.searchUsers(q, function (res) {
      callback(res);
    });
  };
  self.show = function (title, project, callback) {
    self.viewModel.dialogTitle(title);
    self.viewModel.title(project.Title);
    self.viewModel.desc(project.Description);
    self.project = project;
    self.callback = callback;
    $('#projectModal').modal('show');
  };
})(window.jQuery, window.ko, window.userService);