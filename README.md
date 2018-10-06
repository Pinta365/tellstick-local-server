# tellstick-local-server
A node.js promise based wrapper for the Tellstick ZNet local server API.

NOTICE - You need to retrieve your own application token from the ZNet local server before you can use the API wrapper. See basic instructions further down.

### Usage
##### Install easiest with NPM
> npm install tellstick-local-server
##### A few simple examples
Edit the config parameters with your server ip and bearer token.

List all devices.
```javascript
const api = require('tellstick-local-server');
const config = {ip: '192.168.1.111',
				bearerToken: 'eyJhbGciOiJIMTM..........ZSwidHUzxkS9BRqY'}
const device = new api.device(config);

async function listDevices(){
  try {
        console.log(await device.list());
    } catch(err) {
        console.log(err);
    } 
}

listDevices();
```

List all sensors along with a parameter to include latest values.
```javascript
const api = require('tellstick-local-server');
const config = {ip: '192.168.1.111',
				bearerToken: 'eyJhbGciOiJIMTM..........ZSwidHUzxkS9BRqY'}
const sensor = new api.sensor(config);

const params = { includeValues: 1 }

async function listSensors(){
  try {
        console.log(await sensor.list(params));
    } catch(err) {
        console.log(err);
    } 
}

listSensors();
```

### Supported API-calls
Documentation for the local server API is lacking to say the least(still in beta I think?) but I have wrapped the below listed api-calls that I have found documented as working on the Tellstick ZNet local server API(by browsing to the api-section of the local server (http://[local server Ip]]/api)). I will probably add some more documentation as to what possible parameters there are but for now I refer to the Telldus Live-API documentation (https://api.telldus.com/explore/index) because it seems like the local methods accept the same parameters.

All methods use callbacks and will callback the requested response object or an error in the format "statusCode - error text"
```
Device class:
list
bell
command
dim
up
down
info
learn
setName
stop
turnOff
turnOn

Sensor class:
list
info
setName

Lua class:
call
```

### Retrieving your own application token from the local server.
1. Make a PUT request to the server endpoint /api/token along with your application name as paramater "app".
```
pi@raspberrypi:~ $ curl -i -d app="tellstick test" -X PUT http://192.168.1.191/api/token
  HTTP/1.1 200 OK
  Date: Tue, 17 Oct 2017 15:10:50 GMT
  Content-Length: 139
  Content-Type: application/json; charset=utf-8
  Server: CherryPy/3.7.0
  Set-Cookie: session_id=adf69472622184570b85; expires=Tue, 17 Oct 2017 16:10:50 GMT; Path=/

  {
    "authUrl": "http://192.168.1.191/api/authorize?token=5ac2634556456456456469d1eef4c5bd",
    "token": "5ac2634556456456456469d1eef4c5bd"
    }
```

2. Browse to the "authUrl"-url that you get returned from the last request. Follow the instructions on screen to authenticate the application.
```
	http://192.168.1.191/api/authorize?token=5ac2634556456456456469d1eef4c5bd
```



3. Make a GET request to endpoint /api/token again with the token you got in the first stage as parameter "token".
```
pi@raspberrypi:~ $ curl -i -X GET http://192.168.1.191/api/token?token=5ac2634556456456456469d1eef4c5bd
  HTTP/1.1 200 OK
  Date: Tue, 17 Oct 2017 15:12:18 GMT
  Content-Length: 246
  Content-Type: application/json; charset=utf-8
  Server: CherryPy/3.7.0
  Set-Cookie: session_id=8db45000c7a9197f8823af7; expires=Tue, 17 Oct 2017 16:12:18 GMT; Path=/

{
"allowRenew": true,
"expires": 1539789138,
"token": "eyJhbGciOiJIASFSDFsdfFsadfwi..................H0.6pN10UPW9a1235xkS9BRqY"
}
```
4. Profit - Use the longer "token" you get in return for your application and Rock and Roll.