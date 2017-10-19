'use strict';

var TellstickLocalServer = require('./server.js');

class Lua extends TellstickLocalServer { 

    constructor(config) {
        super(config);
    }
    
    call(params, callback){

        super.makeRequest('lua/call', params, function(err, data){ 
            callback(err, data);
        });
    }

}

module.exports = Lua;