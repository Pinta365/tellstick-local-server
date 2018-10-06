'use strict';

var TellstickLocalServer = require('./server.js');

class Sensor extends TellstickLocalServer { 

    constructor(config) {
        super(config);
    }

    list(params) {
        return super.makeRequest('sensors/list', params);
    }
}

var methods = ['info', 'setName'];

methods.forEach( function(method)  {
    Sensor.prototype[method] = function (params) {
        return this.makeRequest('sensor/'+method, params);
    }
})

module.exports = Sensor;