(function (define, require, $) {
  require.config({
    shim: {
      "bootstrap": { "deps": ['jquery'] }
    },
    paths: {
      jquery: '../bower_components/jquery/dist/jquery',
      bootstrap: '../bower_components/bootstrap/dist/js/bootstrap'
    }
    });
    require(
    ['ko', 'vm/app', 'bootstrap'],
    function (ko, App, bs) {
        $(function () {
            //bootstrap app
            $('.datepicker').datepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                todayHighlight: true
            });
            $('.autosize').autosize();
            ko.validation.init({
                errorMessageClass: 'label label-danger'
            })

            // start app
            ko.applyBindings(new App());
        });
    });
})(window.define, window.require, window.jQuery);