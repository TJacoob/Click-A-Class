import '../../stylesheets/main.scss';
import './login.html';

Template.login.events({
	'click #button': function( event, template ) {
		FlowRouter.go("Index")
	}
	
});