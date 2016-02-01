var application = require('application');
;
var baseAcceleration = 9.81;
var sensorListener;
var sensorManager;
var accelerometerSensor;
function startAccelerometerUpdates(callback) {
    if (sensorListener) {
        throw new Error("Already listening for accelerometer updates.");
    }
    var activity = application.android.foregroundActivity;
    if (!activity) {
        throw Error("Could not get foregroundActivity.");
    }
    if (!sensorManager) {
        sensorManager = activity.getSystemService(android.content.Context.SENSOR_SERVICE);
        if (!sensorManager) {
            throw Error("Could not initalize SensorManager.");
        }
    }
    if (!accelerometerSensor) {
        accelerometerSensor = sensorManager.getDefaultSensor(android.hardware.Sensor.TYPE_ACCELEROMETER);
        if (!accelerometerSensor) {
            throw Error("Could get accelerometer sensor.");
        }
    }
    sensorListener = new android.hardware.SensorEventListener({
        onAccuracyChanged: function (sensor, accuracy) {
        },
        onSensorChanged: function (event) {
            callback({
                x: event.values[0] / baseAcceleration,
                y: event.values[1] / baseAcceleration,
                z: event.values[2] / baseAcceleration
            });
        }
    });
    sensorManager.registerListener(sensorListener, accelerometerSensor, android.hardware.SensorManager.SENSOR_DELAY_NORMAL);
}
exports.startAccelerometerUpdates = startAccelerometerUpdates;
function stopAccelerometerUpdates() {
    if (!sensorListener) {
        throw new Error("Currently not listening for acceleration events.");
    }
    sensorManager.unregisterListener(sensorListener);
    sensorListener = undefined;
}
exports.stopAccelerometerUpdates = stopAccelerometerUpdates;
