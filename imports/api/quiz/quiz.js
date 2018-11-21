import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

import { Question } from '/imports/api/question/question.js';

export const Quiz = new Mongo.Collection( 'quiz' );

Quiz.allow({
  insert() { return false; },
  update() { return true; },
  remove() { return false; },
});

QuizSchema = new SimpleSchema({
	number: {
		type: Number,
		label: "Number",
		optional: true,
	},
	owner: {
		type: String,
		label: "Number",
		optional: true,
	},
	title: {
		type: String,
		label: "Title"
	},
	desc: {
		type: String,
		label: "Description"
	},
	questions: {
		type: Array,
		optional: true,
	},
	'questions.$': { type: Number },
});

Quiz.attachSchema( QuizSchema ); 