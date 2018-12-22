import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Student = new Mongo.Collection( 'student' );

Student.allow({
  insert() { return false; },
  update() { return true; },
  remove() { return false; },
});

StudentSchema = new SimpleSchema({
	name: { 
		type: String,
		autoform: {
			placeholder:"Nome do Aluno",
			//type: "afInputField",
		},
	},
	number: {
		type: Number,
		autoform: {
			placeholder:"Numero",
			//type: "afInputField",
		},
		optional: true,
	},
	class: {
		type: Number,
		autoform: {
			omit: true,
		},
		optional: true,
	},
	rightAnswer: {
		type: Array,
		optional: true,
	},
	'rightAnswer.$': { type: Number },
	wrongAnswer: {
		type: Array,
		optional: true,
	},
	'wrongAnswer.$': { type: Number },
});

Student.attachSchema( StudentSchema ); 