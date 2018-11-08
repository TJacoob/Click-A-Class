import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Lesson = new Mongo.Collection( 'lesson' );

// The goal of this object is to isolate a lesson ("class") form the remaining objects
// It requires the room it's taking place, the teacher and the students in it

LessonSchema = new SimpleSchema({
	state: {			// State of class, "on", "off", "quiz", "questions", "break", ...
		type: String,
		label: "State"
	},
	classroom: {
		type: String,
		label: "Lessonroom"
	},
	teacher: {
		type: String,
		label: "Teacher"
	},
	class: {
		type: String,
		label: "Class"
	},
	/* 	Future:
		- Quizzes / Activities
	*/

});

Lesson.attachSchema( LessonSchema ); 