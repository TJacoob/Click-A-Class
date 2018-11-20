import '../../stylesheets/main.scss';
import './not_found.html'

Template.not_found.events({
	'click #go-back': function( event, template ) {
		FlowRouter.go("Index")
	},
	
});