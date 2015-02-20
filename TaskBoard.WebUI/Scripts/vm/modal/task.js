(function (define, require) {
  define(['jquery', 'ko'],
      function ($, ko, projectService) {
        var modal = function () {
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

            self.viewModel.task.Title = self.title();
            self.viewModel.task.Description = self.desc();
            self.viewModel.task.DueDate = self.dueDate();
            self.viewModel.task.StartDate = self.startDate();

            self.callback(self.task, function () {
              self.viewModel.pending(false);
              delete self.task;
              delete self.callback;
              $('.bs-modal-task').hide();
            });
          };
          self.show = function (title, task, callback) {
            self.viewModel.title(title);
            self.task = task;
            self.callback = callback;
          }
        }
        return new modal();
      });
})(window.define, window.require);