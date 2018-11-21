import './editQuizQuestions.html';

import { Quiz } from '/imports/api/quiz/quiz.js';
import { Teacher } from '/imports/api/teacher/teacher.js';
import { Question } from '/imports/api/question/question.js';

Template.editQuizQuestions.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var number = parseInt(FlowRouter.getParam('number'));
		self.subscribe('quiz.own.single', number);
		self.subscribe('question.all');
	});
});

Template.editQuizQuestions.onCreated(function(){
	this.subjectFilter = new ReactiveVar( null );
});

Template.editQuizQuestions.helpers({
	Quiz(){
		return Quiz;
	},
	currentQuiz(){
		return Quiz.findOne({"number":parseInt(FlowRouter.getParam('number'))});
	},
	questionsAvailable(){
		let selected = Quiz.findOne({"number":parseInt(FlowRouter.getParam('number'))}).questions;
		let filter = Template.instance().subjectFilter.get();
		if ( filter != null )
			return Question.find({"$and":[{"subject":filter},{"number":{"$nin":selected}}]});
		else
			return Question.find({"number":{"$nin":selected}},{sort:{"subject":1}});
	},
	questionInfo(number)
	{
		return Question.findOne({"number":number});
	},
	subjectIcon(sub)
	{
		if ( sub == 'history') return "fas fa-landmark";
		if ( sub == 'science') return "fas fa-flask";
		if ( sub == 'maths') return "fas fa-calculator";
		if ( sub == 'literature') return "fas fa-book";
	},
	subjectAvailable(){
		let subs = []
		let questions = Question.find({});
		questions.forEach(function(q){
			if ( subs.indexOf(q.subject) == -1 )
				subs.push(q.subject);
		});
		return subs;
	},
	isActiveFilter(){
		let subject = String(this);
		let filter = Template.instance().subjectFilter.get();
		if ( filter == subject )
			return "isActiveFilter";
	}
});

Template.editQuizQuestions.events({
	'click #return-edit': function(){
		var number = parseInt(FlowRouter.getParam('number'));
		FlowRouter.go("/quiz/edit/"+number);
	},
	'click .questionHolder': function(){
		let q = Quiz.findOne({"number":parseInt(FlowRouter.getParam('number'))});
		if ( q.questions.indexOf(this.number) > -1 )
			Quiz.update({"_id":q._id},{"$pull":{"questions":this.number}});
		else
			Quiz.update({"_id":q._id},{"$push":{"questions":this.number}});
	},
	'click .subjectOption': function(){
		let subject = String(this);
		let filter = Template.instance().subjectFilter.get();
		if ( filter == subject )
			Template.instance().subjectFilter.set(null);
		else
			Template.instance().subjectFilter.set(subject);
	},
});

/*
AutoForm.addHooks(['editQuiz'],{
	onSuccess: function(formType, result) {
		alert("Quiz edited successfuly");
	}
});
*/
