import './currentLesson.html';

import { Teacher } from '/imports/api/teacher/teacher.js';
import { Lesson } from '/imports/api/lesson/lesson.js';
import { Class } from '/imports/api/class/class.js';
import { Click } from '/imports/api/click/click.js';

Template.currentLesson.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("teacher.own");
		self.subscribe("lesson.own.current");
		self.subscribe("classroom.own");
		self.subscribe("class.own");
		self.subscribe("click.all");
	});
});

Template.currentLesson.helpers({
	Lesson(){
		return Lesson;
	},
	currentLesson(){
		let t = Teacher.findOne({"user":Meteor.userId()});
		if ( t != undefined )
			return Lesson.findOne({"$and":[{"teacher":t._id},{"state":{"$ne":"off"}}]});
	},
	classObject(){
		let t = Teacher.findOne({"user":Meteor.userId()});
		if ( t != undefined )
		{
			let l = Lesson.findOne({"$and":[{"teacher":t._id},{"state":{"$ne":"off"}}]});
			if ( l != undefined )
				return Class.findOne({"number":l.class});
		}
	},
	teacherName(){
		return Teacher.findOne({"_id":this.teacher}).name;
	},
	className(){
		return Class.findOne({"number":this.class}).name;
	},
});

Template.currentLesson.events({
	
});

// Flic Association
Template.flicAssociation.onCreated(function(){
	this.waitingClick = new ReactiveVar(true);
	this.lessonNumber = new ReactiveVar(this.data.lesson);
});

Template.flicAssociation.helpers({
	emptyAssociation(){
		let list = Lesson.findOne({"number":this.lesson}).association;
		let empty = [];
		list.forEach(function(student){
			if ( student.mac == null )
				empty.push(student.student);
		})
		return empty[0];
	},
	waitingClick(){
		let student = String(this);
		let c = Template.instance().waitingClick.get();
		let click = Click.findOne({});
		let macUsed = false;
		if ( c )
		{
			if ( click != undefined )
				Template.instance().waitingClick.set(false);
			else 
				return true;
		}
		else
		{
			// Must check if mac has not been used yet
			let l = Lesson.findOne({"number":Template.instance().lessonNumber.get()});
			let a = l.association;
			a.forEach(function(as){
				if ( as.mac == click.mac )
					macUsed = true;
			})
			if ( ! macUsed )
			{
				a.forEach(function(as, index){
					if ( as.student == student )
					{
						as.mac = click.mac;
						a[index] = as ;
					}
				})
				Lesson.update({"_id":l._id},{"$set":{"association":a}});
			}
			Click.remove({"_id":click._id});
			Template.instance().waitingClick.set(true);
		}
	},
	associated(){
		let list = Lesson.findOne({"number":this.lesson}).association;
		let associated = [];
		list.forEach(function(student){
			if ( student.mac != null )
				associated.push(student.student);
		})
		return associated;
	},
});

Template.flicAssociation.events({
	'click #mark-absent': function(){
		let student = this;
		let l = Lesson.findOne({"number":Template.instance().lessonNumber.get()});
		let a = l.association;
		a.forEach(function(as, index){
			if ( as.student == student )
			{
				a.splice(index, 1);
			}
		})
		Lesson.update({"_id":l._id},{"$set":{"association":a}});
	},
	'click #redo-student': function(){
		let student = this;
		let l = Lesson.findOne({"number":Template.instance().lessonNumber.get()});
		let a = l.association;
		a.forEach(function(as, index){
			if ( as.student == student )
			{
				as.mac = null;
				a[index] = as ;
			}
		})
		Lesson.update({"_id":l._id},{"$set":{"association":a}});	
	},
});

//var x = Template.instance().templateDictionary.get('showExtraFields');
//console.log(x);

/*
waitingClick(){
		let lesson = Lesson.findOne({"number": this.lesson})
		let c = Template.instance().waitingClick.get();
		let action = true;
		let click = Click.findOne({});
		if ( c )
		{
			if ( click != undefined )
				Template.instance().waitingClick.set(false);
			else 
				return true;
		}
		else
		{	
			let association = lesson.association;
			association.forEach(function(pair){
				if(pair["mac"] == click.mac )
				{
					console.log("Same Mac");
					action = false;
				}
			})
			if ( action )
			{
				Meteor.call('associateMac', Session.get('student'), click.mac, function (err, asyncValue) {
				    if (err)
				        console.log(err);
				    else 
				    	console.log("Associated");
				        //self.myAsyncValue.set(asyncValue);
				});
				Click.remove({"_id":click._id});
				Template.instance().waitingClick.set(true);
				Template.instance().redoStudent.set(false);
				let count = Template.instance().lessonAssociation.get('counter');
				Template.instance().lessonAssociation.set('counter',count+1);
				Template.instance().lessonAssociation.set(click.mac,Session.get('student'));
			}
		}
	},
	*/