
import { Page } from 'tns-core-modules/ui/page';
import { startAccelerometerUpdates, AccelerometerData, stopAccelerometerUpdates } from "nativescript-accelerometer";
import { Observable, EventData } from 'tns-core-modules/data/observable';

let isListening = false;
const context = new Observable();
function update(data: AccelerometerData) {
    context.set("x", data.x.toFixed(4));
    context.set("y", data.y.toFixed(4));
    context.set("z", data.z.toFixed(4));
}

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    let page = <Page>args.object;
    page.bindingContext = context;
}

export function startUpdates() {
    startAccelerometerUpdates(update, { sensorDelay: "ui" });
}

export function stopUpdates() {
    stopAccelerometerUpdates();
}