(function (define, require, $) {
    require.config({
        paths: {
            jquery: '../bower_components/jquery/dist/jquery',
        }
    });
    require(['ko', 'view-models/app'], function (ko, App) {
        $(function () {
            //bootstrap app
            var dp = $('.datepicker').datepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                todayHighlight: true
            });

            // start app
            ko.applyBindings(new App());
        });
    });
})(window.define, window.require, window.jQuery);