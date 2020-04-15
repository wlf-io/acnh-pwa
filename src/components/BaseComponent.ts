export default abstract class BaseComponent implements iComponent {
    protected rootElementID: string;
    protected renderer: iRenderer;
    protected templateName: string;

    constructor(
        rootElementID: string,
        templateName: string,
        renderer: iRenderer) {
        this.rootElementID = rootElementID;
        this.templateName = templateName;
        this.renderer = renderer;
    }

    public run() {
        this.draw();
    }

    protected draw() {
        if (!this.preDraw()) {
            return;
        }
        this.renderer
            .fill(`#${this.rootElementID}`)
            .with(this.templateName, this.getRenderData());
        this.postDraw();
    }

    protected abstract getRenderData(): { [k: string]: any };

    protected postDraw() {

    }

    protected preDraw(): boolean {
        return true;
    }
}