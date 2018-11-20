import './dashboard.html'

import { Class } from '/imports/api/class/class.js';


Template.dashboard.onRendered(function(){
	var self = this;
	self.autorun(function(){

		self.subscribe('class.all');
	});
});

Template.dashboard.helpers({
	Class(){
		return Class;
	},
	currentClass(){
		return Class.findOne({"number":parseInt(FlowRouter.getParam('number'))});
	},
});

Template.dashboard.events({
	'click #next': function( event, template ) {
		FlowRouter.go("AddClass")
	},
	
});