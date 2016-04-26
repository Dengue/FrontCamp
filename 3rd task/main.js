var imageURL = require("./img/opening.png");
var box = document.getElementById('box');
var overlay = document.getElementById('overlay');

box.querySelector('img').src = imageURL;
box.addEventListener('click',function(e){
 			overlay.classList.add('hide');
 			setTimeout(function(){
 				require(["./scripts/script.js", "./scripts/style.css"], function(Start, style) {
					overlay.style = 'display:none;'
					new Start();
				});
 			},500);
 		});