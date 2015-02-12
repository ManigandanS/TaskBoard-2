(function (define, require) {
    require.config({
        paths: {
            jquery: '../bower_components/jquery/dist/jquery',
        }
    });
    require(['ko', 'jquery', 'view-models/app'], function (ko, $, App) {
        $(function () {
            //bootstrap app
            $('.datepicker').datepicker({ format: "yyyy-mm-dd" });

            // start app
            ko.applyBindings(new App());
        });
    });
})(window.define, window.require);