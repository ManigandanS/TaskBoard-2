window.signUp = new (function (ko) {
  var self = this;
  self.pending = ko.observable(false);
  self.username = ko.observable('').extend({
    throttle: 750,
    required: true,
    pattern: {
      message: 'Only letters and numbers.',
      params: /^[A-Za-z0-9]{3,20}$/
    },
    uniqueUsername: {
      message: 'Username already used.',
    }
  });
  self.email = ko.observable('').extend({
    throttle: 750,
    required: true,
    email: true,
    uniqueEmail: {
      message: 'E-mail already used.',
    }
  });
  self.password = ko.observable('').extend({ required: true, });
  self.fullname = ko.observable('').extend({
    required: true,
    pattern: {
      params: /^[A-Za-z ]{3,48}$/,
      message: 'Only letters and whitespace.',
    }
  })
  self.confirm = ko.observable('').extend({
    validation: {
      params: self.password,
      message: 'Password does not match confirmation.',
      validator: function (val, other) {
        return val === other;
      },
    }
  });
  self.errors = ko.validation.group({
    login: self.username,
    email: self.email,
    password: self.password,
    confirm: self.confirm
  });
  self.enabled = ko.computed(function () {
    return 0 === self.errors().length;
  });
  self.clear = function () {
    self.pending(false);
    self.username('');
    self.email('');
    self.fullname('');
    self.password('');
    self.confirm('');
    setTimeout(function () {
      self.username.clearError();
      self.email.clearError();
      self.fullname.clearError();
      self.password.clearError();
      self.confirm.clearError();
    }, 800);        
  };
})(window.ko);