(function (define, require) {
  define(
  ['ko', 'vm/user-bar', 'vm/project-list', 'vm/modal/ok-cancel', 'vm/modal/task', 'vm/modal/project', 'vm/modal/user'],
  function (ko, UserBar, ProjectList, okCancel, taskEdit, projectEdit, userModal) {
    return function () {
      var self = this;

      self.userBar = new UserBar();
      self.projectList = new ProjectList();

      self.projectModal = projectEdit.viewModel;
      self.taskModal = taskEdit.viewModel;
      self.okCancelModal = okCancel.viewModel;
      self.userModal = userModal.viewModel;

      userModal.show();
    }
  });
})(window.define, window.require);