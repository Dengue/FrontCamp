var Observer = require('./observer.js');
var CategoryCtrl = require('./categoryController.js');
var TemplateFactory = require('./templateFactory.js')
var NewsReader = require('./newsReader.js');



module.exports = class Start {
	constructor(){
		window.Globals = window.Globals || {};
		window.Globals.observer = new Observer();

		var catCtrl = new CategoryCtrl('#category-panel');
		var templateFactory = new TemplateFactory();
		var standartTemplate = templateFactory.create('standart');
		var newReader = new NewsReader('#news',standartTemplate);
	}
}