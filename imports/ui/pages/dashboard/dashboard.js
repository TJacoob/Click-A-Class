import './dashboard.html'

import { Class } from '/imports/api/class/class.js';
import { Classroom } from '/imports/api/classroom/classroom.js';
import { Quiz } from '/imports/api/quiz/quiz.js';
import { Teacher } from '/imports/api/teacher/teacher.js';
import { Lesson } from '/imports/api/lesson/lesson.js';


Template.dashboard.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('teacher.own');
		self.subscribe('class.own');
		self.subscribe('classroom.own');
		self.subscribe('quiz.own');
		self.subscribe('lesson.own.current');
	});
});

Template.dashboard.helpers({
	Class(){
		return Class;
	},
	currentClass(){
		return Class.findOne({"number":parseInt(FlowRouter.getParam('number'))});
	},
	noProfile(){
		let t = Teacher.findOne({"user":Meteor.userId()});
		return ( t.name == undefined || t.school == undefined || t.subject == undefined  );
	},
	noClass(){
		return ( Class.findOne() == undefined );
	},
	noClassroom(){
		return ( Classroom.findOne() == undefined );
	},
	noQuiz(){
		return ( Quiz.findOne() == undefined );
	},
	isReady(){
		return ( Class.findOne() != undefined && Classroom.findOne() != undefined )
	},
	lessonGoingOn(){
		return ( Lesson.find({"state":{"$ne":"finished"}}).count() > 0);
	},
});

Template.dashboard.events({
	'click #start-lesson': function( event, template ) {
		FlowRouter.go("NewLesson")
	},
	'click #add-class': function( event, template ) {
		FlowRouter.go("AddClass")
	},
	'click #edit-quiz': function( event, template ) {
		FlowRouter.go("EditQuiz")
	},
	'click #add-classroom': function( event, template ) {
		FlowRouter.go("AddClassroom")
	},
	'click #see-profile': function(){
		FlowRouter.go("/teacher");
	},
	'click #see-class': function(){
		FlowRouter.go("/class/show");
	},
	'click #see-quiz': function(){
		FlowRouter.go("/quiz/show");
	},
	'click #retake-lesson': function(){
		FlowRouter.go("/lesson/current");
	},
	
});
