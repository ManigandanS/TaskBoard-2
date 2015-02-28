/* global define */
function setupKoBootstrap(koObject, $) {
  "use strict";
  //UUID. note: not RFC4122-compliant.
  var guid = (function (s4) {
    return function () {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
  })(function () {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  });

  // Outer HTML
  if (!$.fn.outerHtml) {
    $.fn.outerHtml = function () {
      if (this.length === 0) {
        return false;
      }
      var elem = this[0], name = elem.tagName.toLowerCase();
      if (elem.outerHTML) {
        return elem.outerHTML;
      }
      var attrs = $.map(elem.attributes, function (i) {
        return i.name + '="' + i.value + '"';
      });
      return "<" + name + (attrs.length > 0 ? " " + attrs.join(" ") : "") + ">" + elem.innerHTML + "</" + name + ">";
    };
  }

  koObject.bindingHandlers.datepicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
      //initialize datepicker with some optional options
      var options = allBindingsAccessor().datepickerOptions || {};
      $(element).datepicker(options);

      //when a user changes the date, update the view model
      ko.utils.registerEventHandler(element, "changeDate", function (event) {
        var value = valueAccessor();
        if (ko.isObservable(value)) {
          value(event.date);
        }
      });
    },
    update: function (element, valueAccessor) {
      $(element).datepicker('setDate', ko.utils.unwrapObservable(valueAccessor()));
      //when the view model is updated, update the widget
      //if (widget) {
      //  widget.date = ko.utils.unwrapObservable(valueAccessor());
      //  if (widget.date) {
      //    widget.setDate(widget.date);
      //  }
      //}
    }
  }

  koObject.bindingHandlers.autosize = {
    init: function (element) {
      $(element).autosize();
    }
  }

  // Bind twitter typeahead
  koObject.bindingHandlers.typeahead = {
    init: function (element, valueAccessor, allBindingsAccessor, context) {
      var options = valueAccessor() || {};
      var allBindings = allBindingsAccessor();
      // update the "value" binding on select
      var modelValue = allBindings.value;
      if (modelValue) {
        var handleValueChange = function (item) {
          var valueToWrite = item ? item : $(element).val();
          if (ko.isWriteableObservable(modelValue)) {
            modelValue(valueToWrite);
          }
          return item;
        };
        options.updater = handleValueChange;
      }
      // call bootstrap type ahead
      $(element).typeahead(options);
    }
  };

  // Bind Bootstrap Progress
  koObject.bindingHandlers.progress = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var $element = $(element);

      var bar = $('<div/>', {
        'class': 'progress-bar',
        'data-bind': 'style: { width:' + valueAccessor() + ' }'
      });

      $element.attr('id', guid())
          .addClass('progress progress-info')
          .append(bar);

      koObject.applyBindingsToDescendants(viewModel, $element[0]);
    }
  };

  // Bind Bootstrap Alert
  koObject.bindingHandlers.alert = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var $element = $(element);
      var alertInfo = koObject.utils.unwrapObservable(valueAccessor());

      var dismissBtn = $('<button/>', {
        'type': 'button',
        'class': 'close',
        'data-dismiss': 'alert'
      }).html('&times;');

      var alertMessage = $('<p/>').html(alertInfo.message);

      $element.addClass('alert alert-' + alertInfo.priority)
          .append(dismissBtn)
          .append(alertMessage);
    }
  };

  // Bind Bootstrap Tooltip
  koObject.bindingHandlers.tooltip = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var $element, options, tooltip;
      options = koObject.utils.unwrapObservable(valueAccessor());
      $element = $(element);

      // If the title is an observable, make it auto-updating.
      if (koObject.isObservable(options.title)) {
        var isToolTipVisible = false;

        $element.on('show.bs.tooltip', function () {
          isToolTipVisible = true;
        });
        $element.on('hide.bs.tooltip', function () {
          isToolTipVisible = false;
        });

        // "true" is the bootstrap default.
        var origAnimation = options.animation || true;
        options.title.subscribe(function () {
          if (isToolTipVisible) {
            $element.data('bs.tooltip').options.animation = false; // temporarily disable animation to avoid flickering of the tooltip
            $element.tooltip('fixTitle') // call this method to update the title
                .tooltip('show');
            $element.data('bs.tooltip').options.animation = origAnimation;
          }
        });
      }

      tooltip = $element.data('bs.tooltip');
      if (tooltip) {
        $.extend(tooltip.options, options);
      } else {
        $element.tooltip(options);
      }
    }
  };

  // Bind Bootstrap Popover
  koObject.bindingHandlers.popover = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var $element = $(element);
      var popoverBindingValues = koObject.utils.unwrapObservable(valueAccessor());
      var template = popoverBindingValues.template || false;
      var options = popoverBindingValues.options || { };
      var data = popoverBindingValues.data || false;
      if (template !== false) {
        if (data) {
          options.content = "<!-- ko template: { name: template, if: data, data: data } --><!-- /ko -->";
        }
        else {
          options.content = $('#' + template).html();
        }
        options.html = true;
      }
      $element.on('shown.bs.popover', function (event) {

        var popoverData = $(event.target).data();
        var popoverEl = popoverData['bs.popover'].$tip;
        var options = popoverData['bs.popover'].options || {};
        var button = $(event.target);
        var buttonPosition = button.position();
        var buttonDimensions = {
          x: button.outerWidth(),
          y: button.outerHeight()
        };

        var hide = function () {
          button.popover('hide');
        };

        ko.cleanNode(popoverEl[0]);
        if (data) {
          data.$hidePopover = hide;
          koObject.applyBindings({ template: template, data: data }, popoverEl[0]);
        }
        else {
          viewModel.$hidePopover = hide;
          koObject.applyBindings(viewModel, popoverEl[0]);
        }

        var popoverDimensions = {
          x: popoverEl.outerWidth(),
          y: popoverEl.outerHeight()
        };

        popoverEl.find('button[data-dismiss="popover"]').click(function () {
          button.popover('hide');
        });

        switch (options.placement) {
          case 'right':
            popoverEl.css({
              left: buttonDimensions.x + buttonPosition.left,
              top: (buttonDimensions.y / 2 + buttonPosition.top) - popoverDimensions.y / 2
            });
            break;
          case 'left':
            popoverEl.css({
              left: buttonPosition.left - popoverDimensions.x,
              top: (buttonDimensions.y / 2 + buttonPosition.top) - popoverDimensions.y / 2
            });
            break;
          case 'top':
            popoverEl.css({
              left: buttonPosition.left + (buttonDimensions.x / 2 - popoverDimensions.x / 2),
              top: buttonPosition.top - popoverDimensions.y
            });
            break;
          case 'bottom':
            popoverEl.css({
              left: buttonPosition.left + (buttonDimensions.x / 2 - popoverDimensions.x / 2),
              top: buttonPosition.top + buttonDimensions.y
            });
            break;
        }
      });

      $element.popover(options);

      return { controlsDescendantBindings: true };

    }
  };

  // Bind Bootstrap Modal
  koObject.bindingHandlers.modal = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

      var $element = $(element);
      var modalBindingValues = koObject.utils.unwrapObservable(valueAccessor());
      var template = modalBindingValues.template || false;
      var options = modalBindingValues.options || {};
      var data = modalBindingValues.data || false;
      var fade = modalBindingValues.fade || false;
      var openModal = modalBindingValues.openModal || false;
      options.show = false;

      var modalAttr = {
        'class': "modal" + (fade ? ' fade' : ''),
        'tab-index': '-1',
        'role': 'dialog',
        'aria-hidden': 'true'
      };
      if (data) {
        modalAttr['data-bind'] = "template: { name: template, if: data, data: data }";
      }

      var modal = $('<div/>', modalAttr);

      if (!data) {
        modal.html($('#' + template).html());
      }


      modal.modal(options);

      $element.on('click', function () {
        if (data) {
          koObject.applyBindings({
            template: template,
            data: data
          }, modal[0]);

        } else {
          koObject.applyBindings(viewModel, modal[0]);
        }
        modal.modal('show');
        if (openModal) {
          openModal();
        }
        $('.modal-backdrop').css({ height: $(window).height(), position: 'fixed' });
      });

      return { controlsDescendantBindings: true };

    }
  };
}

(function (factory) {
  "use strict";
  // Support multiple loading scenarios
  if (typeof define === 'function' && define.amd) {
    // AMD anonymous module

    define(["require", "exports", "knockout", "jquery"], function (require, exports, knockout, jQuery) {
      factory(knockout, jQuery);
    });
  } else {
    // No module loader (plain <script> tag) - put directly in global namespace
    factory(window.ko, jQuery);
  }
}(setupKoBootstrap));