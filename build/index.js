const chalk = require("chalk");
const path = require("path");
const cp = require("child_process");
const yargs = require("yargs").argv;
const buildType = yargs.type;
const allBuildTypes = ["umd", "cjs", "esm"];
const isBuildAll = yargs.all;

function build(type) {
    return new Promise(function (res, rej) {
        let execText = `rollup -c ${path.resolve(__filename, "../rollup.prod.js")} --type=${type}`;
        console.log(chalk.yellow("building..."));
        console.log(chalk.cyan(execText));
        cp.exec(execText, (err, stdout, stderr) => {
            if (!err) {
                res(stdout);
            } else {
                rej(stderr);
            }
        });
    });
}

let promises = [];

if (isBuildAll) {
    promises = allBuildTypes.map(type => build(type));
} else if (allBuildTypes.some(v => v === buildType)) {
    promises = build(buildType);
} else {
    throw Error("Please specify a correct build type. eg.cjs, umd, esm.");
}

if (promises.length > 0) {
    Promise.all(promises).then(function () {
        console.log(chalk.green("build success."));
    }).catch(function (err) {
        console.log(chalk.red("build failed."));
        console.error("stack msg:" + chalk.red(err));
    })
}

