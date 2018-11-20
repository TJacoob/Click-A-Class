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

Template.navbar.events({
	'click #home': function( event, template ) {
		FlowRouter.go("Dashboard")
	},
	
});

Template.navbar.events({
	'click #turmas': function( event, template ) {
		FlowRouter.go("ShowClass")
	},
	
});

Template.navbar.events({
	'click #salas': function( event, template ) {
		FlowRouter.go("ShowClassroom")
	},
	
});

Template.navbar.events({
	'click #perfil': function( event, template ) {
		FlowRouter.go("ShowTeacher")
	},
	
});