export default class Storage implements iStorage {
    private static readonly prefix: string = "acnh_pwa_";

    private _hooks: { [k: string]: Array<(data: any, key: string) => void> } = {};

    constructor() {
        window.addEventListener("storage", (ev: StorageEvent) => this.storageEvent(ev));
    }

    public get(key: string, def: any = null) {
        const raw = window.localStorage.getItem(`${Storage.prefix}${key}`);
        if (raw === null) {
            return def || null;
        }
        return JSON.parse(raw);
    }

    public set(key: string, data: any): iStorage {
        console.log("STORAGE", "SET", key, data);
        window.localStorage.setItem(`${Storage.prefix}${key}`, JSON.stringify(data));
        this.triggerHooks(key, data);
        return this;
    }

    private storageEvent(ev: StorageEvent) {
        const key = ev.key || "";
        if (!key.startsWith(Storage.prefix)) {
            return;
        }
        const raw = ev.newValue || "null";
        this.triggerHooks(key, JSON.parse(raw));
    }

    private triggerHooks(key: string, data: any) {
        const hooks = this._hooks[key] || [];
        hooks.forEach(hook => hook(data, key));
    }

    public hook(key: string, cb: (data: any, key: string) => void): iStorage {
        this._hooks[key] = [cb, ...(this._hooks[key] || [])];
        return this;
    }
}