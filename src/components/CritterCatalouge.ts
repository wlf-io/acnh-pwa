import BaseComponent from "./BaseComponent";

export default class CritterCatalouge extends BaseComponent {
    private baseData: Array<iCritterData>;

    constructor(
        rootElementID: string,
        templateName: string,
        renderer: iRenderer,
        baseData: Array<iCritterData>
    ) {
        super(rootElementID, templateName, renderer);
        this.baseData = baseData;
    }

    protected getRenderData(): { [k: string]: any } {
        return {
            critters: this.baseData
        };
    }
}