import './currentLesson.html';

import { Teacher } from '/imports/api/teacher/teacher.js';
import { Lesson } from '/imports/api/lesson/lesson.js';

Template.currentLesson.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("teacher.own");
		self.subscribe("lesson.own.current");
	});
});

Template.currentLesson.helpers({
	Lesson(){
		return Lesson;
	},
	currentLesson(){
		return Lesson.findOne({"$and":[{"teacher":Meteor.userId()},{"state":"on"}]})
	},
});

Template.currentLesson.events({
	
});
