/**
 * Created by edu on 10/02/16.
 */

'use strict';


var fs = require('fs');

function Configuration()
{
    this.mac = "";
    this.iface = "";
    this.lastcontime = "";
    this.timeoutTime = 0;
    this.local = '';

}

function IFace()
{
    this.type = "";
    this.gpio = "";
    this.addr = "";
    this.value = 0;
}

function ConfigurationDB()
{
    this.file = "db/configurationDB.json";
    this.configuration = [];

    console.log("##############" + "# ConfigurationDB #" + "############");
    this.checkDBFile();
    this.readDBFile();
    console.log("##############" + "##############" + "############");
}

ConfigurationDB.prototype.checkDBFile = function()
{
    console.log("#\tChecking " + this.file + " for a DB");
    try
    {
        var stats = fs.lstatSync(this.file);

        if (stats.isFile())
        {
            if(stats["size"] < 0)
            {
                this.createEmptyFile()
            }
        }
        else
        {
            this.createEmptyFile()
        }
    }
    catch (e)
    {
        this.createEmptyFile()
    }
};

ConfigurationDB.prototype.readDBFile = function()
{
    console.log("#\tReading " + this.file + "");
    this.configuration = [];
    try
    {
        var fileContents = fs.readFileSync(this.file, 'utf8');
        //console.log("Configuration fileContents: ", fileContents);
        this.configuration = JSON.parse(fileContents);
    }
    catch(e)
    {
        console.log(e);
        this.configuration = [];
    }

    //console.log("configuration: ", this.configuration);
};

ConfigurationDB.prototype.createEmptyFile = function()
{
    console.log("#\tCreating a empty " + this.file + "");
    fs.openSync(this.file, 'w');
    fs.appendFileSync(this.file, '[]');
};

ConfigurationDB.prototype.getConfigurationJsonArray = function()
{
    return JSON.stringify(this.configuration, null, 4);
};

ConfigurationDB.prototype.getConfigurationArray = function()
{
    return this.configuration;
};


ConfigurationDB.prototype.setDeviceIfaceValue = function(mac, iface, value)
{
    this.configuration[mac].iface[iface].value = value;
};


module.exports = new ConfigurationDB();