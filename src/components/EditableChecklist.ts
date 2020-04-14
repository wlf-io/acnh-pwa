import Checklist from "./Checklist";

export default class EditableChecklist extends Checklist {

    private getItemNamesKey() {
        return `${this.rootElementID}_items`;
    }

    protected getItemList() {
        return this.storage.get(this.getItemNamesKey(), this.defaultItemList);
    }
}