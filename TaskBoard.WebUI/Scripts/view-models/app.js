(function (define, require) {
    define(['ko', 'view-models/task-list', 'view-models/edit-task', 'view-models/user'],
        function (ko, TaskList, EditTask, User) {
        return function () {
            var self = this;
            self.taskList = new TaskList();
            self.editTask = new EditTask();
            self.user = new User();
        }
    });
})(window.define, window.require);