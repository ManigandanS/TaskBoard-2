(function (define, require) {
  define(
  ['ko', 'vm/user', 'vm/project-list', 'vm/modal/ok-cancel', 'vm/modal/task-edit', 'vm/modal/project-edit'],
  function (ko, User, ProjectList, okCancel, taskEdit, projectEdit) {
    return function () {
      var self = this;

      self.user = new User();
      self.projectList = new ProjectList();

      self.projectEdit = projectEdit.viewModel;
      self.taskEdit = taskEdit.viewModel;
      self.okCancel = okCancel.viewModel;
    }
  });
})(window.define, window.require);