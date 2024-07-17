import { FileImportDescription } from "./type";
/**
 * calculate cycle import file
 *
 * @param fileAbsPathList files absolutely path
 * @param imports each file's import
 */
export declare const calculateCycleImport: (fileAbsPathList: string[], imports: FileImportDescription[]) => string[][];
