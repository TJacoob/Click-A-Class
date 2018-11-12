import './editClassroom.html';

import { Classroom } from '/imports/api/classroom/classroom.js';

Template.editClassroom.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var number = parseInt(FlowRouter.getParam('number'));
		self.subscribe('classroom.single', number);
	});
});

Template.editClassroom.helpers({
	Classroom(){
		return Classroom;
	},
	currentClassroom(){
		return Classroom.findOne({"number":parseInt(FlowRouter.getParam('number'))});
	},
});

Template.editClassroom.events({
	
});


AutoForm.addHooks(['editClassroom'],{
	onSuccess: function(formType, result) {
		alert("Classroom edited successfuly");
	}
});