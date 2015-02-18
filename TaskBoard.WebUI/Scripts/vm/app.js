(function (define, require) {
    define(
    ['ko', 'vm/user', 'vm/create-task', 'vm/edit-task', 'vm/create-project', 'vm/edit-project', 'vm/project-list'],
    function (ko, User, CreateTask, EditTask, CreateProject, EditProject, ProjectList) {
        return function () {
            var self = this;
            self.user = new User(self);

            self.projectList = new ProjectList(self);
            self.editProject = new EditTask(self);
            self.createProject = new EditTask(self);

            self.createTask = new CreateTask(self);
            self.editTask = new EditTask(self);
        }
    });
})(window.define, window.require);