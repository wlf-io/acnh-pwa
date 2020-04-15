import { HelperOptions, HelperDelegate } from "handlebars";

export const isEven: HelperDelegate = function (n: number, options: HelperOptions) {
    // @ts-ignore
    const that: any = this;
    if (n & 1) {
        return options.inverse(that)
    } else {
        return options.fn(that);
    }
};
export const isOdd: HelperDelegate = function (n: number, options: HelperOptions) {
    // @ts-ignore
    const that: any = this;
    if (n & 1) {
        return options.fn(that);
    } else {
        return options.inverse(that)
    }
};