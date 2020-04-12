import $ from "jquery";
import Handlebars from "handlebars";

import * as templates from "./templates";

export default class Renderer {
    private static instance: Renderer | null = null;
    private static loaded: boolean = false;


    private views: { [k: string]: any } = {};

    private _replace: boolean = false;
    private _selector: string | null = null;

    public static Get() {
        if (Renderer.instance === null) {
            Renderer.instance = new Renderer();
        }
        return Renderer.instance;
    }

    private constructor() {
        if (Renderer.loaded) {
            throw { error: "RENDERER SHOULD RUN CONSTRUCTOR MORE THAN ONCE" };
        }
        this.loadTemplates();
        Renderer.loaded = true;
    }

    private targetElement(selector: string, replace: boolean) {
        this._replace = replace;
        this._selector = selector;
        return this;
    }

    public fill(selector: string) {
        return this.targetElement(selector, false);
    }

    public replace(selector: string) {
        return this.targetElement(selector, true);
    }

    public with(templateName: string, data: { [k: string]: any }) {
        console.log("WITH");
        templateName = this.cleanTemplateName(templateName);
        if (!this.views.hasOwnProperty(templateName)) {
            throw { error: `template '${templateName}' could not be found` };
        }
        if (this._selector === null) {
            throw { error: `no selector set, use replace or fill first` };
        }
        console.log("CHECKS", this.views[templateName]);
        const template = this.views[templateName];
        console.log("template");
        const result = template(data);
        console.log("TEMPLATING", this._replace, templateName, data, result);
        if (this._replace) {
            $(this._selector).replaceWith(result);
        } else {
            $(this._selector).html(result);
        }
        this._replace = false;
        this._selector = null;
    }

    private loadTemplates() {
        for (const templateName in templates) {
            // @ts-ignore
            this.views[this.cleanTemplateName(templateName)] = Handlebars.compile(templates[templateName]);
        }
        console.log("LOADED");
    }

    private cleanTemplateName(name: string) {
        return name.toLowerCase().replace(/[^0-9a-z]/gi, '')
    }

}