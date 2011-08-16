
var context = describe;
var $base, $target, $button;

describe("scrolly plugin", function() {
	beforeEach(function() {
		$base = $("#test");
		$base.width(150);

		spyOn($.fn, "animate").andCallFake(function(options, duration) {
			var changeValue = 1;
			if(options.left[0] == '-') {
				changeValue = -1;
			}
			if (options.left.indexOf("=")) {
				options.left = options.left.substring(2);
			}
			changeValue *= parseInt(options.left);
			var newLeftValue = $target.content.position().left + changeValue;
			$target.content.css("left", newLeftValue);
		});

		$target = new scrolly("#test", {});
		$button = $("#test .left-side").find(".clickable");
	});

	it("should have the 'scrolly' namespace", function() {
		expect(scrolly).toBeDefined();
	});

	context("setup", function() {
		it("should add the 'scrolly' class to the base", function() {
			expect($base.hasClass("scrolly")).toBe(true);
		});

		it("should add a .left-side div", function() {
			expect($base.find(".left-side").length).toBe(1);
		});

		it("should add a .portal", function() {
			expect($base.find(".portal").length).toBe(1);
		});

		it("should have a .portal width of 100", function() {
			expect($base.find(".portal").width()).toBe(100);
		});

		it("should add a .content inside the .portal div", function() {
			expect($base.find(".portal").find(".content").length).toBe(1);
		});

		it("should add a .right-side div", function() {
			expect($base.find(".right-side").length).toBe(1);
		});
	});

	context("scroll to the right", function() {
		context("multiple pages of width", function() {
			beforeEach(function() {
				$target.content.width(300);
			});

			it("should have a left value of -100", function() {
				expect($target.content.position().left).toBe(0);
				$target.scrollRight.call($button);
				expect($target.content.position().left).toBe(-100);
			});
		});

		context("less than three pages of width", function() {
			beforeEach(function() {
				$target.content.width(230);
				spyOn($.fn,"hide");
			});
			
			context("starting at -100", function() {
				beforeEach(function() {
					$target.content.css("left", "-100px");
					$target.scrollRight.call($button);
				});
				
				it("should have a left value of -130", function() {
					expect($target.content.position().left).toBe(-130);
				});
				
				it("should have called hide", function() {
					expect($.fn.hide).toHaveBeenCalled();
				});
			});
			
			context("starting at -30", function() {
				beforeEach(function() {
					$target.content.css("left", "-30px");
					$target.scrollRight.call($button);
				});
				
				it("should have a left value of -130", function() {
					expect($target.content.position().left).toBe(-130);
				});
				
				it("should have called hide", function() {
					expect($.fn.hide).toHaveBeenCalled();
				});
			});

		});

		context("two pages of width", function() {
			beforeEach(function() {
				$target.content.width(200);
			});

			it("should have a left value of -100", function() {
				expect($target.content.position().left).toBe(0);
				$target.scrollRight.call($button);
				expect($target.content.position().left).toBe(-100);
			});
		});

		context("less than two pages of width", function() {
			beforeEach(function() {
				$target.content.width(130);
			});

			it("should have a left value of -30", function() {
				expect($target.content.position().left).toBe(0);
				$target.scrollRight.call($button);
				expect($target.content.position().left).toBe(-30);
			});
		});

		context("less than one page of width", function() {
			beforeEach(function() {
				$target.content.width(75);
			});

			it("should not scroll", function() {
				expect($target.content.position().left).toBe(0);
				$target.scrollRight.call($button);
				expect($target.content.position().left).toBe(0);
			});
		});
	});

	context("scroll to the left", function() {
		context("multiple pages of width", function() {
			beforeEach(function() {
				$target.content.width(300);
				$target.content.css("left", "-200px");
			});

			it("should have a left value of -100", function() {
				expect($target.content.position().left).toBe(-200);
				$target.scrollLeft.call($button);
				expect($target.content.position().left).toBe(-100);
			});
		});

		context("less than a page left", function() {
			beforeEach(function() {
				$target.content.width(130);
				$target.content.css("left", "-30px");
			});

			it("should have a left value of 0", function() {
				expect($target.content.position().left).toBe(-30);
				$target.scrollLeft.call($button);
				expect($target.content.position().left).toBe(0);
			});
		});
	});

});