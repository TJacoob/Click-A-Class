import './clicks.html';

import { Click } from '/imports/api/click/click.js';

Template.test_clicks.onRendered(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe("click.all");
	});
});

Template.test_clicks.helpers({
	click(){
		return Click.find({});
	},
	singleClick(c){
		return ( c["type"] == "ButtonSingleClick" );
	},
	doubleClick(c){
		return ( c["type"] == "ButtonDoubleClick" );
	},
	holdClick(c){
		return ( c["type"] == "ButtonHold" );
	},

});

Template.test_clicks.events({
	'click #dismiss-alert': function(){
		console.log(this);
		Click.remove({"_id":this._id});
	},
});