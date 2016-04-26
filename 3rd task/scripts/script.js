var Observer = require('./observer.js');
var CategoryCtrl = require('./categoryController.js');
var NewsTemplate = require('./newsTemplate.js');
var NewsReader = require('./newsReader.js');



module.exports = class Start {
	constructor(){
		window.Globals = window.Globals || {};
		window.Globals.observer = new Observer();

		var catCtrl = new CategoryCtrl('#category-panel');
		var newsTemplate = new NewsTemplate();
		var newReader = new NewsReader('#news',newsTemplate);
	}
}