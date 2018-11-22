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
	'click #turmas': function( event, template ) {
		FlowRouter.go("ShowClass")
	},
	'click #salas': function( event, template ) {
		FlowRouter.go("AllClassroom")
	},
	'click #perfil': function( event, template ) {
		FlowRouter.go("ShowTeacher")
	},
	'click #perguntas': function( event, template ) {
		//FlowRouter.go("Question")
		alert("not ready");
	},
	'click #quizes': function( event, template ) {
		alert("not ready");
		//FlowRouter.go("ShowTeacher")
	},
});
