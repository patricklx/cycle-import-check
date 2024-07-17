import { ScanResult } from "./type";
/**
 * scan a directory circular dependency status
 *
 * @param directory please use the absolute path
 */
export declare const scanDirectoryWithResult: (directory: string) => ScanResult;
