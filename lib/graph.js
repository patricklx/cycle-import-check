"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCycleImport = void 0;
const graphlib_1 = require("@newdash/graphlib");
const newdash_1 = require("@newdash/newdash");
/**
 * calculate cycle import file
 *
 * @param fileAbsPathList files absolutely path
 * @param imports each file's import
 */
const calculateCycleImport = (fileAbsPathList, imports) => {
    const new_graph = new graphlib_1.Graph({ directed: true });
    new_graph.setNodes(fileAbsPathList);
    (0, newdash_1.forEach)(imports, i => new_graph.setEdge(i.fromFile, i.importFile));
    return graphlib_1.alg.findCycles(new_graph);
};
exports.calculateCycleImport = calculateCycleImport;
//# sourceMappingURL=graph.js.map