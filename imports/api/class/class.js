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
	},
	'students.$': { type: String },
	notes: {
		type: String,
		optional:true,
		autoform:
		{
			rows:4,
		},
	},
});

Class.attachSchema( ClassSchema ); 