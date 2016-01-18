declare module "accelometer-service" {
    export interface AccelomenterData {
        x: number;
        y: number;
        z: number
    }

    export function startAccelometerUpdates(callback: (AccelomenterData) => void);
    export function stopAccelometerUpdates();
}