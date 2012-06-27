(function(window, document, undefined) {
	$.fn.scaleRemove = function() {
		if ( !$.support.transition ) {
			this.remove();
			return;
		}
	
		this.each(function() {
			var $this = $(this);
			var $animBox = $this.clone(true);
			//debugger;
			$animBox.vendorCss({
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				margin: 0,
				transformOrigin: '50% 20%'
			});
	
			$this.height( $this.outerHeight() ).empty();
	
			$this.css({
				overflow: 'visible',
				background: 'none',
				border: 'none',
				padding: 0
			});
	
			if ($this.css('position') === 'static') {
				$this.css('position', 'relative');
			}
	
			$animBox.append( $this.contents() ).appendTo($this);
	
			$this.transition({
				height: 0,
				marginTop: 0,
				marginBottom: 0
			}, {
				duration: 500,
				complete: function() {
					$this.remove();
				}
			});
	
			$animBox.transition({
				transform: 'scale(0.2)',
				opacity: 0
			}, {
				duration: 300
			});
		});
	
	};
	// Add an event for click or enter on keyboard
	/*$.fn.activate = function(callback) {
		this.prop('tabIndex', '0').click(callback).keyup(function(event){
			if (event.keyCode == 13) {
				return callback(event)
			}
		});
	};*/

	// get an element's auto-height
	/*$.fn.fullHeight = function() {
		var height = this.height(),
			autoHeight = this.height('auto').height();
			
		this.height(height);
		return autoHeight;
	};*/
	
	// Make element's width and heights static
	/*$.fn.staticSize = function() {
		return this.each(function() {
			var $this = $(this);
			$this.width( $this.width() ).height( $this.height() );
		});
	};*/
	
	// listen for keyup after a ms delay
	/*$.fn.keyupDelay = function(delay, callback) {
		var timeout;
		
		this.keyup(function() {
			var args = arguments,
				context = this;
			
			clearTimeout(timeout);
			
			timeout = setTimeout(function() {
				callback.apply(context, args);
			}, delay);
		});
		
		return this;
	}*/
	
	// $('#char-count').charCount('#input-element', 500); // init
	// $('#char-count').charCount('update'); // manually trigger an update
	// Requires: keyupDelay
	/*$.fn.charCount = function($input, limit) {
		var $countElm = this;
		
		if ( !this[0] ) { return $countElm; }
		
		if ($input === 'update') {
			$countElm.data('charCountUpdator')();
		}
		else {
			var update = function() {
				var charsLeft = limit - $input.val().length;
				
				if (charsLeft < 0) {
					$countElm.html('<span class="over">' + (charsLeft * -1) + '</span> character' + (charsLeft === -1 ? '' : 's') + ' over');
				}
				else {
					$countElm.html('<span>' + charsLeft + '</span> character' + (charsLeft === 1 ? '' : 's') + ' remaining');
				}
			};
			$countElm.data('charCountUpdator', update);
			$input = $( $input ).keyupDelay( 100, update );
			update();
		}
		return $countElm;
	}*/
	
	// Make labels a placeholder that shows & hides
	// The label should be hidden by default, via CSS, if js is enabled
	// Label must have a for attribute
	/*$.fn.placeholder = function() {
		this.each(function() {
			var $label = $(this).css('position', 'absolute'),
				$input = $( '#' + $label.attr('for') );
			
			$label.css( $input.position() );
			
			function hideLabel() {
				$label.hide();
			}
			
			function showLabelIfInputEmpty() {
				!$input.val() && $label.show();
			}
			
			$input.keydown(hideLabel).focus(hideLabel).blur(showLabelIfInputEmpty);
			showLabelIfInputEmpty();
		});
	};*/
	
	// cycle a set of class names for selected items
	// eg $('#some-list').children().cycleClasses('odd', 'even');
	// eg $('#some-list').children().cycleClasses([odd', 'even]);
	/*$.fn.cycleClasses = function() {
		var classNames = $.isArray( arguments[0] ) ? arguments[0] : arguments,
			len = classNames.length;
			
		this.addClass(function(i) {
			return classNames[i % len];
		});
	};*/
	
	// get/set the caret position in a text field
	// eg $('input.whatever').caret(); // returns 0-indexed caret start position
	// eg $('input.whatever').caret(0, 5); // select chars 0-5
	/*$.fn.caret = function(start, end) {
		var inputElm = this[0];
		
		if (start === undefined) {
			var r;
	
			if (!window.opera && document.selection && document.selection.createRange) { // IE
				range = document.selection.createRange();
				range.collapse();
				range.setEndPoint( 'StartToStart', inputElm.createTextRange() );
				r = range.text.length;
			}
			else { // moz, saf, opera
				r = inputElm.selectionStart;
			}
			return r;
		}
		else {
			end = (end === undefined) ? start : end;
	
			var character = 'character',
				range;
	
			if (!window.opera && inputElm.createTextRange) { // IE
				range = inputElm.createTextRange();
				range.moveStart(character, start);
				range.moveEnd(character, end - inputElm.value.length);
				range.select();
			}
			else { // moz, saf, opera
				inputElm.select();
				inputElm.selectionStart = start;
				inputElm.selectionEnd = end;
			}
			return this;
		}
	}*/
	
	// make a string html safe
	/*function h(str) {
		str = str + '';
		if (!str) { return ''; }
		
		return str
			.replace(/&/g,'&amp;')
			.replace(/</g,'&lt;')
			.replace(/>/g,'&gt;')
			.replace(/"/g,'&quot;');
	}*/
	
	/*
		Get a supported css property name for a css property
		Will search common vendor prefixes for supported value.
		
		usage:
			getCssPropertyName('border-radius');
			// returns...
			// 'border-radius' if supported, else...
			// '-moz-border-radius' if supported, else...
			// '-webkit-border-radius' if supported, else...
			// etc etc, else ''
	 */
	/*var getCssPropertyName = (function() {
		var style = document.createElement('b').style,
			prefixes = ['Webkit', 'O', 'Ie', 'Moz'],
			cache = {};

		return function(propertyName) {
			if ( propertyName in cache ) {
				return cache[propertyName];
			}

			var supportedValue = '',
				i = prefixes.length,
				upperCamelPropertyName,
				camelPropertyName = propertyName.replace(/-([a-z])/ig, function( all, letter ) {
					return letter.toUpperCase();
				});

			if ( camelPropertyName in style ) {
				supportedValue = propertyName;
			}
			else {
				// uppercase first char
				upperCamelPropertyName = camelPropertyName.slice(0,1).toUpperCase() + camelPropertyName.slice(1);
				while (i--) if ( prefixes[i] + upperCamelPropertyName in style ) {
					// convert MozBlah to -moz-blah
					supportedValue = (prefixes[i] + upperCamelPropertyName).replace( /([A-Z])/g, '-$1' ).toLowerCase();
					break;
				}
			}

			return cache[propertyName] = supportedValue;
		}
	})();*/
	
	$('html').ajaxSend(function(event, xhr, settings) {
		function getCookie(name) {
			var result;
			return (result = new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)').exec(document.cookie))
				? decodeURIComponent(result[1]) : undefined;
		}
		if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
			// Only send the token to relative URLs i.e. locally.
			xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
		}
	});

	$(window).bind('load', function() {
		// apply some bg images on-load to give priority to other images
		document.documentElement.className += ' on-load';
	});
	
	// http://blogs.msdn.com/b/cwilso/archive/2006/11/07/ie-re-downloading-background-images.aspx
	try {
		document.execCommand("BackgroundImageCache", false, true);
	} catch(e) {}
})(window, document);