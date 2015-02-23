window.collpseable = new (function () {
  var self = this;
  self.update = function () {
    $('.collapse-toggle').off();
    var update = function (e) {
      if ($(this).hasClass('collapsed')) {
        // expand the panel
        $(this).closest('.collapse-target').find('.collapse-body').first().slideDown();
        $(this).removeClass('collapsed');
        $(this).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
      }
      else {
        // collapse the panel
        $(this).closest('.collapse-target').find('.collapse-body').first().slideUp();
        $(this).addClass('collapsed');
        $(this).find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
      }
    }
    $('.collapse-toggle').on("click", update);
    $('.collapsed').each(update);
  }
})(window.jQuery);