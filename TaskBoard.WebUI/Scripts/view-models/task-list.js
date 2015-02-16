﻿(function (define, require) {
    define(['ko', 'services/project'], function (ko, projectService) {
        return function (app) {
            var self = this;
            self.app = app;
            self.open = ko.observableArray();
            self.open.status = 'open'
            self.inProgress = ko.observableArray();
            self.inProgress.status = 'inProgress'
            self.done = ko.observableArray();
            self.done.status = 'done'
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
            }
            ko.bindingHandlers.sortable.afterMove = function (args) {
                args.item.Status(args.targetParent.status);
                projectService.updateTask(ko.mapping.toJS(args.item));
            };
        }
    });
})(window.define, window.require);