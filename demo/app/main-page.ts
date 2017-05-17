import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { startAccelerometerUpdates, AccelerometerData } from "nativescript-accelerometer";
import { Observable } from 'data/observable';

let isListening = false;
// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  let context = new Observable();
  page.bindingContext = context;

  if (!isListening) {
    isListening = true;
    startAccelerometerUpdates((data: AccelerometerData) => {
      context.set("x", data.x.toFixed(4));
      context.set("y", data.y.toFixed(4));
      context.set("z", data.z.toFixed(4));
    }, { sensorDelay: "ui" });
  }
}