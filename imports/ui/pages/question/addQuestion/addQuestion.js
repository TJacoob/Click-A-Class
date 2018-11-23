import './addQuestion.html';

import { Question } from '/imports/api/question/question.js';

Template.addQuestion.onRendered(function(){
	var self = this;
	self.autorun(function(){
		
	});
	//$(".tags").attr('data-role', 'tagsinput');
});

Template.addQuestion.helpers({
	Question(){
		return Question;
	},
});

Template.addQuestion.events({
	'click #go-back': function(){
		FlowRouter.go("/question/all");
	},
});


AutoForm.addHooks(['addQuestion'],{
	onSuccess: function(formType, result) {
		alert("Question added successfuly");
	}
});