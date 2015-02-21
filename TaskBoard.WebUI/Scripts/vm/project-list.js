(function (define, require) {
  define(
  ['ko', 'vm/project', 'vm/modal/project', 'svc/project', 'svc/user', 'svc/collapseable'],
  function (ko, Project, projectModal, projectService, userService, collapseableService) {
    return function () {
      var self = this;
      self.visible = ko.observable(userService.isAuthenticated());
      self.projects = ko.observableArray();
      self.addProject = function (project) {
        self.projects.push(new Project(project));
        collapseableService.update();
      };
      self.loadProjects = function (done) {
        projectService.getProjects(function (err, projects) {
          if (err) {
            console.error(err);
          } else {
            projects.forEach(function (entry) {
              self.addProject(entry);
            });
            self.visible(userService.isAuthenticated());
            done();
          }          
        })
      };
      self.clear = function () {
        self.projects.removeAll();
        self.visible(userService.isAuthenticated());
      };
      self.edit = function (task) {

      };
      self.delete = function (task) {

      };
      self.create = function () {
        projectModal.show(
          'Create new project',
          {
            Title: '',
            Description: '',
            Columns: [
              {
                Title: 'Open',
                CssClass: 'panel-danger',
                Status: 'open',
                AllowCreate: true,
              },
              {
                Title: 'In Progress',
                CssClass: 'panel-warning',
                Status: 'inProgress',
                AllowCreate: false,
              },
              {
                Title: 'Done',
                CssClass: 'panel-success',
                Status: 'done',
                AllowCreate: false,
              }
            ],
            Participants: [{ Username: userService.user.Username, FullName: userService.user.FullName }],
            Owner: { Username: userService.user.Username, FullName: userService.user.FullName }
          },
          function (project, done) {
            projectService.createProject(project, function (err, res) {
              if (err) {
                console.error(err);
              } else {
                addProject(res);
                done();
              }
            });
          });
        self.visible = ko.observable(userService.isAuthenticated());
      };
    };
  });
})(window.define, window.require);