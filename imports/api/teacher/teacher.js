import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Teacher = new Mongo.Collection( 'teacher' );

TeacherSchema = new SimpleSchema({
    user: {
        type: String,
        label: "User",
    },
	name: {
		type: String,
		label: "Name",
        optional: true,
	},
    school: {
        type: String,
        label: "School",
        optional: true,
    },
    subject: {
        type: String,
        label: "Subject",
        optional: true,
    },
	nicknames: {
        type: Array,
    },
    'nicknames.$': Object,
    'nicknames.$.nick': String,
    'nicknames.$.room': String,
    classes: {
        type: Array,
    },
    'classes.$': { type: Number },
    
});

Teacher.attachSchema( TeacherSchema ); 