var application = require('application');
;
var sensorListener;
var sensorManager;
var accelometerSensor;
function startAccelometerUpdates(callback) {
    if (sensorListener) {
        throw new Error("Already listetning for accelometer updates.");
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
    if (!accelometerSensor) {
        accelometerSensor = sensorManager.getDefaultSensor(android.hardware.Sensor.TYPE_ACCELEROMETER);
        if (!accelometerSensor) {
            throw Error("Could get accelometer sensor.");
        }
    }
    sensorListener = new android.hardware.SensorEventListener({
        onAccuracyChanged: function (sensor, accuracy) {
        },
        onSensorChanged: function (event) {
            callback({
                x: event.values[0],
                y: event.values[1],
                z: event.values[2]
            });
        }
    });
    sensorManager.registerListener(sensorListener, accelometerSensor, android.hardware.SensorManager.SENSOR_DELAY_NORMAL);
}
exports.startAccelometerUpdates = startAccelometerUpdates;
function stopAccelometerUpdates() {
    if (!sensorListener) {
        throw new Error("Currently not listening for acceleration events.");
    }
    sensorManager.unregisterListener(sensorListener);
    sensorListener = undefined;
}
exports.stopAccelometerUpdates = stopAccelometerUpdates;
