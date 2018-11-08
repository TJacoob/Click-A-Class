import { Meteor } from 'meteor/meteor';
import { Lesson } from '../lesson.js';

Meteor.publish('lesson.all', function () {
	return Lesson.find();
});
