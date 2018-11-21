import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Question } from './question.js';

Meteor.methods({

	newQuestion: function(doc){		

		let number = Question.find({}).count();
		//console.log(doc.subject);
		//let subject = doc.subject[0].split(",");
		let question = {
			"number": parseInt(number),
			//"subject": doc.subject,
			"subject": doc.subject,
			"question": doc.question,
			"answers": doc.answers,
			"correct": doc.correct,
		};
		
		Question.insert(question);
	},

	editQuestion: function(doc){
		Question.update(doc._id,doc.modifier);
	},

});
