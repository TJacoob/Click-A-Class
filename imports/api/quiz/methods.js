import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Quiz } from './quiz.js';


Meteor.methods({

	newQuiz: function(){		

		let quiz = {
			
		};
		
		Quiz.insert(quiz);
	},
	
});
