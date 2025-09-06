// Main SDK class
export { ReviewsSDK } from './client';

// Error handling
export { ReviewsSDKError } from './errors';

// Type exports
export type {
  ReviewsSDKConfig,
  ReviewFilters,
  CreateReviewData,
  UpdateReviewData,
  CreateReviewRequest,
  UpdateReviewRequest,
  DeleteReviewRequest,
  ApproveReviewRequest,
  APIReview,
  ReviewsAPIResponse,
  SingleReviewAPIResponse,
  DeleteReviewAPIResponse,
  ReviewsErrorResponse,
} from './types';