import { Extension, FileImportDescription, PackageJson, ReportVO, ScanResult } from "./type";
export declare const allDependencies: (absPath: string) => string[];
export declare const concatAllDependencies: (json: PackageJson) => string[];
export declare const findProjectPackageJson: (absPath: string) => PackageJson;
export declare const filterNodeDependenciesImport: (descriptions: FileImportDescription[], dependencies: string[]) => FileImportDescription[];
/**
 * list all acceptable files in a specific directory
 *
 * @param dir
 * @param ext
 */
export declare const listAllFile: (dir: string, ext?: Extension[]) => string[];
/**
 * read file content
 *
 * @param absolutePath
 */
export declare const readFile: (absolutePath: string) => string;
/**
 * will throw error if file not exist
 *
 * @param fromFileAbsolutePath
 * @param importFileRelativePath
 */
export declare const resolveFilePath: (fromFileAbsolutePath: string, importFileRelativePath: string) => string;
/**
 * map absolute path to relative path
 *
 * @param paths
 */
export declare const mapAbsPathsToRelPaths: (paths: string | string[]) => string | string[];
export declare const mapScanResultToReportVO: (result: ScanResult) => ReportVO;
