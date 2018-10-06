'use strict';

var TellstickLocalServer = require('./server.js');

class Device extends TellstickLocalServer { 

    constructor(config) {
        super(config);
    }
    
    list(params) {
        return super.makeRequest('devices/list', params);
    }
}

var methods = ['bell', 'command', 'dim', 'down', 'info', 'learn', 'setName', 'stop', 'turnOff', 'turnOn', 'up'];

methods.forEach( function(method)  {
    Device.prototype[method] = function (params) {
        return this.makeRequest('device/'+method, params);
    }
})
module.exports = Device;