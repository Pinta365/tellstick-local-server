'use strict';

var TellstickLocalServer = require('./server.js');

class Sensor extends TellstickLocalServer { 

    constructor(config) {
        super(config);
    }

    list(params, callback) {
        // params is optional for this call so we better check if it's supplied or not 
        if ((!callback) && (typeof params === 'function')) {
            callback = params;
            params = null;
        }

        super.makeRequest('sensors/list', params, function(err, data){ 
            callback(err, data);
        });
    }
}

var methods = ['info', 'setName'];

methods.forEach( function(method)  {
    Sensor.prototype[method] = function (params, callback) {
        this.makeRequest('sensor/'+method, params, function(err, data){
            callback(err, data);
        });
    }
})

module.exports = Sensor;