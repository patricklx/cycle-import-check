"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapScanResultToReportVO = exports.mapAbsPathsToRelPaths = exports.resolveFilePath = exports.readFile = exports.listAllFile = exports.filterNodeDependenciesImport = exports.findProjectPackageJson = exports.concatAllDependencies = exports.allDependencies = void 0;
const newdash_1 = require("@newdash/newdash");
const includes_1 = require("@newdash/newdash/includes");
const fs_1 = require("fs");
const glob_1 = require("glob");
const path_1 = require("path");
const process_1 = require("process");
require.extensions[".ts"] = require.extensions[".js"];
require.extensions[".jsx"] = require.extensions[".js"];
require.extensions[".tsx"] = require.extensions[".js"];
require.extensions[".mjs"] = require.extensions[".js"];
const { resolve } = require;
const allDependencies = (absPath) => {
    return (0, exports.concatAllDependencies)((0, exports.findProjectPackageJson)(absPath));
};
exports.allDependencies = allDependencies;
const concatAllDependencies = (json) => {
    try {
        const { dependencies, devDependencies, peerDependencies } = json;
        var rt = [];
        if (dependencies) {
            rt = (0, newdash_1.concat)(rt, (0, newdash_1.keys)(dependencies));
        }
        if (devDependencies) {
            rt = (0, newdash_1.concat)(rt, (0, newdash_1.keys)(devDependencies));
        }
        if (peerDependencies) {
            rt = (0, newdash_1.concat)(rt, (0, newdash_1.keys)(peerDependencies));
        }
        return rt;
    }
    catch (error) {
        throw new Error("please run cycle-import-check in npm project (with project.json)");
    }
};
exports.concatAllDependencies = concatAllDependencies;
const findProjectPackageJson = (absPath) => {
    const finder = require("find-package-json")(absPath);
    return finder.next().value;
};
exports.findProjectPackageJson = findProjectPackageJson;
const filterNodeDependenciesImport = (descriptions, dependencies) => {
    // @ts-ignore
    return (0, newdash_1.filter)(descriptions, i => !(0, includes_1.includes)(dependencies, i.importFile));
};
exports.filterNodeDependenciesImport = filterNodeDependenciesImport;
/**
 * list all acceptable files in a specific directory
 *
 * @param dir
 * @param ext
 */
const listAllFile = (dir, ext = []) => {
    return (0, glob_1.sync)((0, path_1.join)(dir, `./**/*.{${(0, newdash_1.join)(ext, ",")}}`), {
        realpath: true,
        ignore: [
            "**/node_modules/**"
        ]
    });
};
exports.listAllFile = listAllFile;
/**
 * read file content
 *
 * @param absolutePath
 */
const readFile = (absolutePath) => {
    return (0, fs_1.readFileSync)(absolutePath, { encoding: "utf8" });
};
exports.readFile = readFile;
/**
 * will throw error if file not exist
 *
 * @param fromFileAbsolutePath
 * @param importFileRelativePath
 */
const resolveFilePath = (fromFileAbsolutePath, importFileRelativePath) => {
    const dir = (0, path_1.dirname)(fromFileAbsolutePath);
    let targetPath = (0, path_1.join)(dir, importFileRelativePath);
    // to do replace nodejs resolve function
    try {
        return (0, path_1.normalize)(resolve(targetPath));
    }
    catch (error) {
    }
    targetPath = (0, path_1.join)(process.cwd(), importFileRelativePath);
    // to do replace nodejs resolve function
    try {
        return (0, path_1.normalize)(resolve(targetPath));
    }
    catch (error) {
        // can not resolve import file
        return "";
    }
};
exports.resolveFilePath = resolveFilePath;
/**
 * map absolute path to relative path
 *
 * @param paths
 */
const mapAbsPathsToRelPaths = (paths) => {
    if ((0, newdash_1.isString)(paths)) {
        return (0, path_1.relative)((0, process_1.cwd)(), paths);
    }
    if ((0, newdash_1.isArray)(paths)) {
        return (0, newdash_1.map)(paths, p => (0, path_1.relative)((0, process_1.cwd)(), p));
    }
};
exports.mapAbsPathsToRelPaths = mapAbsPathsToRelPaths;
const mapScanResultToReportVO = (result) => {
    var rt = { nodes: [], links: [] };
    rt.nodes = (0, newdash_1.map)(result.nodes, n => ({ name: (0, exports.mapAbsPathsToRelPaths)(n) }));
    rt.links = (0, newdash_1.map)(result.imports, i => ({
        source: (0, exports.mapAbsPathsToRelPaths)(i.fromFile),
        target: (0, exports.mapAbsPathsToRelPaths)(i.importFile),
        value: i.code,
    }));
    return rt;
};
exports.mapScanResultToReportVO = mapScanResultToReportVO;
//# sourceMappingURL=file.js.map