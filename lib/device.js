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
}

var methods = ['bell', 'command', 'dim', 'down', 'info', 'learn', 'setName', 'stop', 'turnOff', 'turnOn', 'up'];

methods.forEach( function(method)  {
    Device.prototype[method] = function (params, callback) {
        this.makeRequest('device/'+method, params, function(err, data){
            callback(err, data);
        });
    }
})
module.exports = Device;