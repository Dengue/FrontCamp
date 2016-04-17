class NewsTemplate {
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