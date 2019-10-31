
import { Page, View } from 'tns-core-modules/ui/page';
import { startAccelerometerUpdates, AccelerometerData, stopAccelerometerUpdates, isListening } from "nativescript-accelerometer";
import { Observable, EventData } from 'tns-core-modules/data/observable';
import { ShakeDetector } from './shake-detector';

const context = new Observable();
let shakeView: View;
const shakeDetector = new ShakeDetector(() => {
    shakeView.opacity = 1;
    shakeView.scaleX = 1;
    shakeView.scaleY = 1;
    shakeView.animate({
        duration: 1000,
        opacity: 0,
        scale: { x: 2, y: 2 },
        curve: "easeOut"
    });
});

function update(data: AccelerometerData) {
    context.set("x", data.x.toFixed(2));
    context.set("y", data.y.toFixed(2));
    context.set("z", data.z.toFixed(2));

    shakeDetector.onSensorData(data);
}

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    let page = <Page>args.object;
    page.bindingContext = context;
    shakeView = page.getViewById("shake-view");
    console.log("shake-view", shakeView)
    try {
        startAccelerometerUpdates(update, { sensorDelay: "ui" });
    } catch (e) {
        alert("Error: " + e.message);
    }

    context.set("isListening", isListening());
}

export function toggleUpdates() {
    if (isListening()) {
        stopAccelerometerUpdates();
    } else {
        try {
            startAccelerometerUpdates(update, { sensorDelay: "ui" });
        } catch (e) {
            alert("Error: " + e.message);
        }
    }

    context.set("isListening", isListening());
}

