#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const process_1 = require("process");
const console_1 = require("console");
const newdash_1 = require("@newdash/newdash");
const scanner_1 = require("./scanner");
const path_1 = require("path");
const file_1 = require("./file");
const workspaceDir = (0, process_1.cwd)();
var directory = process_1.argv[2];
if ((0, newdash_1.isEmpty)(directory)) {
    directory = ".";
}
if (!(0, path_1.isAbsolute)(directory)) {
    directory = (0, path_1.join)(workspaceDir, directory);
}
(0, console_1.log)(`\nCircular dependency checker running at ${directory}`.green);
const exit = (code) => {
    (0, console_1.log)("\n");
    (0, process_1.exit)(code);
};
try {
    const result = (0, scanner_1.scanDirectoryWithResult)(directory);
    if (result.haveCycle) {
        (0, console_1.error)(`Circular dependency existed in ${directory}`.red);
        (0, newdash_1.forEach)(result.cycleList, (cycle, index) => {
            (0, console_1.error)(`\ncycle ${index + 1}, size (${cycle.length}):${cycle.length === 1 ? " this file import itself".grey : " these files circular import each other".cyan}\n`);
            // @ts-ignore
            (0, newdash_1.forEach)((0, file_1.mapAbsPathsToRelPaths)(cycle), c => (0, console_1.error)(`  ${c}`.red));
        });
        exit(1);
    }
    else {
        (0, console_1.log)(`Not found circular dependency in ${directory}`.green);
        exit(0);
    }
}
catch (error) {
    (0, console_1.log)(error.message.red);
    exit(1);
}
//# sourceMappingURL=cli.js.map