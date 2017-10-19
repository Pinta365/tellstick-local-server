'use strict';

const http = require('http');
const querystring = require('querystring'); 

class TellstickLocalServer { 

    constructor(config) {
        //will probably remove defaults since each application need unique bearer token.
        var defaults = {
            ip: '',
            bearerToken: ''        
        };

        Object.assign(this, defaults, config);
    }

    makeRequest(path, params, callback) {

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

module.exports = TellstickLocalServer;