(function (define) {
  define(
  ['ko', 'svc/user'],
  function (ko, userService) {
    var service = function () {
      var self = this;
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
    };
    return new service();
  });
})(window.define, window.require);