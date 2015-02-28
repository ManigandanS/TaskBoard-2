window.Task = (function (ko, projectService) {
  return function (task, column) {
    var self = this;   
    self.column = column;
    for (var prop in task) {
      self[prop] = self[prop] || task[prop];
    }
    self.pending = ko.observable(false);
    self.addUser = function (item) {
      self.availableUsers.remove(item);
      self.asignedTo.push(item);
    };
    self.removeUser = function (item) {
      self.asignedTo.remove(item);
      self.availableUsers.push(item);
    };
    self.delete = function () {
      self.pending(false);
      args.delete(function () {
        self.pending(false);
        self.$hidePopover();
      });
    };
    self.save = function () {
      task.Title = viewModel.title();
      task.Description = viewModel.desc();
      task.DueDate = viewModel.dueDate();
      task.StartDate = viewModel.startDate();
      task.AssignedTo = viewModel.asignedTo();
    };
    self.getDeleteData = new (function(){
      var $self = this;
      $self.message = ko.observable('Delete task: ' + self.Title() + '?'),
      $self.pending = ko.observable(false),
      $self.confirm = function () {
        $self.pending(true);
          projectService.deleteTask(self.column.project._id, self._id(), function (err) {
            if (err) {
              console.error(err);
            } else {
              $self.pending(false);
              $self.$hidePopover();
              column.tasks.remove(self);
            }
          });
        }
    })();
    self.getDetailsData = new (function (task) {
      var $self = this;
      $self.page = ko.observable('details');
      $self.isDetails = ko.computed(function(){
        return 'details' == $self.page();
      });
      $self.isEdit = ko.computed(function () {
        return 'edit' == $self.page();
      });
      $self.showDetails = function () {
        return $self.page('details');
      };
      $self.showEdit = function () {
        return $self.page('edit');
      };
      $self.details = ko.mapping.fromJS(task);
      $self.pending = ko.observable(false);
      $self.title = ko.observable(task.Title || '').extend({ required: true });
      $self.desc = ko.observable(task.Description || '');
      $self.startDate = ko.observable((null !== task.StartDate) ? new Date(Date.parse(task.StartDate)) : new Date());
      $self.dueDate = ko.observable((null !== task.DueDate) ? new Date(Date.parse(task.DueDate)) : new Date());
      $self.assignedTo = ko.observableArray(task.AssignedTo || []);
      $self.availableUsers = ko.observableArray(
        (self.column.project.Participants || [])
          .filter(function (entry) {
            return -1 === $self.assignedTo().map(function () {
              return entry.Username})
            .indexOf(entry.Username) }));
      $self.errors = ko.validation.group({
        title: $self.title
      });
      $self.enabled = ko.computed(function () {
        return 0 === $self.errors().length && !$self.pending();
      });
      $self.addUser = function(item) {
        $self.availableUsers.remove(item);
        $self.assignedTo.push(item);
      };
      $self.removeUser = function (item) {
        $self.assignedTo.remove(item);
        $self.availableUsers.push(item);
      };
      $self.save = function () {
        $self.pending(true);
        projectService.updateTask(self.column.project._id, {
          _id: task._id,
          Title: $self.title(),
          Description: $self.desc(),
          DueDate: $self.dueDate().toISOString(),
          StartDate: $self.startDate().toISOString(),
          AssignedTo: $self.assignedTo(),
          Status: task.Status
        },
        function (err, res) {
          if (err) {
            console.error(err);
          } else {
            $self.pending(false);
            $self.$hidePopover();
            column.tasks.replace(
              ko.utils.arrayFirst(column.tasks(), function (entry) { return entry._id() == res._id; }),
              new Task(ko.mapping.fromJS(res), self.column));
          }
        })
      };
    })(ko.mapping.toJS(task));
  };
})(window.ko, window.projectService);