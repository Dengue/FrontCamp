'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewsTemplate = function () {
	function NewsTemplate() {
		(0, _classCallCheck3.default)(this, NewsTemplate);
	}

	(0, _createClass3.default)(NewsTemplate, [{
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