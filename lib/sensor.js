'use strict';

var TellstickLocalServer = require('./server.js');

class Sensor extends TellstickLocalServer { 

    constructor(config) {
        super(config);
    }

    sensorsList(params, callback) {
        // params is optional for this call so we better check if it's supplied or not 
        if ((!callback) && (typeof params === 'function')) {
            callback = params;
            params = null;
        }

        super.getData('sensors/list', params, function(err, data){ 
            callback(err, data);
        });
    }

    sensorInfo(params, callback){

        super.getData('sensor/info', params, function(err, data){ 
            callback(err, data);
        });
    }

    sensorSetName(params, callback){

        super.getData('sensor/setName', params, function(err, data){ 
            callback(err, data);
        });
    }

}

module.exports = Sensor;