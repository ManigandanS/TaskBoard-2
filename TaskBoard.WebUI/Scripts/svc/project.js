(function (define, require) {
  define(
  ['jquery', 'svc/user'],
  function ($, userService) {
    var service = function () {
      var self = this;
      self.projects = {};
      self.getProjects = function (callback) {
        $.ajax({
          url: 'api/projects/user/' + userService.user.Username,
          type: 'GET',
          dataType: 'json',
          success: function (res) {
            res.forEach(function (entry) {
              self.projects[entry._id] = entry;
            });
            callback(null, res);
          },
          error: function (res) {
            callback(res);
          }
        });
      };
      self.createProject = function (project, callback) {
        $.ajax({
          url: 'api/projects',
          type: 'POST',
          dataType: 'json',
          data: project,
          success: function (res) {
            self.projects[res._id] = res;
            callback(null, res);
          },
          error: function (res) {
            callback(res);
          }
        });
      };
      self.deleteProject = function (projectId, callback) {
        $.ajax({
          url: 'api/projects/' + projectId,
          type: 'DELETE',
          dataType: 'json',
          data: project,
          success: function (res) {
            delete self.projects[res];
            callback(null, res);
          },
          error: function (res) {
            callback(res);
          }
        });
      };
      self.createTask = function (projectId, task, callback) {
        $.ajax({
          url: 'api/projects/' + projectId + '/task',
          type: 'POST',
          dataType: 'json',
          data: task,
          success: function (res) {
            self.projects[projectId].Tasks.push(res);
            callback(null, res);
          },
          error: function (res) {
            callback(res);
          }
        });
      };
      self.updateTask = function (projectId, task, callback) {
        $.ajax({
          url: 'api/projects/' + projectId + '/task',
          type: 'PUT',
          dataType: 'json',
          data: task,
          success: function (res) {
            var task = self.projects[projectId].Tasks.filter(function (entry) {
              return res._id == entry._id;
            })[0];
            for (var prop in task) {
              task[prop] = res.prop;
            }
            callback(null, res);
          },
          error: function (res) {
            callback(res);
          }
        });
      };
      self.deleteTask = function (projectId, taskId, callback) {
        $.ajax({
          url: 'api/projects/' + projectId + '/task/' + taskId,
          type: 'POST',
          dataType: 'json',
          success: function (res) {
            var task = self.projects[projectId].Tasks.filter(function (entry) {
              return res == entry._id;
            })[0];
            var index = self.projects[projectId].Tasks.indexOf(task);
            self.projects[projectId].Tasks.splice(index, 1);
            callback(null, res);
          },
          error: function (res) {
            callback(res);
          }
        });
      };
    }
    return new service();
  });
})(window.define, window.require);