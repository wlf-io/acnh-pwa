import $ from "jquery";
import { Renderer, Storage, ACDay } from "./services";
import Checklist from "./components/Checklist";
import Data from "./data";
import EditableChecklist from "./components/EditableChecklist";

export default class App {
    public static Factory(): App {
        return new App();
    }

    private storage: iStorage;
    private renderer: iRenderer;
    private acday: iACDay;

    private components: iComponent[] = [];

    constructor() {
        this.storage = new Storage();
        this.renderer = new Renderer();
        this.acday = new ACDay();
        this.components = [
            new EditableChecklist("taskCheckboxes", "checklistItems", this.storage, this.renderer, this.acday, Data.DefaultChecklist),
            new Checklist("storesCheckboxes", "checkListItems", this.storage, this.renderer, this.acday, Data.StoreList),
            new EditableChecklist("villagersCheckboxes", "checkListItems", this.storage, this.renderer, this.acday, []),
        ];

    }

    public run() {
        $(document).ready(() => this.start());
        this.registerServiceWorker();
    }

    private start() {
        this.components
            .forEach(component => component.run());
    }

    private registerServiceWorker() {
        if (navigator.serviceWorker) {
            console.log("Register service worker");
            navigator.serviceWorker.register("/sw.js");
        }
    }
}