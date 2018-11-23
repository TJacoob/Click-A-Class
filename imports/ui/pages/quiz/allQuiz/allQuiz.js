import './allQuiz.html'

import { Quiz } from '/imports/api/quiz/quiz.js';

Template.allQuiz.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('quiz.own');
	});
});

Template.allQuiz.helpers({
	Quiz(){	
		return Quiz;
	},
	allQuiz(){
		return Quiz.find();
	},
});

Template.allQuiz.events({
	'click #see-quiz': function(){
		FlowRouter.go("/quiz/show/"+this.number);
	},
	'click #add-quiz': function(){
		FlowRouter.go("/quiz/add");
	},
	'click #edit-quiz': function(){
		FlowRouter.go("/quiz/edit/"+this.number);
	},
});