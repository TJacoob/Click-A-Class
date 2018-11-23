import './allQuestion.html';

import { Question } from '/imports/api/question/question.js';
import { Quiz } from '/imports/api/quiz/quiz.js';
import { Teacher } from '/imports/api/teacher/teacher.js';

Template.allQuestion.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('question.all');
	});
});

Template.allQuestion.onCreated(function(){
	this.subjectFilter = new ReactiveVar( null );
});
	
Template.allQuestion.helpers({
	Question(){
		return Question;
	},
	allQuestion(){
		return Question.find();
	},
	questionsAvailable(){
		/*
		let selected = Quiz.findOne({"number":parseInt(FlowRouter.getParam('number'))}).questions;
		*/
		let filter = Template.instance().subjectFilter.get();
		
		if ( filter != null )
			return Question.find({"subject":filter});
		else
			return Question.find({},{sort:{"subject":1}});
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

Template.allQuestion.events({
	'click #see-question': function(){
		FlowRouter.go("/question/show/"+this.number);
	},
	'click #add-question': function(){
		FlowRouter.go("/question/add");
	},
	'click #edit-question': function(){
		FlowRouter.go("/question/edit/"+this.number);
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