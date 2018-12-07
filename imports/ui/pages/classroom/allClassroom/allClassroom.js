import './allClassroom.html'

import { Classroom } from '/imports/api/classroom/classroom.js';
import { Raspberries } from '/imports/api/raspberries/raspberries.js';

Template.allClassroom.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('classroom.own');
		self.subscribe('raspberries.classroom.own');
	});	
});

Template.allClassroom.onCreated(function(){
	/*
	Meteor.call("checkAliveAll", function (err, data) {
        if(err){
            //console.log("Error: " + err);
        }else{
        	//console.log("Check Alive");
        }
	});
	*/
});

Template.allClassroom.helpers({
	Classroom(){
		return Classroom;
	},
	allClassroom(){
		return Classroom.find();
	},
	hasInfo(){
		return ( this.location != undefined && this.name!= undefined && this.school != undefined);
	},
	isConnected(){
		let rasp = Raspberries.findOne({"serial":this.raspberrySerial});
		return rasp.connected;
	},
});

Template.allClassroom.events({
	'click #edit-classroom': function(){
		FlowRouter.go("/classroom/edit/"+this.number);
	},
	'click #add-classroom': function(){
		FlowRouter.go("/classroom/add");
	}
});