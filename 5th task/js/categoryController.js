'use strict';

class CategoryCtrl {
	constructor(view,observer) {
		if(typeof view === 'string'){
			this.view = document.querySelector(view);
		}
		else {
			this.view = view;
		}
		this.observer = observer;
		this.bindObject();
		this.events();

	};
	get __objects () {
		return {
			controls:'.controls',
			input:'.input',
			categories:'.categories'
		}
	};
	get options () {
		return {
			category: '.category'
		}
	};
	bindObject () {
		this.objects = {};
		for(let object in this.__objects) {
			let selector = this.__objects[object];
			if(this.view){
				this.objects[object] = this.view.querySelector(selector);
			}
		}
	};
	toggleShow (event) {
		let categories = this.objects.categories;
		if(categories.classList.contains('categories-show')){
			categories.classList.remove('categories-show');
		}
		else{
			categories.classList.add('categories-show');
		}
	};
	changeCategory ({target}) {
		if(!target.classList.contains('category')){
			return;
		}
		if(target.innerHTML === this.objects.input.innerHTML){
			return;
		}
		this.objects.input.innerHTML = target.innerHTML;
		this.observer.emit('category-changed',target.innerHTML.toLowerCase());
	}
	events () {
		var self = this;
		if(this.objects.controls && this.objects.categories) {
			this.objects.controls.addEventListener('click',this.toggleShow.bind(this));
			this.objects.categories.addEventListener('mouseleave',event => this.objects.categories.classList.remove('categories-show'));
			this.objects.categories.addEventListener('click',this.changeCategory.bind(this));
		}
	}

}