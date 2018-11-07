import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Ping from 'ping.js';
import { Raspberries } from './raspberries.js';


Meteor.methods({

	newRaspberry: function(serial, ip){		

		console.log("S: "+serial);
		console.log("IP: "+ip);

		let rasp = {
			"number": Raspberries.find({}).count()+1,
			"serial": serial,
			"ipAddress": ip,
			"connected": false,
			"favorite": false
		};
		
		Raspberries.insert(rasp);

		console.log("Created new Raspberry with the following Address:" + rasp["ipAddress"]);
	},

	connect: function(jsonData){
		console.log("Received new connection:");
		console.log(jsonData.serial);
		console.log(jsonData.ip);

		// Check If Serial Already Exists
		let r = Raspberries.findOne({"serial":jsonData.serial});
		if ( r == undefined )	// If doesn't exist, create new one
		{	
			Meteor.call("newRaspberry", jsonData.serial, jsonData.ip, function (err, data) {
	            if(err){
	                console.log("Error: " + err);
	            }else{
	                //console.log("Success, created!");
	            }
        	});
		}
		else
		{
			Raspberries.update(r._id,{$set:{"connected":true}});
			Raspberries.update(r._id,{$set:{"ipAddress":jsonData.ip}});			
			console.log("The Raspberry "+jsonData.serial+" reconnected!")	
		}
	},

	checkAliveAll: function(){
		let r = Raspberries.find({'connected':true});
		r.forEach(function(rasp){
			//console.log(rasp);
			//pingv2(rasp.ipAddress);
			/*
			Meteor.call("pingHost", rasp.ipAddress, function (err, data) {
	            if(err){
	                console.log("Error: " + err);
	            }else{
	            	console.log(data);
	                //console.log(data.status);
	                if ( data.status == 'online')
	                	console.log("It's alive");
	                else
	                	Raspberries.update(rasp._id,{$set:{"connected":false}});
	            }
        	});
        	*/
        	HTTP.call( 'get', 'http://'+rasp.ipAddress+':8090', function( error, response ) {
				if ( error ) {
					console.log( error );
					Raspberries.update(rasp._id,{$set:{"connected":false}});
				} else {
					//console.log( response.content );
					if ( response.content == 'online' )
						console.log("It's alive");
					else
						Raspberries.update(rasp._id,{$set:{"connected":false}});
				};
			});
		});
	},

	/*
	pingHost: function (ip) {
	    var pingSend = function (options, callback) {
	      	//var exec = Npm.require('child_process').exec;
	      	var result = {};
	      	HTTP.call( 'GET', 'http://'+ip+':8090/', {},
				function( error, response ) {
					if (error) {
					  console.log(error);
					  return error
					} else {
					  console.log(response.content);
					  return response.content
					}
			});
	    }

	    console.log("Started");
	    var pingSendSync = Meteor.wrapAsync(pingSend);
	    var r = pingSendSync(ip);
	    console.log("Finished");
	    return r;
  	}
	*/
});



function pingv2(ip)
{
	var p = new Ping();

	p.ping(ip, function(err, data) {
	  // Also display error if err is returned.
	  if (err) {
	    console.log("error loading resource")
	    //data = data + " " + err;
	  }
	  //document.getElementById("ping-github").innerHTML = data;
	  console.log("IS UP");
	});
}

/*
function ping(ip, callback) {

    if (!this.inUse) {
        this.status = 'unchecked';
        this.inUse = true;
        this.callback = callback;
        this.ip = ip;
        var _that = this;
        this.img = new Image();
        this.img.onload = function () {
            _that.inUse = false;
            _that.callback('responded');

        };
        this.img.onerror = function (e) {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('responded', e);
            }

        };
        this.start = new Date().getTime();
        this.img.src = "http://" + ip;
        this.timer = setTimeout(function () {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('timeout');
            }
        }, 1500);
    }
}
*/