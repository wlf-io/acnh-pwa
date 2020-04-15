import $ from "jquery";
import BaseComponent from "./BaseComponent";

export default class Checklist extends BaseComponent {
    protected defaultItemList: string[] = [];

    protected renderer: iRenderer;
    protected storage: iStorage;
    protected acday: iACDay;

    protected items: { [k: string]: string } = {};
    protected shownDate: string = "";

    protected rootElementID: string;
    protected templateName: string;

    constructor(
        rootElementID: string,
        templateName: string,
        renderer: iRenderer,
        storage: iStorage,
        acday: iACDay,
        defaultItems: string[] = [],
    ) {
        super(rootElementID, templateName, renderer)
        this.rootElementID = rootElementID;
        this.templateName = templateName;
        this.storage = storage;
        this.renderer = renderer;
        this.acday = acday;
        this.defaultItemList = defaultItems;
        this.shownDate = this.acday.currentACDate();
        this.buildItemList();
    }

    protected getItemList() {
        return this.defaultItemList;
    }

    private buildItemList() {
        const items: string[] = this.getItemList();
        this.items = items.reduce((output, input) => {
            const cleanInput = this.cleanListItemName(input);
            return { [cleanInput]: input, ...output };
        }, {});
        console.log(this.items);
    }

    private bindChecklist() {
        $(`#${this.rootElementID} input`).on("input", event => {
            const input = $(event.target);
            const data = input.data();
            this.setItemChecked(this.items[data.item], input.is(":checked"));
        });
    }

    protected postDraw() {
        this.bindChecklist();
    }

    protected getRenderData() {
        return this.getRenderDataForDate(this.shownDate);
    }

    private getDataKey(date: string): string {
        return `${this.rootElementID}_data_${date}`;
    }

    private getDataForDate(acdate: string) {
        return this.storage.get(this.getDataKey(acdate), {});
    }

    private setDataForDate(acdate: string, data: { [k: string]: boolean }) {
        this.storage.set(this.getDataKey(acdate), data);
    }

    private getRenderDataForDate(acdate: string) {
        const store = this.getDataForDate(acdate);
        let data: any[] = [];
        for (const id in this.items) {
            const text = this.items[id];
            data = [
                {
                    id: id,
                    text: text,
                    checked: store[text] || false,
                },
                ...data,
            ];
        }
        return { items: data };
    }

    private cleanListItemName(name: string): string {
        return name.toLowerCase().replace(/[^0-9a-z]/gi, '');
    }

    private setItemChecked(key: string, checked: boolean) {
        const data: { [k: string]: boolean } = this.getDataForDate(this.shownDate);
        data[key] = checked;
        console.log(this.shownDate, data);
        this.setDataForDate(this.shownDate, data);
    }

}