import './showTeacher.html'

import { Teacher } from '/imports/api/teacher/teacher.js';

Template.showTeacher.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("teacher.own");
	});
});

Template.showTeacher.helpers({
	teacher(){
		return Teacher.findOne({"user":Meteor.userId()});
	},
	username(){
		return Meteor.users.findOne({"_id":Meteor.userId()}).username;
	}
});

Template.showTeacher.events({
	'click #edit-teacher': function(){
		FlowRouter.go("/teacher/edit");
	},
});