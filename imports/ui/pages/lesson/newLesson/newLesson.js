import './newLesson.html';

import { Lesson } from '/imports/api/lesson/lesson.js';

Template.newLesson.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("teacher.own");
		self.subscribe("class.own");
		self.subscribe("classroom.own");
	});
});

Template.newLesson.helpers({
	Lesson(){
		return Lesson;
	},
});

Template.newLesson.events({
	
});


AutoForm.addHooks(['newLesson'],{
	onSuccess: function(formType, result) {
		FlowRouter.go("CurrentLesson");
		alert("Lesson added successfuly");
	}
});