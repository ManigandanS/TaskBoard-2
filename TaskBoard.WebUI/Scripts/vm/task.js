﻿(function (define, require) {
    define(['jquery', 'ko', 'services/project'],
        function($, ko, projectService) {
            return function (app) {
                var self = this;
                self.app = app;
                self.pending = ko.observable(false);
                self.title = ko.observable('').extend({ required: true });
                self.desc = ko.observable('').extend({ required: true });
                self.startDate = ko.observable('').extend({ required: true });
                self.dueDate = ko.observable('').extend({ required: true });
                self.errors = ko.validation.group({
                    title: self.title,
                    desc: self.desc,
                    startDate: self.startDate,
                    dueDate: self.dueDate,
                    asignedTo: self.asignedTo,
                    source: self.source
                });
                self.open = function (title, task, callback) {
                    self.dialogTitle(title);
                    self.callback = callback;
                    self.title(task.Title());
                    self.desc(task.Description());
                    self.startDate(task.StartDate());
                    self.dueDate(task.DueDate());
                }
                self.enabled = ko.computed(function () {
                    return 0 === self.errors().length && !self.pending();
                });
                self.dysplayName = function (item) {
                    return item.FullName;
                }
                self.confirm = function () {
                    self.pending(true);
                    self.callback({
                        Title: self.title(),
                        Description: self.desc(),
                        Status: 'open',
                        StartDate: self.startDate(),
                        DueDate: self.dueDate()
                    }, function (err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            self.pending(false);
                            $('.bs-modal-task').hide();
                            app.list.open.push(ko.mapping.fromJS(res));
                        }
                    })
                }
            }
        });
})(window.define, window.require);