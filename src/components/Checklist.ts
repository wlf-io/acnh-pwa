import $ from "jquery";

export default class Checklist implements iComponent {
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
        storage: iStorage,
        renderer: iRenderer,
        acday: iACDay,
        defaultItems: string[] = [],
    ) {
        this.rootElementID = rootElementID;
        this.templateName = templateName;
        this.storage = storage;
        this.renderer = renderer;
        this.acday = acday;
        this.defaultItemList = defaultItems;
        this.buildItemList();
    }

    public run() {
        this.draw(Date.now().toString());
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

    private draw(date: string) {
        const acdate = this.acday.convertToACDate(date);
        this.renderer
            .fill(`#${this.rootElementID}`)
            .with(this.templateName, this.getRenderDataForDate(acdate));
        this.bindChecklist();
        this.shownDate = acdate;
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