import './editTeacher.html'

import { Teacher } from '/imports/api/teacher/teacher.js';

Template.editTeacher.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("teacher.own");
	});
});

Template.editTeacher.helpers({
	Teacher(){
		return Teacher;
	},
	currentTeacher(){
		return Teacher.findOne({"user":Meteor.userId()});
	},
});

Template.editTeacher.events({
	
});

AutoForm.addHooks(['editTeacher'],{
	onSuccess: function(formType, result) {
		alert("Teacher edited successfuly");
	}
});