import '../../stylesheets/main.scss';
import './index.html'

Template.index.onRendered(function(){
	var self = this;
	self.autorun(function(){
		if ( !Meteor.userId() )
			FlowRouter.go("Login");
	});
});

Template.home.events({
	'click #log-in': function( event, template ) {
		FlowRouter.go("Login")
	},
});

Template.home.events({
	'click #sign-up': function( event, template ) {
		FlowRouter.go("Signup")
	},
});