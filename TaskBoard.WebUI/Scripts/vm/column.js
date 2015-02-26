window.Column = (function (ko, taskModal, okCancelModal, projectService, Task) {
  return function (project, column, tasks) {
    var self = this;
    self.project = project;
    self.column = column;
    self.title = ko.observable(column.Title);
    self.cssClass = ko.observable(column.CssClass);
    self.allowCreate = ko.observable(column.AllowCreate);
    self.tasks = ko.observableArray(
      tasks
      .filter(function (entry) {
        return self.column.Status === entry.Status;
      })
      .map(function (entry) {
        return new Task(ko.mapping.fromJS(entry), true, false);
      }));
    self.tasks.project = project;
    self.tasks.column = column;
    self.create = function () {
      taskModal.show('Create new task', {
        Title: '',
        Description: '',
        StartDate: '',
        DueDate: '',
        Status: self.column.Status
      }, function (task, done) {
        projectService.createTask(self.project._id, task, function (err, res) {
          if (err) {
            console.error(err);
          } else {
            self.tasks.push(new Task(ko.mapping.fromJS(res)));
            done();
          }
        });
      });
    };
    self.details = function (task) {
      taskModal.show('Edit task', ko.mapping.toJS(task), function (update, done) {
        projectService.updateTask(self.project._id, update, function (err, res) {
          if (err) {
            console.error(err);
          } else {
            self.tasks.replace(
              ko.utils.arrayFirst(self.tasks(), function (entry) { return entry._id() == res._id; }),
              new Task(ko.mapping.fromJS(res), task.expand()));
            done();
          }
        })
      })
    };
    self.delete = function (task) {
      okCancelModal.show('Delete task: ' + task.Title(), function (done) {
        projectService.deleteTask(self.project._id, task._id(), function (err) {
          if (err) {
            console.error(err);
          } else {
            self.tasks.remove(task);
            done();
          }
        })
      });
    };
  }
})(window.ko, window.taskModal, window.okCancelModal, window.projectService, window.Task);
