'use strict';

var TellstickLocalServer = require('./server.js');

class Device extends TellstickLocalServer { 

    constructor(config) {
        super(config);
    }
    
    devicesList(params, callback) {
        // params is optional for this call so we better check if it's supplied or not 
        if ((!callback) && (typeof params === 'function')) {
            callback = params;
            params = null;
        }

        super.getData('devices/list', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceBell(params, callback){

        super.getData('device/bell', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceCommand(params, callback){

        super.getData('device/command', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceDim(params, callback){

        super.getData('device/dim', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceDown(params, callback){

        super.getData('device/down', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceInfo(params, callback){

        super.getData('device/info', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceLearn(params, callback){

        super.getData('device/learn', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceSetName(params, callback){

        super.getData('device/setName', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceStop(params, callback){

        super.getData('device/stop', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceTurnOff(params, callback){

        super.getData('device/turnOff', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceTurnOn(params, callback){

        super.getData('device/turnOn', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceUp(params, callback){

        super.getData('device/up', params, function(err, data){ 
            callback(err, data);
        });
    }

}

module.exports = Device;