import { Meteor } from 'meteor/meteor';
import { Question } from '../question.js';

Meteor.publish('question.all', function () {
	return Question.find();
});

Meteor.publish('question.single', function (number) {
	return Question.find({"number":number});
});