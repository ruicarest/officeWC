'use strict';

var express = require('express');

//var userDB = require('./internal_modules/userDB.js');

var app = express();

//app.listen(8080, function()
//{
//    console.log(' ---------------------------------------------');
//    console.log('|  WC server listening on port 8080   |');
//    console.log(' ---------------------------------------------');
//});

var io = require('socket.io').listen(app.listen(8080, function ()
{
    console.log(' ---------------------------------------------');
    console.log('|  WC server listening on port 8080   |');
    console.log(' ---------------------------------------------');
}));

app.use(express.static('www/html'));

app.on('error', function (err)
{
    console.error(err.stack);
    res.status(500).send('Something broke!')
});

app.get('/*', function (req, res)
{
    try
    {
        //console.log("query: ",  req.query);
        console.log("url: ",  req.url);

        // Device request data frame:
        // /device/[mac]/[interface]

        var url = req.url;
        var urlParts = url.split("/");
        //console.log(urlParts);

        var error = 'ERROR (uops dont know why but it is a error)';
        //if any of the fields is empty (except none) return a error
        if(urlParts.length != 5)
        {
            error = 'ERROR no fields detected';
            console.log(error);
            res.send(error);
        }

        //var i = 1; //starts at one because of the first field is empty
        for(var i = 1; i < 4 ; i++)
        {
            var part = urlParts[i];
            if(part == "")
            {
                error = 'ERROR field number ' + i + ' is empty';
                console.log(error);
                res.send(error);
                break;
            }
        }

        var none = urlParts[0]; //has nothing it is because of the first /
        var device = urlParts[1]; //must be "device"
        var mac = urlParts[2]; //has the mac address of the device
        var iface = urlParts[3]; // has the interface of the device
        var value = urlParts[4]; // has the value of the device

        //if the device field is not "device" return error
        if(device != "device")
        {
            error = 'ERROR the first field must be device';
            console.log(error);
            res.send(error);
        }
        //console.log("none: " + none + " | device: " + device + " | mac: " + mac + " | iface: " + iface + " | value: " + value);


        //console.log(configurationDB);
        //console.log(configurationDB.configuration);
        //console.log(configurationDB.configuration['0c:8b:fd:9b:a3:93']);
        //console.log(configurationDB[mac].iface);
        //console.log(configurationDB.configuration[mac].iface[iface]);

        console.log("Value " + value + " was read from device: " + mac + " on iface: " + iface);
    }
    catch(e)
    {
        var error = 'ERROR (uops dont know why but it is a error)';
        console.log(error);
        console.log("EXCEPTION CAUGHT: " + e);
    }

});

//io.sockets.on('connection', function (socket)
//{
//    socket.emit('notification', configurationDB.getConfigurationArray());
//});

var configurationDB = require('./internal_modules/configurationDB.js');
configurationDB.getConfigurationArray();
//console.log(configurationDB.getConfigurationJsonArray());


