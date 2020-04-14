interface iRenderer {
    fill: (selector: string) => iRenderer;
    replace: (selector: string) => iRenderer;
    with: (template: string, data: { [k: string]: any }) => void;
}

interface iStorage {
    get: (key: string, def?: any) => any;
    set: (key: string, data: any) => iStorage;
    hook: (key: string, cb: (data: any, key: string) => void) => iStorage;
}

interface iACDay {
    currentACDate: () => string;
    currentACTime: () => string;

    convertToACDate: (date: String) => string;
    convertToACTime: (time: String) => string;
}

interface iComponent {
    run: () => void;
}