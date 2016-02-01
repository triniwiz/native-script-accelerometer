declare var CMMotionManager: any;
declare var NSOperationQueue: any;

interface AccelerometerData { x: number; y: number; z: number };

var accMnager;
var isListening = false;

export function startAccelerometerUpdates(callback: (AccelerometerData) => void) {
    if (isListening) {
        throw new Error("Already listening for accelerometer updates.")
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

        isListening = true;
    } else {
        throw new Error("Accelerometer not available.")
    }
}

export function stopAccelerometerUpdates() {
    if (!isListening) {
        throw new Error("Currently not listening for acceleration events.")
    }

    accMnager.stopAccelerometerUpdates();
    isListening = false;
}
