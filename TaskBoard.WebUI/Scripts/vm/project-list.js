(function (define, require) {
  define(
  ['ko', 'vm/modal/project', 'svc/project', 'svc/user'],
  function (ko, projectModal, projectService, userService) {
    return function () {
      var self = this;
      self.projects = ko.observableArray();
      self.addProject = function (project) {
        self.projects.push(new projectVM(project));
      };
      self.loadProjects = function (done) {
        projectService.getProjects(function (err, projects) {
          if (err) {
            console.error(err);
          } else {
            projects.forEach(function (entry) {
              self.addProject(entry);
            });
          }          
        })
      };
      self.clear = function () {
        self.projects.removeAll();
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
      };
    };
  });
})(window.define, window.require);