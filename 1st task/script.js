var Globals = Globals || {};



document.addEventListener("DOMContentLoaded", function(event) {
    Globals.observer = new Observer();

	var catCtrl = new CategoryCtrl('#category-panel');
	var newsTemplate = new NewsTemplate();
	var newReader = new NewsReader('#news',newsTemplate);
});