(function (define, require) {
    define(['ko', 'view-models/task-list', 'view-models/task-list', 'view-models/edit-task', 'view-models/user'],
        function (ko, CreateTask, TaskList, EditTask, User) {
        return function () {
            var self = this;
            self.create = new CreateTask(self);
            self.list = new TaskList(self);
            self.edit = new EditTask(self);
            self.user = new User(self);
        }
    });
})(window.define, window.require);