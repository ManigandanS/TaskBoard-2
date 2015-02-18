(function (define, require) {
    define(['ko',
        'view-models/user',
        'view-models/create-task',
        'view-models/edit-task',
        'view-models/task-list',
        'view-models/create-project',
        'view-models/edit-project',
        'view-models/project-list'
        ],
        function (ko,
            User,
            CreateTask,
            EditTask,
            TaskList,
            CreateProject,
            EditProject,
            ProjectList) {
            return function () {
                var self = this;
                self.user = new User(self);

                self.createTask = new CreateTask(self);
                self.editTask = new EditTask(self);
                self.tasksList = new TaskList(self);

                self.projectList = new ProjectList(self);
                self.editProject = new EditTask(self);
                self.createProject = new EditTask(self);
            }
        });
})(window.define, window.require);