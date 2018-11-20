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
	this.lessonAssociation = new ReactiveDict();
	this.lessonAssociation.set('counter', 0 );
    this.waitingClick = new ReactiveVar(true);
    this.redoStudent = new ReactiveVar(false);
});

Template.flicAssociation.helpers({
	student(){
		let studentList = this.class.students;
		let count = Template.instance().lessonAssociation.get('counter');
		if ( count < studentList.length)
		{
			Session.set("student",studentList[count]);
			return studentList[count];
		}
	},
	hasStudents()
	{
		let studentList = this.class.students;
		let count = Template.instance().lessonAssociation.get('counter');
		return ( count < studentList.length )
	},
	click(){
		return Click.find({},{limit:1});
	},
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
	association(){
		let t = Teacher.findOne({"user":Meteor.userId()});
		if ( t != undefined )
			return Lesson.findOne({"$and":[{"teacher":t._id},{"state":{"$ne":"off"}}]}).association;
	},
	redoStudent(){
		return Template.instance().redoStudent.get() != false;
	},
	redo(){
		return Session.get('redoStudent');
	},
});

Template.flicAssociation.events({
	'click #mark-absent': function(event,template){
		/*
		let studentList = this.class.students;
		let student = Session.get('student');
		studentList = studentList.filter(e => e !== student );	// Remove string from array
		console.log(this);
		//this.class.students = studentList;
		*/
		let count = Template.instance().lessonAssociation.get('counter');
		Template.instance().lessonAssociation.set('counter',count+1);
	},
	'click #redo-student': function(event,template){
		Session.set("redoStudent", this.student);
		Template.instance().redoStudent.set(true);
		Meteor.call('removeMac', this.mac, function (err, asyncValue) {
		    if (err)
		        console.log(err);
		    else 
		    	console.log("Removed");
		        //self.myAsyncValue.set(asyncValue);
		});
	},
});

//var x = Template.instance().templateDictionary.get('showExtraFields');
//console.log(x);