import './editQuiz.html';

import { Quiz } from '/imports/api/quiz/quiz.js';
import { Teacher } from '/imports/api/teacher/teacher.js';

Template.editQuiz.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var number = parseInt(FlowRouter.getParam('number'));
		self.subscribe('quiz.own.single', number);
	});
});

Template.editQuiz.helpers({
	Quiz(){
		return Quiz;
	},
	currentQuiz(){
		return Quiz.findOne({"number":parseInt(FlowRouter.getParam('number'))});
	},
});

Template.editQuiz.events({
	'click #edit-questions': function(){
		var number = parseInt(FlowRouter.getParam('number'));
		FlowRouter.go("/quiz/edit/"+number+"/questions");
	},
});


AutoForm.addHooks(['editQuiz'],{
	onSuccess: function(formType, result) {
		alert("Quiz edited successfuly");
	}
});
