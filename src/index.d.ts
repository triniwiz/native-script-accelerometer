export interface AccelerometerData {
    x: number;
    y: number;
    z: number;
}

export type SensorDelay = "normal" | "game" | "ui" | "fastest";
export interface AccelerometerOptions {
    sensorDelay?: SensorDelay;
}

export function startAccelerometerUpdates(callback: (AccelerometerData) => void, options?: AccelerometerOptions);
export function stopAccelerometerUpdates();
