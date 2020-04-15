const fs = require("fs");

const _fishs = JSON.parse(fs.readFileSync("__Fish.json"));

const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const timesc = {
    "12pm": 0,
    "1am": 1,
    "2am": 2,
    "3am": 3,
    "4am": 4,
    "5am": 5,
    "6am": 6,
    "7am": 7,
    "8am": 8,
    "9am": 9,
    "10am": 10,
    "11am": 11,
    "12am": 12,
    "1pm": 13,
    "2pm": 14,
    "3pm": 15,
    "4pm": 16,
    "5pm": 17,
    "6pm": 18,
    "7pm": 19,
    "8pm": 20,
    "9pm": 21,
    "10pm": 22,
    "11pm": 23,
};


const fishs = [];

const list = [];


for (const fish of _fishs) {
    if (!fish.games.hasOwnProperty("nh")) continue;
    if (!fish.games.nh.hasOwnProperty("sources")) {
        fish.games.sources = [];
        console.log(fish.name, "NO SOURCE");
    } else {
        list.push(fish.name);
        list.push(...fish.games.nh.sources);
        const newSources = [];
        for (let _source of fish.games.nh.sources) {
            if (typeof _source !== "string") continue;
            //console.log(fish.name, _source);
            _source = _source.toLowerCase();
            const source = { region: null, times: [], months: [], locale: null };
            if (_source.includes("north")) {
                source.region = "n";
            } else if (_source.includes("south")) {
                source.region = "s";
            }
            if (_source.includes("all year")) {
                source.months = [...months];
            } else {
                for (let sm in months) {
                    sm = parseInt(sm);
                    const month = months[sm];
                    const _s = _source.replace(/[^0-9a-z-]/gi, '');
                    let i = _s.indexOf(month + "-")
                    if (i >= 0) {
                        const end = _s.substr(i + 4, 3);
                        const em = months.indexOf(end);
                        //source.months = [sm, em]; continue;
                        if (sm < em) {
                            source.months = [...source.months, ...months.slice(sm, em + 1)];
                        } else {
                            source.months = [...source.months, ...months.slice(sm), ...months.slice(0, em + 1)];
                        }
                    }
                }
            }
            if (_source.includes("all day")) {
                source.times = [...times];
            } else {
                for (let st in Object.keys(timesc)) {
                    st = parseInt(st);
                    const timec = Object.keys(timesc)[st];
                    const _s = _source.replace(/[^0-9a-z-]/gi, '');
                    let i = _s.indexOf(timec + "-")
                    if (i >= 0) {
                        const enda = _s.substr(i + (timec + "-").length, 3);
                        const endb = _s.substr(i + (timec + "-").length, 4);
                        let et = null;
                        if (timesc.hasOwnProperty(enda)) {
                            et = timesc[enda];
                        } else if (timesc.hasOwnProperty(endb)) {
                            et = timesc[endb];
                        }
                        //source.times = [timec, enda, endb];
                        //const em = months.indexOf(end);
                        //source.months = [sm, em]; continue;
                        if (st < et) {
                            source.times = [...source.times, ...times.slice(st, et)];
                        } else {
                            source.times = [...source.times, ...times.slice(st), ...times.slice(0, et)];
                        }
                    }
                }
            }
            if (_source.includes("sea")) {
                source.locale = "sea";
            } else if (_source.includes("river")) {
                source.locale = "river";
            }
            //source.trans = _source.replace(/[^0-9a-z-]/gi, '');
            newSources.push(source);
        }
        fish.games.nh.sources = newSources;
        for (const key in fish.games.nh) {
            fish[key] = fish.games.nh[key];
        }
        delete fish.games;
        fishs.push(fish);
    }
}

fs.writeFileSync("../fish.json", JSON.stringify(fishs, null, 2));