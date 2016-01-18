;
var accMnager;
var isListeneing = false;
function startAccelometerUpdates(callback) {
    if (isListeneing) {
        throw new Error("Already listetning for accelometer updates.");
    }
    if (!accMnager) {
        accMnager = CMMotionManager.alloc().init();
        accMnager.accelerometerUpdateInterval = 1;
    }
    if (accMnager.isAccelerometerAvailable) {
        var queue = NSOperationQueue.alloc().init();
        accMnager.startAccelerometerUpdatesToQueueWithHandler(queue, function (data, error) {
            callback({
                x: data.acceleration.x,
                y: data.acceleration.y,
                z: data.acceleration.z
            });
        });
        isListeneing = true;
    }
    else {
        throw new Error("Accelerometer not available.");
    }
}
exports.startAccelometerUpdates = startAccelometerUpdates;
function stopAccelometerUpdates() {
    if (!isListeneing) {
        throw new Error("Currently not listening for acceleration events.");
    }
    accMnager.stopAccelerometerUpdates();
    isListeneing = false;
}
exports.stopAccelometerUpdates = stopAccelometerUpdates;
