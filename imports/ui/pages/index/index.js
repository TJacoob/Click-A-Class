import '../../stylesheets/main.scss';
import './index.html'

Template.index.onRendered(function(){
	var self = this;
	self.autorun(function(){
		if ( !Meteor.userId() )
			FlowRouter.go("Login");
	});
});