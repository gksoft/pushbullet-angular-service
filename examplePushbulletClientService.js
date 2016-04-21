'use strict';

function PushbulletClientService($http, apiKey, clientName) {

    var pusher = new PushBullet($http, apiKey);

    registerDevice();
    var stream = pusher.stream();
    stream.connect();

    function registerDevice() {
        var deviceCreated = false;
        getDevices({
            active: true
        }, function(error, response) {
            if (!error) {                
				deviceCreated = deviceExists(response.devices);
                if (!deviceCreated) {
                    createDevice({
                        "nickname": clientName,
                        "icon": "browser"
                    }, function(error, response) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("Device " + response.nickname + "created iden:" + response.iden + " " + response.icon);
                        }
                    });
                }
            }
        });
    }

    function deviceExists(devices) {
    	var deviceExists = false;
        for (var i = devices.length - 1; i >= 0; i--) {
            console.log("Device:" + devices[i].nickname);

            if (devices[i].nickname == clientName) {
                deviceExists = true;
                break;
            }
        };

        return deviceExists;
    }

    function getPushes(options, callback) {
        pusher.history(options, callback);
    }

    function getDevices(options, callback) {
        pusher.devices(options, callback);
    }

    function createDevice(options, callback) {
        pusher.createDevice(options, callback);
    }

    return {
        on: function(type, callback) {
            stream.on(type, callback);
        },
        getPushes: getPushes,
        getDevices: getDevices,
        createDevice: createDevice
    };
}

var app = angular.module('MODULENAME',[]);
app.value('apiKey', '*********ENTER YOUR API KEY********');
app.value('clientName', 'ENTER YOUR PUSHBULLET CLIENT NAME');
app.factory('pushbulletClientService', ['$http', 'apiKey', 'clientName', PushbulletClientService]);
