import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Class } from './class.js';
import { Teacher } from '/imports/api/teacher/teacher.js';
import { Student } from '/imports/api/student/student.js';

Meteor.methods({

	newClass: function(doc){	
		//console.log(doc);	
		if ( this.userId )
		{
			let number =  Class.find({}).count() ;
			//console.log(number);
			let c = {
				"number": parseInt(number),
				"name": doc.name,
				"notes": doc.notes,
				"students": [],
			};
			Class.insert(c);
			// Associate Class with the teacher that created it	
			Teacher.update({"user":this.userId},{ $push: { "classes": parseInt(number) }})
			return c;
		}
		else
			throw new Meteor.Error('not-logged', "Must be logged in to create a class");	
	},

	editClass: function(doc){
		let teacher = Teacher.findOne({"user":this.userId});
		let c = Class.findOne({"_id":doc._id});
		// User must own the class it's updating
		if ( teacher.classes.indexOf(c.number) > -1 )
			Class.update(doc._id,doc.modifier);
		else
			throw new Meteor.Error('not-owner', "User can't edit this class");
	},

	addStudent: function(doc)
	{
		let teacher = Teacher.findOne({"user":this.userId});
		let c = Class.findOne({"number":doc.class});
		if ( teacher.classes.indexOf(c.number) > -1 )
		{
			let s = {
				"number": parseInt(c.students.length + 1),
				"name": doc.name,
				"class": doc.class,
			};
			Student.insert(s);
			Class.update({"_id":c._id},{ $push: { "students": s.number }});
		}
		else
			throw new Meteor.Error('not-owner', "User can't add students to this class");
	},

});
