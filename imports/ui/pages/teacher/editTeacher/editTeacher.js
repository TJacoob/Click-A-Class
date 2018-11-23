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
	'click #go-back-2': function(){
		FlowRouter.go("/teacher");
	},
});

AutoForm.addHooks(['editTeacher'],{
	onSuccess: function(formType, result) {
		FlowRouter.go("/teacher/show");
		//alert("Teacher edited successfuly");
	}
});