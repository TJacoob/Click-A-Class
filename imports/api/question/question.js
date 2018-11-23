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
		allowedValues: ['history', 'maths', 'science', 'literature'],
		label: "Subject",
		autoform: {
			options: [
				{label: "História", value: "history"},
				{label: "Matemática", value: "maths"},
				{label: "Ciências", value: "science"},
				{label: "Letras", value: "literature"},
			]
		},
	},
	question: {
		type: String,
		label: "Question",
	},
	answers: {
		type: Array,
		label: "Answers",
		optional: true,
		minCount: 3,
		maxCount: 3,
	},
	'answers.$': { type: String },
	correct: {
		type: String,
		allowedValues: ["ButtonSingleClick","ButtonDoubleClick","ButtonHold"],
		label: "Correct Answer",
		autoform: {
			options: [
				{label: "A", value: "ButtonSingleClick"},
				{label: "B", value: "ButtonDoubleClick"},
				{label: "C", value: "ButtonHold"},
			]
		},
	}
	/*

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
	*/
});

Question.attachSchema( QuestionSchema ); 