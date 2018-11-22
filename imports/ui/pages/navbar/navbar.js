import '../../stylesheets/main.scss';
import './navbar.html'


Template.navbar.onRendered(function() {

	var header = document.getElementById("myHeader");
	var sticky = header.offsetTop;

	window.onscroll = function() {myFunction()};

	function myFunction() {

	//console.log(window.pageYOffset);
	//console.log(sticky);

	if (window.pageYOffset >= (sticky-1)) {
	    header.classList.add("fixed-top");
	    $("#headerReplacer").show();
	}	else {
		header.classList.remove("fixed-top");
		$("#headerReplacer").hide();
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