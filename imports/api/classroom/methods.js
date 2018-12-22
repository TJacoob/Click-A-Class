import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Classroom } from './classroom.js';
import { Teacher } from '/imports/api/teacher/teacher.js';

Meteor.methods({

	newClassroom: function(serial){
		// If no classroom associated with this serial exists
		//console.log("SERIAL: " + serial);
		let c = Classroom.findOne({"serial":serial});
		let number =  Classroom.find({}).count() ;
		if ( c == undefined )		
		{
			let cr = {
				"raspberrySerial":serial,
				"number":number,
				"password": generatePassword(),
				"teachers": [],
			};
			Classroom.insert(cr);
		}
		else
			throw new Meteor.Error('already-exists', "There's already a classroom associated with that serial number");	
	},

	associateTeacher: function(password){
		let cr = Classroom.findOne({"password":password});
		let teacher = Teacher.findOne({"user":this.userId});
		if ( ! this.userId )
			throw new Meteor.Error('not-loggedin', "Only logged users can perform this action");
		else if ( teacher == undefined )
			throw new Meteor.Error('no-profile', "User doesn't have a teacher profile");
		else if ( cr == undefined )
			throw new Meteor.Error('wrong-password', "Password doesn't match any classroom");
		else if ( cr.teachers.indexOf(teacher._id) > -1 )
			throw new Meteor.Error('already-associated', "This teacher is already associated with this room");
		else
		{
			// Associate Teacher with this classroom
			Classroom.update(cr._id,{$push:{"teachers":teacher._id}});
		}
			
	},

	editClassroom: function(doc){
		let teacher = Teacher.findOne({"user":this.userId});
		let cr = Classroom.findOne({"_id":doc._id});
		// User must own the class it's updating
		if ( cr.teachers.indexOf(teacher._id) > -1 )
			Classroom.update(doc._id,doc.modifier);
		else
			throw new Meteor.Error('not-owner', "User can't edit this classroom");
	},

});


function generatePassword(){
	// For testing purposes this password is a simple number
	// that increases with every new device
	let number = parseInt(Classroom.find({}).count());
	let pass = 1000+number;
	return pass + "";
};