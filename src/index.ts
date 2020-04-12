import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/custom.css";
import $ from "jquery";

import Renderer from "./Renderer";

const renderer = Renderer.Get();

$(document).ready(() => {
    renderer.fill("#taskCheckboxes")
        .with("checklistItems", { items: [{ id: "aaa", text: "Aaa" }, { id: "bbb", text: "Bbb" }, { id: "ccc", text: "Ccc" }] });
});

if (navigator.serviceWorker) {
    console.log("REGISTER SERVICE WORKER");
    navigator.serviceWorker.register("/sw.js");
}