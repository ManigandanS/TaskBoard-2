(function (define, require) {
    define(
    ['ko', 'vm/user', 'vm/task', 'vm/project', 'vm/project-list', 'vm/ok-cancel'],
    function (ko, User, Task, Project, ProjectList, OkCancel) {
        return function () {
            var self = this;
            self.user = new User(self);

            self.projectList = new ProjectList(self);
            self.project = new Project(self);

            self.task = new Task(self);
            self.okCancel = new OkCancel(self);
        }
    });
})(window.define, window.require);