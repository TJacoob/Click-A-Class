import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

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
		minCount:1,
	},
	'students.$': { type: String, autoform:{placeholder:"Nome do aluno"} },
	notes: {
		type: String,
		optional:true,
	},
});

Class.attachSchema( ClassSchema ); 