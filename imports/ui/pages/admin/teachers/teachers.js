import './teachers.html'

import { Teacher } from '/imports/api/teacher/teacher.js';

Template.test_teachers.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("teacher.all");
	});
});

Template.test_teachers.helpers({
	teacher(){
		return Teacher.find({});
	},
});

Template.test_teachers.events({
	
});