import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Lesson } from './lesson.js';

import { Teacher } from '/imports/api/teacher/teacher.js';

Meteor.methods({

	newLesson: function(doc){
		// Lessons can't be started if teacher is still on another one
		let teacher = Teacher.findOne({"user":this.userId});
		//let prev_lessons = Lesson.find({"teacher":teacher._id}).find({"$ne":{"state":"finished"}});
		//let prev_lesson = Lesson.findOne({"$and":[{"$ne":{"state":"finished"}},{"teacher":this.userId}]});
		let prev_lesson = Lesson.find({"$and":[{"teacher":this.userId},{"state":{"$ne":"finished"}}]});
		//console.log(prev_lesson.count());
		let active_lessons = Lesson.find({"$and":[{"classroom":doc.classroom},{"state":{"$ne":"finished"}}]})
		if ( active_lessons.count() != 0 )
			throw new Meteor.Error('classroom-in-lesson',"This classroom is busy, can't start a new class here.")
		else if ( prev_lesson.count() != 0 )
			throw new Meteor.Error('still-in-lesson',"This teacher didn't finish his previous lesson, can't start a new one.")
		else
		{
			let teacher = Teacher.findOne({"user":this.userId});
			let ls = {
				"number": Lesson.find({}).count(),
				"state": "on",
				"classroom": parseInt(doc.classroom),
				"teacher": teacher._id,
				"class": parseInt(doc.class),
				"association": [],
			};
			Lesson.insert(ls);
			console.log("Started class "+ls.number+" in classroom "+ls.classroom+" with theacher "+ls.teacher+" and class "+ls.class);
		}
			
	},

	updateAssociation: function(number, array){
		// Can't be updated by someone that not the owner
		let teacher = Teacher.findOne({"user":this.userId});
		let lesson = Lesson.findOne({"$and":[{"number":number},{"teacher":teacher._id},{"state":"association"}]});
		if ( lesson == undefined )
			throw new Meteor.Error('not-in-lesson',"You don't have a class to associate flics right now");
		else
		{
			Lesson.update({"_id":lesson._id},{"association":array});
			Lesson.update({"_id":lesson._id},{"state":"idle"});
		}
	},

	startAssociation: function(number){
		// Can't be updated by someone that not the owner
		let teacher = Teacher.findOne({"user":this.userId});
		let lesson = Lesson.findOne({"$and":[{"number":number},{"teacher":teacher._id},{"state":"on"}]});
		if ( lesson == undefined )
			throw new Meteor.Error('not-in-lesson',"You don't have a class to associate flics right now");
		else
			Lesson.update({"_id":lesson._id},{"state":"association"});
	},

	associateMac: function(student, mac){
		// Can't be updated by someone that not the owner
		let teacher = Teacher.findOne({"user":this.userId});
		let lesson = Lesson.findOne({"$and":[{"teacher":teacher._id},{"state":{"$ne":"off"}}]});
		if ( lesson == undefined )
			throw new Meteor.Error('not-in-lesson',"You don't have a class to associate flics right now");
		else
		{
			let association = lesson.association;
			association.forEach(function(pair){
				if(pair["mac"] == mac )
					throw new Meteor.Error('already-associated',"Flic already associated");
			})
			association.push({
				"mac": mac,
				"student": student
			});
			Lesson.update({"_id":lesson._id},{"$set":{"association":association}});
		}	
	},

});
