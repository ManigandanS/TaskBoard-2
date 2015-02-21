(function (define, require) {
  define(
  ['ko', 'vm/user-bar', 'vm/project-list', 'vm/modal/ok-cancel', 'vm/modal/task', 'vm/modal/project', 'vm/modal/user'],
  function (ko, UserBar, ProjectList, okCancelModal, taskModal, projectModal, userModal) {
    return function () {
      var self = this;

      self.userBar = new UserBar(self);
      self.projectList = new ProjectList(self);

      self.projectModal = projectModal.viewModel;
      self.taskModal = taskModal.viewModel;
      self.okCancelModal = okCancelModal.viewModel;
      self.userModal = userModal.viewModel;
    }
  });
})(window.define, window.require);