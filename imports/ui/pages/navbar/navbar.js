import '../../stylesheets/main.scss';
import './navbar.html'


Template.navbar.onRendered(function() {

	var header = document.getElementById("myHeader");
	var sticky = header.offsetTop;

	window.onscroll = function() {myFunction()};

	function myFunction() {

	if (window.pageYOffset > sticky) {
	    header.classList.add("sticky");
	}	else {
		header.classList.remove("sticky");
		}
	}
});