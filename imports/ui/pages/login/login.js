import '../../stylesheets/main.scss';
import './login.html';

Template.login.onRendered(function(){
    if ( Meteor.userId() )
        FlowRouter.go("Dashboard")
})

Template.login.events({
	'click #button': function( event, template ) {
		FlowRouter.go("Index")
	},
	/*
	"submit form": function (e) {
        e.preventDefault();
        console.log
        Meteor.loginWithPassword(
            { email: $(e.target).find("#login-email").val() },
            $(e.target).find("#login-password").val(),
            function (error) {
                if (error) {
                    $("#login-password").val("");
                    $("#login-email").select();     
                    throwError("The email or password you entered is incorrect. Please try again.");                    
                } else {
                    Router.go("whereever");
                }
            }
        );
    },
	*/
});