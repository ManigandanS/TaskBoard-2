(function (define, require, $) {
    require.config({
        paths: {
            jquery: '../bower_components/jquery/dist/jquery',
        }
    });
    require(
    ['ko', 'vm/app', ],
    function (ko, App) {
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