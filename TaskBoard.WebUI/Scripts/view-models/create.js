(function (define, require) {
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
                    dueDate: self.dueDate
                })
                self.enabled = ko.computed(function () {
                    return 0 === self.errors().length && !self.pending();
                });
                self.create = function () {
                    self.pending(true);
                    projectService.createTask({
                        Title: self.title(),
                        Description: self.desc(),
                        StartDate: self.startDate(),
                        DueDate: self.dueDate()
                    }, function (res) {
                        self.pending(false);
                        $('#createModal').modal('hide');
                        app.list.open.push(res);
                    })
                }
            }
        });
})(window.define, window.require);