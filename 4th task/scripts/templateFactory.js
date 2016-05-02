'use strict';
var NewsTemplate = require('./newsTemplate.js');

module.exports = class TemplateFactory {
	create(what){
		if(what === 'standart'){
			return new NewsTemplate();
		}
	}

}