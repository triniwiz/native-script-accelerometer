declare module "native-script-accelerometer" {
    export interface AccelomenterData {
        x: number;
        y: number;
        z: number;
    }

    export function startAccelometerUpdates(callback: (AccelomenterData) => void);
    export function stopAccelometerUpdates();
}