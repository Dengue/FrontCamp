var imageURL = require("./dist/opening.png");
var box = document.getElementById('box');
var overlay = document.getElementById('overlay');

box.querySelector('img').src = imageURL;
box.addEventListener('click',function(e){
 			overlay.classList.add('hide');
 				require(["./scripts/script.js", "./styles/style.css"], function(Start, style) {
					overlay.style = 'display:none;'
					new Start();
				});
 		});