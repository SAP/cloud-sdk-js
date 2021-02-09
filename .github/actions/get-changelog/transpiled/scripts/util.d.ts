export declare const version: any;
export declare const docsDir: string;
export declare const apiDocsDir: string;
export declare function transformFile(filePath: any, tranformFn: any): void;
export declare function jsonStringify(json: any): string;
export declare function openFile(filePath: any): string;
export declare function getAllLernaModules(): Promise<LernaModule[]>;
export declare function getNonTestLernaModules(): Promise<LernaModule[]>;
interface LernaModule {
    name: string;
    version: string;
    private: boolean;
    location: string;
}
export {};
