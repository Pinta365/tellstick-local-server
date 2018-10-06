'use strict';

var TellstickLocalServer = require('./server.js');

class Lua extends TellstickLocalServer { 

    constructor(config) {
        super(config);
    }
    
    call(params){
        return super.makeRequest('lua/call', params);
    }

}

module.exports = Lua;