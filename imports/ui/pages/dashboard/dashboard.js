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
	'click #start-lesson': function( event, template ) {
		FlowRouter.go("NewLesson")
	},
	
});

Template.dashboard.events({
	'click #add-class': function( event, template ) {
		FlowRouter.go("AddClass")
	},
	
});


Template.dashboard.events({
	'click #start-lesson': function( event, template ) {
		FlowRouter.go("NewLesson")
	},
	
});

Template.dashboard.events({
	'click #edit-quiz': function( event, template ) {
		FlowRouter.go("EditQuiz")
	},
	
});

Template.dashboard.events({
	'click #add-room': function( event, template ) {
		FlowRouter.go("EditClass")
	},
	
});