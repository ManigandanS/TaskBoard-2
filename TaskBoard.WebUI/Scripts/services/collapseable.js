(function (define) {
    define(['jquery'], function ($) {
        var service = function () {
            var self = this;
            self.update = function () {
                $('.panel-heading span.clickable').on("click", function (e) {
                    if ($(this).hasClass('panel-collapsed')) {
                        // expand the panel
                        $(this).closest('.panel').find('.panel-body').slideDown();
                        $(this).removeClass('panel-collapsed');
                        $(this).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
                    }
                    else {
                        // collapse the panel
                        $(this).closest('.panel').find('.panel-body').slideUp();
                        $(this).addClass('panel-collapsed');
                        $(this).find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
                    }
                });
                $('.panel-heading span.panel-collapsed').closest('.panel').find('.panel-body').slideUp();
            }
        };
        return new service();
    });
})(window.define, window.require);