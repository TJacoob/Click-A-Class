import { Meteor } from 'meteor/meteor';
import { Quiz } from '../quiz.js';

Meteor.publish('quiz.all', function () {
	return Quiz.find();
});
