import { Injectable, OnDestroy } from '@angular/core';
import { startAccelerometerUpdates, AccelerometerData, stopAccelerometerUpdates, isListening } from "nativescript-accelerometer";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AccelerometerService implements OnDestroy {
    private _data$: BehaviorSubject<AccelerometerData> = new BehaviorSubject({ x: 0, y: 0, z: 0 });

    get data$(): Observable<AccelerometerData> {
        return this._data$;
    }

    constructor() { }

    start() {
        startAccelerometerUpdates((data) => {
            // console.dir(data);
            this._data$.next(data);
        }, { sensorDelay: "ui" });
    }

    stop() {
        stopAccelerometerUpdates();
    }

    isListening() {
        return isListening();
    }

    ngOnDestroy() {
        console.log("AccelerometerService.ngOnDestroy()")
        if (this.isListening()) {
            this.stop();
        }
    }
}
