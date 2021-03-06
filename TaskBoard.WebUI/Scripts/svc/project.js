﻿window.projectService = new (function ($, userService) {
  var self = this;
  self.projects = {};
  self.getProjects = function (callback) {
    $.ajax({
      url: 'api/projects/user/' + userService.user.Username,
      type: 'GET',
      headers: {
        Authorization: userService.token
      },
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
      headers: {
        Authorization: userService.token
      },
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
  self.updateProject = function (project, callback) {
    $.ajax({
      url: 'api/projects',
      type: 'PUT',
      headers: {
        Authorization: userService.token
      },
      dataType: 'json',
      data: project,
      success: function (res) {
        for (var prop in res) {
          self.projects[res._id][prop] = res[prop] || self.projects[res._id][prop];
        }
        callback(null, self.projects[res._id]);
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
      headers: {
        Authorization: userService.token
      },
      dataType: 'json',
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
      headers: {
        Authorization: userService.token
      },
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
      headers: {
        Authorization: userService.token
      },
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
      type: 'DELETE',
      headers: {
        Authorization: userService.token
      },
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
})(window.jQuery, window.userService);