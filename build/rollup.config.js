const path = require("path");
const resolve = (p) => path.resolve(__filename, "../../", p);
const type = require("yargs").argv.type;
const buildType = {
    cjs: {
        file: resolve("dist/Lrc.cjs.js"),
        format: "cjs"
    },
    umd: {
        file: resolve("dist/Lrc.js"),
        format: "umd",
        name: "Lrc"
    },
    esm: {
        file: resolve("dist/Lrc.esm.js"),
        format: "es"
    }
};
const requestOutput = () => {
    if (Object.keys(buildType).some(v => v === type)) {
        return buildType[type];
    } else {
        throw new Error("build type failed.");
    }
};

module.exports = {
    conf: {
        name : "Lrc",
        input: resolve("index.js"),
        output: requestOutput(type),
        plugins : []
    }
};
