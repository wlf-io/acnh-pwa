import $ from "jquery";
import Handlebars from "handlebars";

import * as templates from "../templates";

export default class Renderer implements iRenderer {

    private views: { [k: string]: any } = {};

    private _replace: boolean = false;
    private _selector: string | null = null;

    constructor() {
        this.loadTemplates();
    }

    private targetElement(selector: string, replace: boolean): iRenderer {
        this._replace = replace;
        this._selector = selector;
        return this;
    }

    public fill(selector: string): iRenderer {
        return this.targetElement(selector, false);
    }

    public replace(selector: string): iRenderer {
        return this.targetElement(selector, true);
    }

    public with(templateName: string, data: { [k: string]: any }) {
        templateName = this.cleanTemplateName(templateName);
        if (!this.views.hasOwnProperty(templateName)) {
            throw { error: `template '${templateName}' could not be found` };
        }
        if (this._selector === null) {
            throw { error: `no selector set, use replace or fill first` };
        }
        const template = this.views[templateName];
        const result = template(data);
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
    }

    private cleanTemplateName(name: string) {
        return name.toLowerCase().replace(/[^0-9a-z]/gi, '')
    }

}