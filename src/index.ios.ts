/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" /> Needed for autocompletion and compilation.

import { SensorDelay, AccelerometerOptions, AccelerometerData } from ".";

let accManager;
let isListening = false;
let main_queue = dispatch_get_current_queue();

function getNativeDelay(options?: AccelerometerOptions): number {
    if (!options || !options.sensorDelay) {
        return 0.2;
    }

    switch (options.sensorDelay) {
        case "normal":
            return 0.2;
        case "ui":
            return 0.06;
        case "game":
            return 0.02
        case "fastest":
            return 0.001;
    }
}

export function startAccelerometerUpdates(callback: (AccelerometerData) => void, options?: AccelerometerOptions) {
    if (isListening) {
        throw new Error("Already listening for accelerometer updates.")
    }

    const wrappedCallback = zonedCallback(callback);

    if (!accManager) {
        accManager = CMMotionManager.alloc().init();
    }

    accManager.accelerometerUpdateInterval = getNativeDelay(options);

    if (accManager.accelerometerAvailable) {
        var queue = NSOperationQueue.alloc().init();
        accManager.startAccelerometerUpdatesToQueueWithHandler(queue, (data, error) => {
            dispatch_async(main_queue, () => {
                wrappedCallback({
                    x: data.acceleration.x,
                    y: data.acceleration.y,
                    z: data.acceleration.z
                })
            })
        });

        isListening = true;
    } else {
        throw new Error("Accelerometer not available.")
    }
}

export function stopAccelerometerUpdates() {
    if (!isListening) {
        throw new Error("Currently not listening for acceleration events.")
    }

    accManager.stopAccelerometerUpdates();
    isListening = false;
}
