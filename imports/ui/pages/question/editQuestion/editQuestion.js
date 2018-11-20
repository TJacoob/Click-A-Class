import './editQuestion.html'

import { Question } from '/imports/api/question/question.js';

Template.editQuestion.onRendered(function(){
	var self = this;
	self.autorun(function(){
		var number = parseInt(FlowRouter.getParam('number'));
		self.subscribe('question.single', number);
	});
});

Template.editQuestion.helpers({
	Question(){
		return Question;
	},
	currentQuestion(){
		return Question.findOne({"number":parseInt(FlowRouter.getParam('number'))});
	},
});

Template.editQuestion.events({
	
});


AutoForm.addHooks(['editQuestion'],{
	onSuccess: function(formType, result) {
		alert("Question edited successfuly");
	}
});