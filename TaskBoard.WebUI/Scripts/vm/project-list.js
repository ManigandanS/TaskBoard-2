﻿window.ProjectList = (function (ko, Project, projectModal, okCancelModal, projectService, userService) {
  return function () {
    var self = this;
    self.selectedProject = ko.observable();
    self.visible = ko.observable(userService.isAuthenticated());
    self.projects = ko.observableArray();
    self.removeProject = function(project) {
      self.projects.remove(project);
    };
    self.updateProject = function (project) {
      self.selectedProject(new Project(project, self.selectedProject, self.removeProject, self.updateProject))
      self.projects.replace(
            ko.utils.arrayFirst(self.projects(), function (entry) { return entry.project._id == project._id; }),
            self.selectedProject());
      
    };
    self.addProject = function (project) {
      self.projects.push(new Project(project, self.selectedProject, self.removeProject, self.updateProject));
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
          if (self.projects()[0]) {
            self.selectedProject(self.projects()[0]);
          }
          done();
        }
      })
    };
    self.clear = function () {
      self.projects.removeAll();
      self.visible(userService.isAuthenticated());
    };
    self.delete = function (project) {
      okCancelModal.show(
        'Delete project ' + project.project.Title + '?',
        ko.mapping.toJS(project),
        function (done) {
          projectService.deleteProject(project.project._id, function (deleteId) {
            self.projects.remove(function (entry) {
              entry.project._id === deleteId;
            });
            self.selectedProject(self.projects()[0]);
            done();
          })
        });
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
              self.addProject(res);
              done();
            }
          });
        });
      self.visible = ko.observable(userService.isAuthenticated());
    };
  };
})(window.ko, window.Project, window.projectModal, window.okCancelModal, window.projectService, window.userService);
