import $ from "jquery";
import { Renderer, Storage, ACDay } from "./services";
import Checklist from "./components/Checklist";
import Data from "./data";
import EditableChecklist from "./components/EditableChecklist";
import CritterCatalouge from "./components/CritterCatalouge";

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
            new EditableChecklist("taskCheckboxes", "checklistItems", this.renderer, this.storage, this.acday, Data.DefaultChecklist),
            new Checklist("storesCheckboxes", "checkListItems", this.renderer, this.storage, this.acday, Data.StoreList),
            new EditableChecklist("villagersCheckboxes", "checkListItems", this.renderer, this.storage, this.acday, ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]),
            new CritterCatalouge("fishCatalouge", "critterCatalouge", this.renderer, Data.FishList),
            new CritterCatalouge("bugsCatalouge", "critterCatalouge", this.renderer, Data.BugsList),
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