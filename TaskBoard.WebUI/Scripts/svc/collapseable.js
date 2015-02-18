(function (define) {
    define(['jquery'], function ($) {
        var service = function () {
            var self = this;
            self.update = function () {
                $('.collapse-toggle').off();
                $('.collapse-toggle').on("click", function (e) {
                    if ($(this).hasClass('collapsed')) {
                        // expand the panel
                        $(this).closest('.panel').find('.collapse-body').first().slideDown();
                        $(this).removeClass('panel-collapsed');
                        $(this).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
                    }
                    else {
                        // collapse the panel
                        $(this).closest('.collapse-target').find('.collapse-body').first().slideUp();
                        $(this).addClass('panel-collapsed');
                        $(this).find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
                    }
                });
                $('.collapsed').find('.collapse-body').slideUp();
            }
        };
        return new service();
    });
})(window.define, window.require);