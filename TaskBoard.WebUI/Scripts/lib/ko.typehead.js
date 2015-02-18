(function (ko, $) {
	ko.bindingHandlers.typeahead = {
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
})(ko, jQuery);