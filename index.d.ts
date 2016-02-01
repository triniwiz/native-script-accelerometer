export interface AccelerometerData {
    x: number;
    y: number;
    z: number;
}

export function startAccelerometerUpdates(callback: (AccelerometerData) => void);
export function stopAccelerometerUpdates();
