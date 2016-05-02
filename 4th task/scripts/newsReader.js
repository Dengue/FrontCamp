module.exports = class NewsReader {
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
}