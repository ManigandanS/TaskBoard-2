(function (define, require) {
  define(
  ['ko', 'vm/modal/task', 'vm/modal/ok-cancel', 'svc/project'],
  function (ko, taskModal, okCancel, projectService) {
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
          return ko.mapping.fromJS(entry);
        }));
      self.tasks.project = project;
      self.tasks.column = column;
      self.create = function () {
        taskModal.show('Create new task', {
          Title: '',
          Description: '',
          StartDate: '',
          DueDate: ''
        }, function (task, done) {

        });
      };
      self.edit = function (task) {
        editTask.show('Edit task', ko.mapping.toJS(task), function (task, done) {
          projectService.updateTask(task, function (err, task) {
            if (err) {
              console.error(err);
            } else {              
              self.tasks.replace(
                self.tasks().indexOf(ko.utils.arrayFirst(function (entry) { entry._id() === task._id; })),
                ko.mapping.fromJS(task));
              done();
            }
          })
        })
      };
      self.delete = function (task) {
        okCancel.show('Delete task: ' + task.Title(), function (done) {
          projectService.deleteTask(self.project._id, task._id(), function (err) {
            if (err) {
              console.error(err);
            } else {
              done();
            }
          })
        })
        self.tasks.remove(task);
      };
    }
  });
})(window.define, window.require);