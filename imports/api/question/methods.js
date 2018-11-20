import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Question } from './question.js';

Meteor.methods({

	newQuestion: function(doc){		

		let number = Question.find({}).count();
		//let subject = doc.subject.split(" ");
		let question = {
			"number": parseInt(number),
			"subject": doc.subject,
			"question": doc.question,
			"answerSingle": doc.answerSingle,
			"answerDouble": doc.answerDouble,
			"answerHold": doc.answerHold,
		};
		
		Question.insert(question);
	},

	editQuestion: function(doc){
		Question.update(doc._id,doc.modifier);
	},

});
