(function (define, require) {
  define(
  ['ko', 'vm/column', 'svc/project'],
  function (ko, Column, projectService) {
    return function (project) {
      var self = this;
      self.project = project;
      self.title = ko.observable(project.Title);
      self.desc = ko.observable(project.Description);
      self.columns = ko.observableArray();
      self.beforeMove = function (args) {
        args.cancelDrop = args.sourceParent.project._id !== args.targetParent.project._id;
      };
      self.afterMove = function (args) {
        args.item.status = arg.targetParent.column.status;
      };
      self.loadProjects = function (done) {
        projectService.getUsersProjects(function (err, res) {
          done();
        });
      };
      project.Columns.forEach(function (entry) {
        self.columns.push(new Column(project, entry, self.project.Tasks));
      });
    };
  });
})(window.define, window.require);