(function (define, require) {
    define(['ko', 'view-models/edit-task'], function (ko, EditTask) {
        return function () {
            var self = this;
            self.editTask = new EditTask();
        }
    });
})(window.define, window.require);