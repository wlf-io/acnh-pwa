import { isEven, isOdd } from "./numeric";
import { HelperDelegate } from "handlebars";

const Helpers: { [k: string]: HelperDelegate } = {
    isEven,
    isOdd,
};

export default Helpers;