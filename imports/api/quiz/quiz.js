import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

import { Question } from '/imports/api/question/question.js';

export const Quiz = new Mongo.Collection( 'quiz' );

QuizSchema = new SimpleSchema({
	number: {
		type: Number,
		label: "Number",
	},
	owner: {
		type: String,
		label: "Number",
	},
	desc: {
		type: String,
		label: "Description"
	},
	questions: {
		type: Array,
	},
	'questions.$': { type: Question },
});

Quiz.attachSchema( QuizSchema ); 