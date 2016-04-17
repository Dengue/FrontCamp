'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NewsTemplate = function () {
	function NewsTemplate() {
		_classCallCheck(this, NewsTemplate);
	}

	_createClass(NewsTemplate, [{
		key: 'returnEvent',
		value: function returnEvent(event) {
			return '<div class=\'event\'>\n\t\t\t\t\t' + this.returnPhoto(event.multimedia) + '\n\t\t\t\t\t' + this.returnText(event) + '\n\t\t\t\t</div>\n\t\t\t';
		}
	}, {
		key: 'returnPhoto',
		value: function returnPhoto(multimedia) {
			var photoGroup = multimedia[2];
			if (photoGroup) {
				return '<div class=\'photo\'>\n\t\t\t\t\t\t<div class=\'image\'><img height=\'127\' width=\'190\' src = ' + photoGroup.url + '></img></div>\n\t\t\t\t\t\t<h4 class=\'credit\'>' + photoGroup.copyright + '<h4>\n\t\t\t\t\t\t<p class=\'caption\'>' + photoGroup.caption + '</p>\n\t\t\t\t\t</div>\n\t\t\t\t';
			}
			return '';
		}
	}, {
		key: 'returnText',
		value: function returnText(event) {
			return '<div class=\'story-header\'>\n\t\t\t\t\t<h3 class=\'kicker\'>' + event.kicker + '</h3>\n\t\t\t\t\t<h2><a href= ' + event.url + '>' + event.title + '</a></h2>\n\t\t\t\t\t<h3 class=\'byline\'>' + event.byline + '</h3>\n\t\t\t\t</div>\n\t\t\t\t<p class=\'summery\'>\n\t\t\t\t\t' + event.abstract + '\n\t\t\t\t</p>\n\t\t\t';
		}
	}]);

	return NewsTemplate;
}();