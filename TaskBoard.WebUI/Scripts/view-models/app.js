(function (define, require) {
    define(['ko', 'view-models/task-list', 'view-models/edit-task', 'view-models/user'],
        function (ko, TaskList, EditTask, User) {
        return function () {
            var self = this;
            self.list = new TaskList();
            self.edit = new EditTask();
            self.user = new User();
        }
    });
})(window.define, window.require);