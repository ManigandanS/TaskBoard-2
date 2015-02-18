(function (define, require) {
    define(['ko', 'services/project'], function (ko, projectService) {
        return function (app) {
            var self = this;
            self.app = app;            
            self.openProject = function (project) {
                var select = projectService.projects.filter(function (entry) {
                    entry._id === project._id();
                })[0];
                projectService.selectProject(select);
                app.tasks.openProject(select);
                app.view('tasks');
            };
            self.addProject(project) {

            }
        }
    });
})(window.define, window.require);