import './addQuiz.html';

import { Quiz } from '/imports/api/quiz/quiz.js';

Template.addQuiz.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('quiz.all');
	});
});

Template.addQuiz.helpers({
	Quiz(){
		return Quiz;
	},
});

Template.addQuiz.events({
	
});


AutoForm.addHooks(['addQuiz'],{
	onSuccess: function(operation, result, template) {
      	FlowRouter.go("/quiz/edit/"+result.number+"/questions");
      	//console.log(Teams.findOne({"count":5}));
    },
});