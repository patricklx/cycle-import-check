import { FileImportDescription } from "./type";
/**
 * findFileDependencies
 *
 * @param fileAbsolutePath
 * @param fileCodeString
 */
export declare const findFileDependencies: (fileAbsolutePath: string, fileCodeString: string) => FileImportDescription[];
