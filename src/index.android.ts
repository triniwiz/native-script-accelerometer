/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" /> Needed for autocompletion and compilation.

import { android as androidApp } from "tns-core-modules/application";
import { SensorDelay, AccelerometerOptions, AccelerometerData } from ".";

const baseAcceleration = -9.81;
var sensorListener;
var sensorManager;
var accelerometerSensor;

function getNativeDelay(options?: AccelerometerOptions): number {
    if (!options || !options.sensorDelay) {
        return android.hardware.SensorManager.SENSOR_DELAY_NORMAL;
    }

    switch (options.sensorDelay) {
        case "normal":
            return android.hardware.SensorManager.SENSOR_DELAY_NORMAL;

        case "game":
            return android.hardware.SensorManager.SENSOR_DELAY_GAME;

        case "ui":
            return android.hardware.SensorManager.SENSOR_DELAY_UI;

        case "fastest":
            return android.hardware.SensorManager.SENSOR_DELAY_FASTEST;
    }
}

export function startAccelerometerUpdates(callback: (data: AccelerometerData) => void, options?: AccelerometerOptions) {
    if (sensorListener) {
        throw new Error("Already listening for accelerometer updates.")
    }

    const wrappedCallback = zonedCallback(callback);
    var activity = androidApp.foregroundActivity;
    if (!activity) {
        throw Error("Could not get foregroundActivity.")
    }

    if (!sensorManager) {
        sensorManager = activity.getSystemService(
            android.content.Context.SENSOR_SERVICE
        );

        if (!sensorManager) {
            throw Error("Could not initialize SensorManager.")
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

    const nativeDelay = getNativeDelay(options);
    sensorManager.registerListener(
        sensorListener,
        accelerometerSensor,
        nativeDelay
    );
}

export function stopAccelerometerUpdates() {
    if (!sensorListener) {
        throw new Error("Currently not listening for acceleration events.")
    }

    sensorManager.unregisterListener(sensorListener);
    sensorListener = undefined;
}
