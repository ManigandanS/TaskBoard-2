(function ($, ko, UserBar, ProjectList, okCancelModal, taskModal, projectModal, userModal, userService) {
  var app = new (function () {
    var self = this;

    self.userBar = new UserBar(self);
    self.projectList = new ProjectList(self);

    self.projectModal = projectModal.viewModel;
    self.taskModal = taskModal.viewModel;
    self.okCancelModal = okCancelModal.viewModel;
    self.userModal = userModal.viewModel;
  })();

  $(function () {
    //bootstrap app
    $('.datepicker').datepicker({
      format: "yyyy-mm-dd",
      autoclose: true,
      todayHighlight: true
    });
    $('.autosize').autosize();

    //validation rules
    ko.validation.rules['uniqueUsername'] = {
      async: true,
      validator: function (val, otherVal, callback) {
        userService.checkLogin(val, callback);
      },
      message: 'Username already used'
    };
    ko.validation.rules['uniqueEmail'] = {
      async: true,
      validator: function (val, otherVal, callback) {
        userService.checkLogin(val, callback);
      },
      message: 'E-mail already used'
    };
    ko.validation.registerExtenders();

    // custom bindings
    ko.validation.init({
      errorMessageClass: 'label label-danger'
    });

    // start app
    ko.applyBindings(app,document.getElementById('app'));
  });
})(window.jQuery, window.ko, window.UserBar, window.ProjectList, window.okCancelModal, window.taskModal, window.projectModal, window.userModal, window.userService);