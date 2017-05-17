# NativeScript Accelerometer Plugin
Accelerometer plugin for NativeScript

## Installation
```
tns plugin add nativescript-accelerometer
```

This plugin is compatible with both NativeScript `2.x` and `3.x` versions.

## Usage
```
var accelerometer = require("nativescript-accelerometer");

accelerometer.startAccelerometerUpdates(function(data) {
    console.log("x: " + data.x + "y: " + data.y + "z: " + data.z);
}, { sensorDelay: "ui" });
```

## Expected Values

 * x 
    * Tilt Left from -1 to 0 
    * Tilt Right from 0 to 1
 * y 
    * Tilt Forward from 0 to 1
    * Tilt Back from -1 to 0
 * z
    * Face Up -1
    * Face Down 1
    * Sideways 0

## Options

You can control how often the callback will be called by setting the `sensorDelay` option. The values are:
* `"normal"` - Suitable for screen orientation changes. Around 0.2 seconds.
* `"ui"` - Suitable for the user interface. Around 0.06 seconds.
* `"game"` - Suitable for games. Around 0.02 seconds.
* `"fastest"` - Sensor data as fast as possible.