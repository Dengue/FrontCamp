'use strict'

describe('news reader', function(){
  	let categoryPanel,
  		news,
  		observer = {},
  		catCtrl,
  		newsTemplate,
  		newReader;

  	beforeEach(() => {
  		news = document.createElement('div');
  		news.id = '#news';
  		categoryPanel = document.createElement('div');
  		news.id = '#category-panel';
  		categoryPanel.innerHTML = `<div class="input"></div>
  									<div class="categories">
  									</div>`;
  		observer = new Observer();

		catCtrl = new CategoryCtrl(categoryPanel,observer);
		newsTemplate = new NewsTemplate();
		newReader = new NewsReader(news,newsTemplate,observer);
  	});
  	it('all instances should be defined',function(){
  		expect(observer).toBeDefined();
  		expect(catCtrl).toBeDefined();
  		expect(newsTemplate).toBeDefined();
  		expect(newReader).toBeDefined();
  	});
  	it('views to be defined',function(){
  		expect(catCtrl.view).toBeDefined();
  		expect(newReader.view).toBeDefined();
  	});
  	
  	it('observers should be equal', function(){
    	expect(newReader.observer).toEqual(catCtrl.observer);
  	});
  	it('observer should have listeners', function(){
    	expect(newReader.observer.listeners.size).toBeGreaterThan(0);
  	});
  	it('getUrl should return a string', function(){
  		expect(newReader.getUrl('','','')).toEqual(jasmine.any(String));
  	});
  	it('after ajax updateView should be called', function(){
  		spyOn(newReader,'updateView');
  		newReader.observer.emit('update-news',document.createElement('div'));
  		expect(newReader.updateView).toHaveBeenCalled;
  	});
  	it('should call ajax request on categore changed', function(){
  		spyOn(newReader,'fetchNews');
  		catCtrl.observer.emit('category-changed','home');
  		expect(newReader.fetchNews).toHaveBeenCalled;
  	});
});