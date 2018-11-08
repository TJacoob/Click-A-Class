import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Teacher = new Mongo.Collection( 'teacher' );

TeacherSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	nicknames:{
        type: Array,
        label:"Nicknames",
    },
    "nicknames.$": {
        type: Object,
    },
    "nicknames.$.nick": {
        type: String,
    },
    "nicknames.$.room": {
       type: String,
    }, 
});

Teacher.attachSchema( TeacherSchema ); 