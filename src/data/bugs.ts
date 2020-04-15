import raw from "./raw/__Bugs.json";

const filtered = raw.filter((val) => {
    return val.games.hasOwnProperty("nh");
});

export default filtered;