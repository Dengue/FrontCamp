var Globals = Globals || {};

Globals.observer = new Observer();

var catCtrl = new CategoryCtrl('#category-panel');

var newsTemplate = new NewsTemplate();
var newReader = new NewsReader('#news',newsTemplate);
