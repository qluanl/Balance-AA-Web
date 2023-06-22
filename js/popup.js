/*****************************************
******* JavaScript Popup Prototype  ******
*****************************************/

function Popup(config) {
	this.title = config.title;
	this.message = config.message;
	this.buttons = config.buttons;
	this.buttonActn = config.buttonActn;
	this.url = config.url;
	this.method = config.method;
	this.class = config.class;
	this.reload = config.reload;

	this.initDefaults();

	this.me = this.makeHTML();
}

Popup.prototype.initDefaults = function () {
	if (this.title === undefined) { this.title = "Popup"; }
	if (this.message === undefined) { this.message = "The message was not supplied."; }
	if (this.buttons === undefined) { this.buttons = ['ok']; }
	if (this.method === undefined) { this.method = 'get'; }
	if (this.url === undefined) { this.url = false; }
	if (this.reload === undefined) { this.reload = false; }
};

Popup.prototype.makeHTML = function () {
	var html = $('<div class="overlay"></div>'),
		popup = $('<div id="popup" class="popup"></div>'),
		titlebar = $('<div class="titleBar"><span>' + this.title + '</span></div>'),
		note = $('<div class="note"><span>' + this.message + '</span></div>');

	if (this.class) {
		html.addClass(this.class);
	}

	popup.prepend(titlebar).append(note).append(this.makeBtns());
	html.append(popup);

	return html;
};

Popup.prototype.makeBtns = function () {
	var buttons = $('<div class="buttons"></div>'),
		form,
		button,
		input;

	for (var i = 0; i < this.buttons.length; i++) {

		form = $('<form></form>');
		button = $('<span class="button">' + this.buttons[i] + '</span>');

		if (this.buttonActn) {
			for (var x = 0; x < this.buttonActn[i].length; x++) {
				input = $('<input type="hidden" name="' + this.buttonActn[i][x].name + '" value="' + this.buttonActn[i][x].value + '" />');
				form.append(input);
			}
		}

		form.append(button);
		buttons.append(form);
	}
	return buttons;
};

Popup.prototype.bindButtons = function () {
	var thisPopup = this;

	this.me.find('span.button').each(function () {
		$(this).bind('click', function (event) {
			event.preventDefault();
			var form = $(event.target).parents('form');
			thisPopup.close(form);
		});
	});
};

Popup.prototype.open = function () {
	if ( !$('div.overlay').length ) {
		this.bindButtons();
		$('body').prepend(this.me);
	}
};

Popup.prototype.close = function (form) {
	var thisPopup = this;

	this.me.css('animation-name', 'hidePopup');

	setTimeout(function () {
		thisPopup.me.remove();
		thisPopup.me.css('animation-name', '');

		if (thisPopup.reload) {
			window.location.href = window.location.href;
		} else if (thisPopup.url) {
			var data = form.serialize(),
				method = thisPopup.method,
				url = thisPopup.url;
			$.ajax({
				data: data,
				method: method,
				url: url,
				cache: false,
				success: function () {
					window.location.href = window.location.href;
				}
			});
		}
	}, 400);
};