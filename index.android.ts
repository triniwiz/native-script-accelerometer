/// <reference path="./node_modules/tns-core-modules/tns-core-modules.d.ts" /> Needed for autocompletion and compilation.

import application = require('application');
declare var android: any;
interface AccelerometerData { x: number; y: number; z: number };

const baseAcceleration = -9.81;
var sensorListener;
var sensorManager;
var accelerometerSensor;
export function startAccelerometerUpdates(callback: (AccelerometerData) => void) {
    if (sensorListener) {
        throw new Error("Already listening for accelerometer updates.")
    }

    const wrappedCallback = zonedCallback(callback);    
    var activity = application.android.foregroundActivity;
    if (!activity) {
        throw Error("Could not get foregroundActivity.")
    }

    if (!sensorManager) {
        sensorManager = activity.getSystemService(
            android.content.Context.SENSOR_SERVICE
        );

        if (!sensorManager) {
            throw Error("Could not initalize SensorManager.")
        }
    }

    if (!accelerometerSensor) {
        accelerometerSensor = sensorManager.getDefaultSensor(android.hardware.Sensor.TYPE_ACCELEROMETER);
        if (!accelerometerSensor) {
            throw Error("Could get accelerometer sensor.")
        }
    }


    sensorListener = new android.hardware.SensorEventListener({
        onAccuracyChanged: (sensor, accuracy) => {
        },
        onSensorChanged: (event) => {
            wrappedCallback({
                x: event.values[0] / baseAcceleration,
                y: event.values[1] / baseAcceleration,
                z: event.values[2] / baseAcceleration
            })
        }
    });

    sensorManager.registerListener(
        sensorListener,
        accelerometerSensor,
        android.hardware.SensorManager.SENSOR_DELAY_NORMAL
    );
}

export function stopAccelerometerUpdates() {
    if (!sensorListener) {
        throw new Error("Currently not listening for acceleration events.")
    }

    sensorManager.unregisterListener(sensorListener);
    sensorListener = undefined;
}
