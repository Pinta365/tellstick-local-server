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

}

TellstickLocalServer.prototype.sensorsList = function(params, callback) {

    // params is optional for this call so we better check if it's supplied or not 
    if ((!callback) && (typeof params === 'function')) {
        callback = params;
        params = null;
    }

    this.getData('sensors/list', params, function(err, data){ 
        callback(err, data);
    });
}

TellstickLocalServer.prototype.sensorInfo = function(params, callback){

    this.getData('sensor/info', params, function(err, data){ 
        callback(err, data);
    });
}

TellstickLocalServer.prototype.sensorSetName = function(params, callback){

    this.getData('sensor/setName', params, function(err, data){ 
        callback(err, data);
    });
} 

module.exports = TellstickLocalServer;

