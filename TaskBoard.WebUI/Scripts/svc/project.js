(function (define, require) {
    define(['jquery', 'services/user'], function ($, userService) {
        var service = function () {
            var self = this;
            self.projects = [];            
            self.getProjects = function (callback) {
                $.ajax({
                    url: 'api/projects/user/' + userService.user.Username,
                    type: 'GET',
                    dataType: 'json',
                    success: function (res) {
                        self.projects = res;
                        if ('function' == typeof callback) { callback(null, res) };
                    },
                    error: function (res) {
                        if ('function' == typeof callback) { callback(res); }
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
                        self.project.Tasks.push(res);
                        if ('function' == typeof callback) { callback(null, res) };
                    },
                    error: function (res) {
                        if ('function' == typeof callback) { callback(res); }
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
                        var task = self.project.Tasks.filter(function (entry) {
                            return res._id == entry._id;
                        })[0];
                        for (var prop in task) {
                            task[prop] = res.prop;
                        }
                        if ('function' == typeof callback) { callback(null, res) };
                    },
                    error: function (res) {
                        if ('function' == typeof callback) { callback(res); }
                    }
                });
            };
            self.deleteTask = function (projectId, task, callback) {
                $.ajax({
                    url: 'api/projects/' + projectId + '/task/' + task._id,
                    type: 'POST',
                    dataType: 'json',
                    success: function (res) {
                        self.projects = res;
                        if ('function' == typeof callback) { callback(null, res) };
                    },
                    error: function (res) {
                        if ('function' == typeof callback) { callback(res); }
                    }
                });
            };
        }
        return new service();
    });
})(window.define, window.require);