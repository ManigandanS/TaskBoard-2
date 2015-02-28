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
    self.project.Participants = self.viewModel.participants().map(function (entry) { return entry.user; });
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

  var User = function (user) {
    var self = this;
    self.user = user;
    self.name = ko.observable(user.FullName);
    self.canRemove = ko.observable(userService.user.Username !== user.Username);
  }  
  self.viewModel.removeUser = function (user) {
    self.viewModel.participants.remove(user);
  };  
  self.show = function (title, project, callback) {
    self.viewModel.dialogTitle(title);
    self.viewModel.title(project.Title);
    self.viewModel.desc(project.Description);
    self.viewModel.participants(project.Participants.map(function (entry) { return new User(entry); }));
    self.project = project;
    self.callback = callback;
    $('#projectModal').modal('show');
  };
  $(function () {
    $('#usersTypeahead').typeahead({
      minLength: 1,
      delay: 500,
      displayText: function (item) {
        return item.FullName;
      },
      afterSelect: function (user) {
        self.viewModel.participants.push(new User(user));
      },
      source: function (q, callback) {
        userService.search(q, function (err, res) {
          var participants = self.viewModel.participants().map(function (entry) { return entry.user.Username });
          callback(res.filter(function (entry) { return -1 === participants.indexOf(entry.Username); }));
        });
      }
    });
  })
})(window.jQuery, window.ko, window.userService);