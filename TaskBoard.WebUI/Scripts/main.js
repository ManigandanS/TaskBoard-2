﻿(function ($, require) {
    $(function () {
        require(['ko', 'view-models/app'], function (ko, App) {
            ko.applyBindings(new App());
        });
    });
})(jQuery, window.require);