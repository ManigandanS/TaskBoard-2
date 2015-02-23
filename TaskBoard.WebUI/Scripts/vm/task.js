window.Task = (function (ko) {
  return function (task, expanded, pending) {
    var self = this;
    self.expanded = ko.observable(expanded || true);
    self.pending = ko.observable(pending || false);
    self.toggleCollapse = function () {
      self.expanded(!self.expanded());
    };
    for (var prop in task) {
      self[prop] = self[prop] || task[prop];
    }
  };
})(window.ko);