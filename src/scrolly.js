var scrolly;
(function($) {
	scrolly = function(container, opts) {
		this.options = {
			rightText : "&gt;",
			leftText : "&lt;",
			buildContainer : true
		};
		this.options = $.extend(this.options, opts);
		if(this.options.buildContainer) {
			$(container).html($.tmpl(
					"<div class='left-side'><div class='clickable'>${leftText}</div>&nbsp;</div>" +
					"<div class='portal'><div class='content'>${content}</div></div>" +
					"<div class='right-side'><div class='clickable'>${rightText}</div>&nbsp;</div>",
					$.extend(this.options, {
						content: $(container).html()
					})
			)).addClass("scrolly");
		}
		this.content = $(container).find(".content");
		this.portal = $(container).find(".portal");
		this.rightButton = $(container).find(".right-side .clickable");
		this.leftButton = $(container).find(".left-side .clickable");

		this.portal.width( $(container).width() - ($(container).find(".right-side").width() * 2) );
		$(container).data("scrolly", this);

		this.scrollLeft = function(event) {
			var that = $(this).closest(".scrolly").data("scrolly");

			if(that.content.width() > that.portal.width()) {
				that.rightButton.show();
				var $portalWidth = that.portal.width();
				var remainingTravel = that.content.position().left;
				var changeValue = 0;
				if (remainingTravel > ($portalWidth * -1)) {
					changeValue = that.content.position().left * -1;
				} else {
					changeValue = $portalWidth
				}
				that.content.animate({left: "+=" + changeValue}, 200, function() {
					if($(this).position().left == 0) {
						that.leftButton.hide();
					}
				});
			}
		};

		this.scrollRight = function(event) {
			var that = $(this).closest(".scrolly").data("scrolly");
			if(that.content.width() > that.portal.width()) {
				that.leftButton.show();
				var $portalWidth = that.portal.width();
				var remainingTravel = (that.content.width() + that.content.position().left) - $portalWidth;
				var changeValue = 0;
				if (remainingTravel < $portalWidth) {
					changeValue = remainingTravel;
					that.rightButton.hide();
				} else {
					changeValue = $portalWidth
					if(remainingTravel == $portalWidth) {
						that.rightButton.hide();
					}
				}
				that.content.animate({left: "-=" + changeValue}, 200);

			}
		};

		$(container).find(".right-side").delegate(".clickable", "click", this.scrollRight);
		$(container).find(".left-side").delegate(".clickable", "click", this.scrollLeft);
		return this;
	};

})(jQuery);

