# pushbullet-angular-service
pushbullet client api for use with angular

### usage

check the [examplePushbulletClientService.js](https://github.com/gksoft/pushbullet-angular-service/blob/master/examplePushbulletClientService.js) or code a similar one. Enter the pushbullet api key, the name of the client. 

add the script files in your client

        <script src="path/to/pushbullet-angular-service/stream.js"></script>
        <script src="path/to/pushbullet-angular-service/pushbullet.js"></script>
        <script src="path/to/pushbullet-angular-service/devices.js"></script>
        <script src="path/to/pushbullet-angular-service/pushes.js"></script>
        
        .....add any of the other pushbullet script files needed..........
        
        <script src="path/to/examplePushbulletClientService.js"></script>

Inject the pushbullet angular service in your angular module or other service.
