import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Teacher } from './teacher.js';


Meteor.methods({

	newTeacher: function(userId){
		//let userId = this.userId;
		if ( Teacher.findOne({"user":userId}) == undefined )		// This user doesn't have a teacher profile associated
		{
			let t = {
				"user": userId,
				//"nicknames":[{"test":"test"},{"test2":"test2"}],
				"nicknames":[],
				"classes": [],
			};
			Teacher.insert(t);
			console.log("Associated a new Teacher profile with the user: "+t.user);
		}
	},

	editTeacher: function(doc)
	{
		let teacher = Teacher.findOne({"_id":doc._id});
		// User must own the profile it's updating
		if ( this.userId != teacher.user )
			throw new Meteor.Error('not-owner', "User doesn't own this profile");
		else
		{
			Teacher.update(doc._id,doc.modifier);
		}
	},

});
