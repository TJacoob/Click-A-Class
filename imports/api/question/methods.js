import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Question } from './question.js';
import { Teacher } from '/imports/api/teacher/teacher.js';

Meteor.methods({

	newQuestion: function(doc){		

		let number = Question.find({}).count();
		let t = Teacher.findOne({"user": this.userId});
		//console.log(doc.subject);
		//let subject = doc.subject[0].split(",");
		let question = {
			"number": parseInt(number),
			//"subject": doc.subject,
			"subject": doc.subject,
			"question": doc.question,
			"answers": doc.answers,
			"correct": doc.correct,
			"votes": 0,
			"upvotesUsers": [],
			"downvotesUsers": [],
			"owner": t._id,
			"favoriteUsers": [],
		};
		
		Question.insert(question);
	},

	editQuestion: function(doc){
		Question.update(doc._id,doc.modifier);
	},

	toggleUpvote: function(number){
		let q = Question.findOne({"number":number});
		let t = Teacher.findOne({"user": this.userId});
		// If user is not on the upvote list, add him, if he already is, remove him
		if ( q.upvotesUsers.indexOf( t._id ) == -1 )
		{
			Question.update(q._id,{"$push":{"upvotesUsers":t._id}});
			Question.update(q._id,{"$set":{"votes":q.votes+1}});
		}
		else
		{
			Question.update(q._id,{"$pull":{"upvotesUsers":t._id}});
			Question.update(q._id,{"$set":{"votes":q.votes-1}});
		}
	},

	toggleDownvote: function(number){
		let q = Question.findOne({"number":number});
		let t = Teacher.findOne({"user": this.userId});
		// If user is not on the downvote list, add him, if he already is, remove him
		if ( q.downvotesUsers.indexOf( t._id ) == -1 )
		{
			Question.update(q._id,{"$push":{"downvotesUsers":t._id}});
			Question.update(q._id,{"$set":{"votes":q.votes-1}});
		}
		else
		{
			Question.update(q._id,{"$pull":{"downvotesUsers":t._id}});
			Question.update(q._id,{"$set":{"votes":q.votes+1}});
		}
	},

	toggleFavorite: function(number)
	{
		let q = Question.findOne({"number":number});
		let t = Teacher.findOne({"user": this.userId});
		if ( q.favoriteUsers.indexOf( t._id ) == -1 )
			Question.update(q._id,{"$push":{"favoriteUsers":t._id}});
		else
			Question.update(q._id,{"$pull":{"favoriteUsers":t._id}});
	},

});
