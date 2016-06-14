var Globals = Globals || {};



document.addEventListener("DOMContentLoaded", function(event) {
    var observer = new Observer();

	var catCtrl = new CategoryCtrl('#category-panel',observer);
	var newsTemplate = new NewsTemplate();
	var newReader = new NewsReader('#news',newsTemplate,observer);
});