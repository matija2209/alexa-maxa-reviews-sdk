export declare class ReviewsSDKError extends Error {
    code: string;
    details?: string | undefined;
    status?: number | undefined;
    originalError?: Error | undefined;
    constructor(message: string, code: string, details?: string | undefined, status?: number | undefined, originalError?: Error | undefined);
}
export declare function handleAPIError(response: Response, data?: any): never;
export declare function handleNetworkError(error: Error): never;
export declare function validateConfig(config: any): void;
