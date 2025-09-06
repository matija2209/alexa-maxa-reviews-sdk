"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsSDKError = void 0;
exports.handleAPIError = handleAPIError;
exports.handleNetworkError = handleNetworkError;
exports.validateConfig = validateConfig;
class ReviewsSDKError extends Error {
    code;
    details;
    status;
    originalError;
    constructor(message, code, details, status, originalError) {
        super(message);
        this.code = code;
        this.details = details;
        this.status = status;
        this.originalError = originalError;
        this.name = 'ReviewsSDKError';
    }
}
exports.ReviewsSDKError = ReviewsSDKError;
function handleAPIError(response, data) {
    // Authentication errors
    if (response.status === 401) {
        throw new ReviewsSDKError('Invalid or missing API key', 'AUTHENTICATION_ERROR', 'Check your API key configuration', 401);
    }
    // Not found errors
    if (response.status === 404) {
        throw new ReviewsSDKError('Resource not found', 'NOT_FOUND', data?.error?.message || 'The requested resource was not found', 404);
    }
    // Validation errors
    if (response.status === 400) {
        throw new ReviewsSDKError('Bad request', 'VALIDATION_ERROR', data?.error?.message || 'Invalid request data', 400);
    }
    // Forbidden errors
    if (response.status === 403) {
        throw new ReviewsSDKError('Forbidden', 'PERMISSION_ERROR', data?.error?.message || 'Insufficient permissions for this operation', 403);
    }
    // Conflict errors (e.g., duplicate review)
    if (response.status === 409) {
        throw new ReviewsSDKError('Conflict', 'CONFLICT_ERROR', data?.error?.message || 'Resource conflict occurred', 409);
    }
    // Rate limiting
    if (response.status === 429) {
        throw new ReviewsSDKError('Rate limit exceeded', 'RATE_LIMIT_ERROR', data?.error?.message || 'Too many requests. Please try again later.', 429);
    }
    // Server errors
    if (response.status >= 500) {
        throw new ReviewsSDKError('Internal server error', 'SERVER_ERROR', data?.error?.message || 'Reviews service is temporarily unavailable', response.status);
    }
    // Generic HTTP error
    throw new ReviewsSDKError(`HTTP ${response.status}: ${response.statusText}`, 'HTTP_ERROR', data?.error?.message || 'Unknown API error', response.status);
}
function handleNetworkError(error) {
    // Network/fetch errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new ReviewsSDKError('Failed to connect to reviews service', 'NETWORK_ERROR', 'Check your internet connection and try again', undefined, error);
    }
    // Timeout errors
    if (error.name === 'AbortError' || error.message.includes('timeout')) {
        throw new ReviewsSDKError('Request timed out', 'TIMEOUT_ERROR', 'The request took too long to complete. Please try again.', undefined, error);
    }
    // Generic error
    throw new ReviewsSDKError('Unknown error occurred', 'UNKNOWN_ERROR', error.message, undefined, error);
}
function validateConfig(config) {
    if (!config.apiKey) {
        throw new ReviewsSDKError('API key is required', 'CONFIGURATION_ERROR', 'Provide apiKey in ReviewsSDK constructor');
    }
    if (!config.baseUrl) {
        throw new ReviewsSDKError('Base URL is required', 'CONFIGURATION_ERROR', 'Provide baseUrl in ReviewsSDK constructor');
    }
    if (config.timeout && (typeof config.timeout !== 'number' || config.timeout <= 0)) {
        throw new ReviewsSDKError('Invalid timeout value', 'CONFIGURATION_ERROR', 'Timeout must be a positive number');
    }
}
