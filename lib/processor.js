"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFileDependencies = void 0;
const file_1 = require("./file");
const parser_1 = require("@babel/parser");
const traverse_1 = require("@babel/traverse");
/**
 * findFileDependencies
 *
 * @param fileAbsolutePath
 * @param fileCodeString
 */
const findFileDependencies = (fileAbsolutePath, fileCodeString) => {
    const result = [];
    try {
        const ast = (0, parser_1.parse)(fileCodeString, {
            sourceType: "unambiguous",
            plugins: [
                "typescript",
                "jsx",
                "decorators-legacy",
            ]
        });
        (0, traverse_1.default)(ast, {
            ImportDeclaration: (p) => {
                const { node } = p;
                if (node.source) {
                    const importPath = node.source.value;
                    // only relative module
                    const sourceFile = (0, file_1.resolveFilePath)(fileAbsolutePath, node.source.value);
                    if (sourceFile) {
                        result.push({
                            fromFile: fileAbsolutePath,
                            importFile: sourceFile,
                            code: fileCodeString.slice(node.start, node.end)
                        });
                    }
                }
            },
            ExportNamedDeclaration: (p) => {
                const { node } = p;
                if (node.source) {
                    const sourceFile = (0, file_1.resolveFilePath)(fileAbsolutePath, node.source.value);
                    if (sourceFile) {
                        result.push({
                            fromFile: fileAbsolutePath,
                            importFile: sourceFile,
                            code: fileCodeString.slice(node.start, node.end)
                        });
                    }
                }
            },
            ExportAllDeclaration: (p) => {
                const { node } = p;
                if (node.source) {
                    const sourceFile = (0, file_1.resolveFilePath)(fileAbsolutePath, node.source.value);
                    if (sourceFile) {
                        result.push({
                            fromFile: fileAbsolutePath,
                            importFile: sourceFile,
                            code: fileCodeString.slice(node.start, node.end)
                        });
                    }
                }
            },
            CallExpression: (p) => {
                var _a, _b, _c;
                const { node } = p;
                if ((((_a = node.callee) === null || _a === void 0 ? void 0 : _a.type) === "Identifier" && node.callee.name === "require" ||
                    ((_b = node.callee) === null || _b === void 0 ? void 0 : _b.type) === "Import")) {
                    if (((_c = node.arguments) === null || _c === void 0 ? void 0 : _c.length) >= 1 && (node === null || node === void 0 ? void 0 : node.arguments[0].type) === "StringLiteral") {
                        const importRelPath = node.arguments[0].value;
                        const sourceFile = (0, file_1.resolveFilePath)(fileAbsolutePath, importRelPath);
                        if (sourceFile) {
                            result.push({
                                fromFile: fileAbsolutePath,
                                importFile: sourceFile,
                                code: fileCodeString.slice(node.start, node.end)
                            });
                        }
                    }
                }
            }
        });
    }
    catch (error) {
        console.error("Error while parsing", fileAbsolutePath);
        throw error;
    }
    return result;
};
exports.findFileDependencies = findFileDependencies;
//# sourceMappingURL=processor.js.map