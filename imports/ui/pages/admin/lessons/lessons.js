import './lessons.html';

import { Lesson } from '/imports/api/lesson/lesson.js';

Template.test_lessons.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("lesson.all");
	});
});

Template.test_lessons.helpers({
	Lesson(){
		return lesson.find({});
	},
});

Template.test_lessons.events({
	
});