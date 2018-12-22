import './showClass.html';

import { Class } from '/imports/api/class/class.js';
import { Student } from '/imports/api/student/student.js';
import { Question } from '/imports/api/question/question.js';

Template.showClass.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var number = parseInt(FlowRouter.getParam('number'));
		self.subscribe('class.own.single', number);
		self.subscribe('student.all.class', number);
		self.subscribe('question.all');
	});
});

Template.showClass.helpers({
	Class(){
		return Class;
	},
	currentClass(){
		return Class.findOne({"number":parseInt(FlowRouter.getParam('number'))});
	},
	studentInfo(s){
		//console.log(s);
		return Student.findOne({"number":s});
	},
	acerto(){
		//console.log(this);
		let total = this.rightAnswer.length + this.wrongAnswer.length ;
		//console.log(total);
		return parseInt((this.rightAnswer.length/total)*100);
	},
	favorite(){
		let subjects = {'history':0,'maths':0,'science':0,'literature':0};
		let list = this.rightAnswer;
		list.forEach(function(q){
			let question = Question.findOne({"number":q});
			subjects[question.subject] += 1;
			//console.log(subjects);
			//topics.push(question.)
		})
		return Object.keys(subjects).reduce((a, b) => subjects[a] > subjects[b] ? a : b);
	},
	hated(){
		let subjects = {'history':0,'maths':0,'science':0,'literature':0};
		let list = this.rightAnswer;
		list.forEach(function(q){
			let question = Question.findOne({"number":q});
			subjects[question.subject] += 1;
			//console.log(subjects);
			//topics.push(question.)
		})
		return Object.keys(subjects).reduce((a, b) => subjects[a] < subjects[b] ? a : b);
	},
	subjectIcon(sub)
	{
		if ( sub == 'history') return "fas fa-landmark";
		if ( sub == 'science') return "fas fa-flask";
		if ( sub == 'maths') return "fas fa-calculator";
		if ( sub == 'literature') return "fas fa-book";
	},
});

Template.showClass.events({
	'click #edit-class': function(){
		FlowRouter.go("/class/edit/"+parseInt(FlowRouter.getParam('number')));
	},
	'click #go-back': function(){
		FlowRouter.go("/class/show");
	},
});
