import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Question = new Mongo.Collection( 'question' );

QuestionSchema = new SimpleSchema({
	number: {
		type: Number,
		label: "Number",
		optional: true,
	},
	subject: {
		type: String,
		/*
		type: Array,
		autoform:{
			minCount:1,
			maxCount:1,
			initialCount:1,
		},
		*/
		label: "Subject",
	},
	/*
	'subject.$': { type: String },
	*/
	question: {
		type: String,
		label: "Question",
	},
	answerSingle: {
		type: String,
		label: "Answer 1",
	},
	answerDouble: {
		type: String,
		label: "Answer 2",
	},
	answerHold: {
		type: String,
		label: "Answer 3",
	},
});

Question.attachSchema( QuestionSchema ); 