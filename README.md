# NativeScript Accelerometer Plugin
Accelerometer plugin for NativeScript

## Installation
```
tns plugin add nativescript-accelerometer
```

## Usage
```
var accelerometer = require("nativescript-accelerometer");

accelerometer.startAccelerometerUpdates(function(data) {
    console.log("x: " + data.x + "y: " + data.y + "z: " + data.z);
});
```

## Expected values

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
