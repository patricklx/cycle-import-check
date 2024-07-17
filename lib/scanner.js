"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanDirectoryWithResult = void 0;
const file_1 = require("./file");
const newdash_1 = require("@newdash/newdash");
const processor_1 = require("./processor");
const graph_1 = require("./graph");
/**
 * scan a directory circular dependency status
 *
 * @param directory please use the absolute path
 */
const scanDirectoryWithResult = (directory) => {
    const nodeDependencies = (0, file_1.allDependencies)(directory);
    const filePath = (0, file_1.listAllFile)(directory, ["js", "jsx", "ts", "tsx", "mjs"]);
    const filesContents = (0, newdash_1.map)(filePath, filepath => ({ filepath, content: (0, file_1.readFile)(filepath) }));
    const filteredImports = (0, newdash_1.reduce)(filesContents, (pre, file) => (0, newdash_1.concat)(pre, (0, file_1.filterNodeDependenciesImport)((0, processor_1.findFileDependencies)(file.filepath, file.content), nodeDependencies)), []);
    const result = (0, graph_1.calculateCycleImport)(filePath, filteredImports);
    if (result && result.length > 0) {
        return {
            haveCycle: true,
            cycleList: result,
            nodes: filePath,
            imports: filteredImports,
        };
    }
    else {
        return {
            haveCycle: false,
            cycleList: [],
            nodes: filePath,
            imports: filteredImports,
        };
    }
};
exports.scanDirectoryWithResult = scanDirectoryWithResult;
//# sourceMappingURL=scanner.js.map