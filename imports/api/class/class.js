import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
import { Student } from '/imports/api/student/student.js';

export const Class = new Mongo.Collection( 'class' );

ClassSchema = new SimpleSchema({
	number: {
		type: Number,
		autoform: { omit:true },
    	optional: true,
	},
	name: {
		type: String,
	},
	students: {
		type: Array,
		optional: true,
		//minCount:1,
	},
	'students.$': { type: Number },
	notes: {
		type: String,
		optional:true,
	},
});

Class.attachSchema( ClassSchema ); 