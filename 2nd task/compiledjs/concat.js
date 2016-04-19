'use strict';

class CategoryCtrl {
	constructor(view) {
		this.view = document.querySelector(view);
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
			this.objects[object] = this.view.querySelector(selector);
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
		Globals.observer.emit('category-changed',target.innerHTML.toLowerCase());
	}
	events () {
		var self = this;
		this.objects.controls.addEventListener('click',this.toggleShow.bind(this));
		this.objects.categories.addEventListener('mouseleave',event => this.objects.categories.classList.remove('categories-show'));
		this.objects.categories.addEventListener('click',this.changeCategory.bind(this));
	}

}import 'babel-polyfill';
'use strict';

class NewsReader {
	constructor(view,template) {
		this.view = document.querySelector(view);
		this.template = template;
		this.events();
	};
	get defaults() {
		return {
			type: 'json',
			apiKey: '0a17a254e77a1b706036d559a65f98c7:14:74945871'
		}
	};
	events() {
		Globals.observer.addListener(this,'category-changed',this.fetchNews);
		Globals.observer.addListener(this,'update-news',this.updateView);
	};
	fetchNews(category) {
		let url = this.getUrl(category,this.defaults.type,this.defaults.apiKey);
		fetch(url).then(function(response){
			return response.json();
		})
		.then(this.fillNews.bind(this));
	};
	getUrl(category,type,key) {
		return `http://api.nytimes.com/svc/topstories/v1/${category}.${type}?api-key=${key}`;
	};
	fillNews({num_results,results}) {
		if(num_results === 0){
			return;
		}
		let newsColumns = document.createElement('div');
		newsColumns.classList.add('news-columns');
		for(let event of results){
			console.log(event);
			newsColumns.innerHTML += this.template.returnEvent(event);
		}
		Globals.observer.emit('update-news',newsColumns);
	};
	updateView(news) {
		this.view.innerHTML = '';
		this.view.appendChild(news);
	} 
}class NewsTemplate {
	constructor(){}
	returnEvent (event) {
		return `<div class='event'>
					${this.returnPhoto(event.multimedia)}
					${this.returnText(event)}
				</div>
			`;
	};
	returnPhoto(multimedia) {
		let photoGroup = multimedia[2];
		if(photoGroup){
			return `<div class='photo'>
						<div class='image'><img height='127' width='190' src = ${photoGroup.url}></img></div>
						<h4 class='credit'>${photoGroup.copyright}<h4>
						<p class='caption'>${photoGroup.caption}</p>
					</div>
				`;
		}
		return '';
	};
	returnText(event) {
		return `<div class='story-header'>
					<h3 class='kicker'>${event.kicker}</h3>
					<h2><a href= ${event.url}>${event.title}</a></h2>
					<h3 class='byline'>${event.byline}</h3>
				</div>
				<p class='summery'>
					${event.abstract}
				</p>
			`;
	}
}

'use strict';
class Observer {  
    constructor() {
        this.listeners = new Map();
    }
    addListener(object, label, callback) {
        this.listeners.has(label) || this.listeners.set(label, []);
        this.listeners.get(label).push({
            context:object,
            callback:callback
        });
    }
    removeListener(object, label, callback) {
        let listeners = this.listeners.get(label),
        index;

        if (listeners && listeners.length) {
            for(index = 0; index < listeners.length; index ++){
                if(listeners[index].context === object && listeners[index].callback === callback){
                    listeners.splice(index, 1);
                    this.listeners.set(label, listeners);
                    return true;
                }
            }
        }
        return false;
    }
    emit(label, ...args) {
        let listeners = this.listeners.get(label);

        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                listener.callback.call(listener.context,...args); 
            });
            return true;
        }
        return false;
    }
}var Globals = Globals || {};



document.addEventListener("DOMContentLoaded", function(event) {
    Globals.observer = new Observer();

	var catCtrl = new CategoryCtrl('#category-panel');
	var newsTemplate = new NewsTemplate();
	var newReader = new NewsReader('#news',newsTemplate);
});