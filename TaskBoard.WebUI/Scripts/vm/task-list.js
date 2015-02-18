(function (define, require) {
    define(
    ['ko', 'services/project'],
    function (ko, projectService) {
        return function (app) {
            var self = this;
            var columns = [
                {
                    status: 'open',
                    cssClass: 'panel-danger',
                    title: 'Open'
                },
                {
                    status: 'inProgress',
                    cssClass: 'panel-warning',
                    title: 'Open'
                },
                {
                    status: 'done',
                    cssClass: 'panel-success',
                    title: 'Done'
                }
            ];
            self.app = app;
            statuses.forEach(function (entry) {
                self[entry.status] = ko.observableArray();
                self[entry.status].status = entry.status;
            });
            self.openProject = function (project) {
                var tasks = project.Tasks.map(function (entry) {
                    return ko.mapping.fromJS(entry);
                });
                statuses.forEach(function (col) {
                    self[col.status](tasks.filter(function (entry) {
                        return entry.Status() == col.status;
                    }));
                });
            }
            ko.bindingHandlers.sortable.afterMove = function (args) {
                args.item.Status(args.targetParent.status);
                projectService.updateTask(ko.mapping.toJS(args.item));
            };
        }
    });
})(window.define, window.require);