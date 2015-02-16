(function (define, require) {
    define(['ko', 'view-models/create', 'view-models/task-list', 'view-models/project-list', 'view-models/edit-task', 'view-models/user'],
        function (ko, CreateTask, TaskList, ProjectList, EditTask, User) {
            return function () {
                var self = this;
                self.create = new CreateTask(self);
                self.tasks = new TaskList(self);
                self.projects = new ProjectList(self);
                self.edit = new EditTask(self);
                self.user = new User(self);
            }
        });
})(window.define, window.require);