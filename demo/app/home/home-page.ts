
import { Page } from 'tns-core-modules/ui/page';
import { startAccelerometerUpdates, AccelerometerData, stopAccelerometerUpdates, isListening } from "nativescript-accelerometer";
import { Observable, EventData } from 'tns-core-modules/data/observable';

const context = new Observable();
function update(data: AccelerometerData) {
    context.set("x", data.x.toFixed(2));
    context.set("y", data.y.toFixed(2));
    context.set("z", data.z.toFixed(2));
}

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    let page = <Page>args.object;
    page.bindingContext = context;

    startAccelerometerUpdates(update, { sensorDelay: "ui" });
    context.set("isListening", isListening());
}

export function toggleUpdates() {
    if (isListening()) {
        stopAccelerometerUpdates();
    } else {
        startAccelerometerUpdates(update, { sensorDelay: "ui" });
    }

    context.set("isListening", isListening());
}
