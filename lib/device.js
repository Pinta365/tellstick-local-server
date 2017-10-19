'use strict';

var TellstickLocalServer = require('./server.js');

class Device extends TellstickLocalServer { 

    constructor(config) {
        super(config);
    }
    
    list(params, callback) {
        // params is optional for this call so we better check if it's supplied or not 
        if ((!callback) && (typeof params === 'function')) {
            callback = params;
            params = null;
        }

        super.makeRequest('devices/list', params, function(err, data){ 
            callback(err, data);
        });
    }

    bell(params, callback){

        super.makeRequest('device/bell', params, function(err, data){ 
            callback(err, data);
        });
    }

    command(params, callback){

        super.makeRequest('device/command', params, function(err, data){ 
            callback(err, data);
        });
    }

    dim(params, callback){

        super.makeRequest('device/dim', params, function(err, data){ 
            callback(err, data);
        });
    }

    down(params, callback){

        super.makeRequest('device/down', params, function(err, data){ 
            callback(err, data);
        });
    }

    info(params, callback){

        super.makeRequest('device/info', params, function(err, data){ 
            callback(err, data);
        });
    }

    learn(params, callback){

        super.makeRequest('device/learn', params, function(err, data){ 
            callback(err, data);
        });
    }

    setName(params, callback){

        super.makeRequest('device/setName', params, function(err, data){ 
            callback(err, data);
        });
    }

    stop(params, callback){

        super.makeRequest('device/stop', params, function(err, data){ 
            callback(err, data);
        });
    }

    turnOff(params, callback){

        super.makeRequest('device/turnOff', params, function(err, data){ 
            callback(err, data);
        });
    }

    turnOn(params, callback){

        super.makeRequest('device/turnOn', params, function(err, data){ 
            callback(err, data);
        });
    }

    up(params, callback){

        super.makeRequest('device/up', params, function(err, data){ 
            callback(err, data);
        });
    }

}

module.exports = Device;