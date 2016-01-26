declare var CMMotionManager: any;
declare var NSOperationQueue: any;

interface AccelomenterData { x: number; y: number; z: number };

var accMnager;
var isListeneing = false;

export function startAccelometerUpdates(callback: (AccelomenterData) => void) {
    if (isListeneing) {
        throw new Error("Already listetning for accelometer updates.")
    }

    if (!accMnager) {
        accMnager = CMMotionManager.alloc().init();
        accMnager.accelerometerUpdateInterval = 0.1;
    }

    if (accMnager.accelerometerAvailable) {
        var queue = NSOperationQueue.alloc().init();
        accMnager.startAccelerometerUpdatesToQueueWithHandler(queue, (data, error) => {
            callback({
                x: data.acceleration.x,
                y: data.acceleration.y,
                z: data.acceleration.z
            })
        });

        isListeneing = true;
    } else {
        throw new Error("Accelerometer not available.")
    }
}

export function stopAccelometerUpdates() {
    if (!isListeneing) {
        throw new Error("Currently not listening for acceleration events.")
    }

    accMnager.stopAccelerometerUpdates();
    isListeneing = false;
}