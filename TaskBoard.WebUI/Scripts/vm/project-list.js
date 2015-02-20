(function (define, require) {
  define(
  ['ko'],
  function (ko) {
    return function () {
      var self = this;
      self.projects = ko.observableArray();
      self.addProject = function (project) {
        self.projects.push(new projectVM(project));
      };
    };
  });
})(window.define, window.require);