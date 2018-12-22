import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Quiz } from './quiz.js';

import { Teacher } from '/imports/api/teacher/teacher.js';

Meteor.methods({

	newQuiz: function(doc){		

		let teacher = Teacher.findOne({"user":this.userId});
		console.log(teacher);
		if ( this.userId )
		{
			let number = Quiz.find({}).count();
			let quiz = {
				"number": parseInt(number),
				"owner": teacher._id,
				"title": doc.title,
				"desc": doc.desc,
				"questions": []
			};
			Quiz.insert(quiz);
			return quiz;
		}
		else
			throw new Meteor.Error('not-logged', "Must login to perform this");
	},

	editQuiz: function(doc){
		let teacher = Teacher.findOne({"user":this.userId});
		let q = Quiz.findOne({"$and":[{"_id":doc._id},{"owner":teacher._id}]});
		// User must own the class it's updating
		if ( q != undefined )
			Quiz.update(doc._id,doc.modifier);
		else
			throw new Meteor.Error('not-owner', "User can't edit this class");
	},
	
});
