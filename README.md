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
