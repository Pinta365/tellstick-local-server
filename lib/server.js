'use strict';

const http = require('http');

function serializeParamString(obj) {
    let str = [];
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    }
    return str.join('&');
}

class TellstickLocalServer { 

    constructor(config) {
        //will probably remove defaults since each application need unique bearer token.
        var defaults = {
            ip: '',
            bearerToken: ''        
        };

        Object.assign(this, defaults, config);
    }    

    makeRequest(path, params) {
        let qs = !params ? {} : params;
            qs = serializeParamString(qs);

        var options = {

            method: 'GET',
            hostname: this.ip,
            port: 80,
            path: '/api/' + encodeURI(path) + '?' + qs,
            headers: {
                'cache-control': 'no-cache',
                'Authorization': 'Bearer ' + this.bearerToken
            }
        };

        return new Promise((resolve, reject) => {
            let req = http.request(options, (res) => {
                
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error('Error code=' + res.statusCode + ' '+ res.statusMessage));
                }
                
                let parts = [];
                
                res.on('data', (part) => {
                    parts.push(part);
                });
               
                res.on('end', () => {
                    try {
                        parts = JSON.parse(Buffer.concat(parts).toString());
                    } catch(err) {
                        reject(err);
                    } finally {
                        resolve(parts);
                    }
                    
                });
            });
           
            req.on('error', (err) => {
                reject(err);
            });
            
            req.end();
        });
    }

}

module.exports = TellstickLocalServer;