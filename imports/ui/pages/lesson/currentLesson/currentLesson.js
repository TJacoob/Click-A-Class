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
});

Template.currentLesson.events({
	
});

// Flic Association
Template.flicAssociation.onCreated(function(){
	this.lessonAssociation = new ReactiveDict();
	this.lessonAssociation.set('counter', 0 );
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
});

Template.flicAssociation.events({
	'click #next': function( event, template ) {
		//console.log(this.mac);
		//console.log(Session.get('student'));
		Template.instance().lessonAssociation.set('asdas',Session.get('student'));
		//console.log(Template.instance().lessonAssociation);
		Click.remove({"_id":this._id});
		let count = Template.instance().lessonAssociation.get('counter');
		Template.instance().lessonAssociation.set('counter',count+1);
	},

	'click #finish': function(){
		let association = Template.instance().lessonAssociation.keys;
		Meteor.call("updateAssociation", association, function (err, data) {
            if(err){
                //alert("Error: " + err);
                //future.return( error );
            }else{
                //future.return( response );
                console.log("Success, associated!");
                //console.log("THIS:" + data["serial"]);
            }
        });
	},
});

//var x = Template.instance().templateDictionary.get('showExtraFields');
//console.log(x);