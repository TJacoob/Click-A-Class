import './classrooms.html'

import { Classroom } from '/imports/api/classroom/classroom.js';

Template.test_classrooms.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("classroom.all");
	});
});

Template.test_classrooms.helpers({
	Classroom(){
		return Classroom.find({});
	},
});

Template.test_classrooms.events({
	
});