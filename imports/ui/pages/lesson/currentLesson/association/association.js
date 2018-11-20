import './association.html';

import { Teacher } from '/imports/api/teacher/teacher.js';
import { Lesson } from '/imports/api/lesson/lesson.js';
import { Class } from '/imports/api/class/class.js';
import { Click } from '/imports/api/click/click.js';

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
				associated.push(student);
		})
		return associated;
	},
	isClicked(){
		let click = Click.findOne({"mac":this.mac});
		if ( click != undefined)
		{
			setTimeout(function() { Click.remove({"_id":click._id}); }, 2000);
			return "f-red";
		}
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
	'click #start-class': function(){
		let l = Lesson.findOne({"number":Template.instance().lessonNumber.get()});
		Lesson.update({"_id":l._id},{"$set":{"state":"idle"}});
	},
});