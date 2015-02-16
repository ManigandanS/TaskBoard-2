(function (define, require) {
    define(['ko', 'services/project'], function (ko, projectService) {
        return function (app) {
            var self = this;
            self.app = app;
            self.projects = ko.observableArray();
            self.loadProject = function (callback) {
                projectService.getUsersProjects(function (err, projects) {
                    if (err) {
                        console.log(err);
                    } else {
                        projectService.selectProject(projects[0]);
                        var tasks = projects[0].Tasks.map(function (entry) {
                            return ko.mapping.fromJS(entry);
                        });
                        self.open(tasks.filter(function (entry) {
                            return entry.Status() == 'open';
                        }));
                        self.inProgress(tasks.filter(function (entry) {
                            return entry.Status() == 'inProgress';
                        }));
                        self.done(tasks.filter(function (entry) {
                            return entry.Status() == 'done';
                        }));
                        callback();
                    }
                });
            };
            self.select = function (project) {
                var select = projectService.projects.filter(function (entry) {
                    entry._id === project._id();
                })[0];
                projectService.selectProject(select);
                app.tasks.openProject(select);
                app.view('tasks');
            };
        }
    });
})(window.define, window.require);