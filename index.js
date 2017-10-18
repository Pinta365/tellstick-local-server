'use strict';

const http = require('http');
const querystring = require('querystring'); 

class TellstickLocalServer { 

    constructor(ip, bearerToken) {
        this.ip = ip;
        this.bearerToken = bearerToken;
    }
    
    getData(path, params, callback) {

        var options = {

            method: 'GET',
            hostname: this.ip,
            port: 80,
            path: '/api/' + encodeURI(path) + '?' + querystring.stringify(params),
            headers: {
                'cache-control': 'no-cache',
                'Authorization': 'Bearer ' + this.bearerToken
            }
        };

        var req = http.request(options, function(res) {
            var parts = [];

            req.on('error', function(err) {
                callback(err);
            });

            res.on('data', function(part) {
                parts.push(part);
            });

            res.on('end', function() {
                var data = Buffer.concat(parts);
                data = JSON.parse(data);
                
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    callback(new Error(res.statusCode + ' - ' + data.error));
                }
                else {
                    callback(null, data);
                }            

            });
        });

        req.end();
    }

    sensorsList(params, callback) {
        // params is optional for this call so we better check if it's supplied or not 
        if ((!callback) && (typeof params === 'function')) {
            callback = params;
            params = null;
        }

        this.getData('sensors/list', params, function(err, data){ 
            callback(err, data);
        });
    }

    sensorInfo(params, callback){

        this.getData('sensor/info', params, function(err, data){ 
            callback(err, data);
        });
    }

    sensorSetName(params, callback){

        this.getData('sensor/setName', params, function(err, data){ 
            callback(err, data);
        });
    } 

    devicesList(params, callback) {
        // params is optional for this call so we better check if it's supplied or not 
        if ((!callback) && (typeof params === 'function')) {
            callback = params;
            params = null;
        }

        this.getData('devices/list', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceBell(params, callback){

        this.getData('device/bell', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceCommand(params, callback){

        this.getData('device/command', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceDim(params, callback){

        this.getData('device/dim', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceDown(params, callback){

        this.getData('device/down', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceInfo(params, callback){

        this.getData('device/info', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceLearn(params, callback){

        this.getData('device/learn', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceSetName(params, callback){

        this.getData('device/setName', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceStop(params, callback){

        this.getData('device/stop', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceTurnOff(params, callback){

        this.getData('device/turnOff', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceTurnOn(params, callback){

        this.getData('device/turnOn', params, function(err, data){ 
            callback(err, data);
        });
    }

    deviceUp(params, callback){

        this.getData('device/up', params, function(err, data){ 
            callback(err, data);
        });
    }

    luaCall(params, callback){

        this.getData('lua/call', params, function(err, data){ 
            callback(err, data);
        });
    }
}

module.exports = TellstickLocalServer;

