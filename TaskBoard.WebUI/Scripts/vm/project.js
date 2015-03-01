window.Project = (function (ko, Column, projectService, userService) {
  return function (project, selected, remove, updateProject) {
    var self = this;
    self.project = project;
    self.title = ko.observable(project.Title);
    self.desc = ko.observable(project.Description);
    self.columns = ko.observableArray();
    self.participants = ko.observable(project.Participants);
    self.canEdit = ko.observable(self.project.Owner.Username === userService.user.Username);
    self.getDeleteData = new (function () {
      var $self = this;
      $self.message = ko.observable('Delete project: ' + self.title() + '?'),
      $self.pending = ko.observable(false),
      $self.confirm = function () {
        $self.pending(true);
        projectService.deleteProject(self.project._id, function (err) {
          if (err) {
            console.error(err);
          } else {
            $self.pending(false);
            $self.$hidePopover();
            remove(self);
          }
        });
      }
    })();
    self.edit = function () {
      projectModal.show(
        'Edit project', project,
        function (project, done) {
          projectService.createProject(project, function (err, res) {
            if (err) {
              console.error(err);
            } else {
              updateProject(res);
              done();
            }
          });
        });
    };
    self.beforeMove = function (args) {
      args.cancelDrop = args.sourceParent.project._id !== args.targetParent.project._id;
    };
    self.afterMove = function (args) {
      args.item.pending(true);
      args.item.Status(args.targetParent.column.Status);
      projectService.updateTask(self.project._id, ko.mapping.toJS(args.item), function (err, res) {
        if (err) {
          console.error(err);
        } else {
          args.item.pending(false);
        }
      })
    };
    self.loadProjects = function (done) {
      projectService.getUsersProjects(function (err, res) {
        done();
      });
    };
    self.isSelected = ko.computed(function () {
      return self === selected();
    });
    project.Columns.forEach(function (entry) {
      self.columns.push(new Column(project, entry, self.project.Tasks));
    });
  };
})(window.ko, window.Column, window.projectService, window.userService);