# Reviews SDK

A TypeScript SDK for the Reviews Headless API, providing a clean interface for all CRUD operations on product reviews.

## Installation

```bash
npm install @alexa-maxa/reviews-sdk
```

## Quick Start

```typescript
import { ReviewsSDK } from '@alexa-maxa/reviews-sdk';

const reviewsSDK = new ReviewsSDK({
  apiKey: process.env.REVIEWS_HEADLESS_API_KEY!,
  baseUrl: process.env.REVIEWS_HEADLESS_API_URL!,
  timeout: 30000, // optional, defaults to 30 seconds
});

// Get reviews for a product
const reviews = await reviewsSDK.getByProduct('product-id', {
  page: 1,
  limit: 10,
  sortBy: 'submittedAt',
  sortOrder: 'desc'
});

// Create a new review
const newReview = await reviewsSDK.create({
  productId: 'gid://shopify/Product/123',
  productHandle: 'product-handle',
  rating: '5',
  title: 'Great product!',
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  description: 'Really loved this product!'
});
```

## Features

- 🔧 **Full CRUD Support**: Create, Read, Update, Delete, and Approve reviews
- 🛡️ **Type Safety**: Full TypeScript support with comprehensive type definitions
- ⚡ **Error Handling**: Centralized error handling with specific error codes
- 🌐 **Server-Side Focused**: Optimized for Next.js server components and API routes
- 📦 **Zero Dependencies**: Lightweight with no external runtime dependencies

## API Reference

### Constructor

```typescript
new ReviewsSDK(config: ReviewsSDKConfig)
```

**Config Options:**
- `apiKey` (string): Your Reviews Headless API key
- `baseUrl` (string): The base URL for the Reviews API
- `timeout` (number, optional): Request timeout in milliseconds (default: 30000)

### Methods

#### `getByProduct(productId, filters?)`

Get reviews for a specific product with optional filtering.

```typescript
const reviews = await reviewsSDK.getByProduct('product-id', {
  rating: 5,           // Filter by rating (1-5 or "all")
  sortBy: 'rating',    // Sort by 'submittedAt' or 'rating'
  sortOrder: 'desc',   // 'asc' or 'desc'
  page: 1,             // Page number
  limit: 10            // Results per page
});
```

#### `getById(reviewId)`

Get a single review by its ID.

```typescript
const review = await reviewsSDK.getById('review-id');
```

#### `create(data)`

Create a new review.

```typescript
const newReview = await reviewsSDK.create({
  productId: 'gid://shopify/Product/123',
  productHandle: 'product-handle',
  rating: '5',
  title: 'Great product!',
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  description: 'Really loved this product!'
});
```

#### `update(reviewId, data)`

Update an existing review.

```typescript
const updatedReview = await reviewsSDK.update('review-id', {
  title: 'Updated title',
  description: 'Updated description',
  rating: '4'
});
```

#### `delete(reviewId)`

Delete a review.

```typescript
const result = await reviewsSDK.delete('review-id');
```

#### `approve(reviewId)`

Approve a review (admin operation).

```typescript
const approvedReview = await reviewsSDK.approve('review-id');
```

#### `getAll(filters?)` & `getPending(filters?)`

Admin operations for getting all reviews or pending reviews.

```typescript
// Get all reviews (admin)
const allReviews = await reviewsSDK.getAll({ page: 1, limit: 20 });

// Get pending reviews (admin)
const pendingReviews = await reviewsSDK.getPending({ page: 1, limit: 20 });
```

## Error Handling

The SDK throws `ReviewsSDKError` instances with specific error codes:

```typescript
import { ReviewsSDKError } from '@alexa-maxa/reviews-sdk';

try {
  await reviewsSDK.getByProduct('product-id');
} catch (error) {
  if (error instanceof ReviewsSDKError) {
    console.log(`Error: ${error.message}`);
    console.log(`Code: ${error.code}`);
    console.log(`Status: ${error.status}`);
    
    switch (error.code) {
      case 'NOT_FOUND':
        // Handle not found
        break;
      case 'AUTHENTICATION_ERROR':
        // Handle auth error
        break;
      case 'NETWORK_ERROR':
        // Handle network error
        break;
      // ... other error codes
    }
  }
}
```

### Error Codes

- `AUTHENTICATION_ERROR`: Invalid or missing API key
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid request data
- `PERMISSION_ERROR`: Insufficient permissions
- `CONFLICT_ERROR`: Resource conflict (e.g., duplicate review)
- `RATE_LIMIT_ERROR`: Too many requests
- `SERVER_ERROR`: Internal server error
- `NETWORK_ERROR`: Network connection failed
- `TIMEOUT_ERROR`: Request timed out
- `HTTP_ERROR`: Generic HTTP error
- `UNKNOWN_ERROR`: Unknown error occurred

## Usage with Next.js

### Server Components

```typescript
// app/products/[id]/page.tsx
import { reviewsSDK } from '@/lib/reviews/sdk-instance';

export default async function ProductPage({ params }) {
  const reviews = await reviewsSDK.getByProduct(params.id);
  return <ProductReviews initialData={reviews} />;
}
```

### Server Actions

```typescript
// actions/submit-review.ts
"use server";

import { reviewsSDK } from '@/lib/reviews/sdk-instance';

export async function submitReview(formData: FormData) {
  try {
    const result = await reviewsSDK.create({
      productId: formData.get('productId'),
      productHandle: formData.get('productHandle'),
      // ... other fields
    });
    
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### API Routes

```typescript
// app/api/reviews/[productId]/route.ts
import { reviewsSDK } from '@/lib/reviews/sdk-instance';

export async function GET(request: Request, { params }) {
  try {
    const reviews = await reviewsSDK.getByProduct(params.productId);
    return Response.json(reviews);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

## Development

To work on this SDK:

```bash
cd packages/reviews-sdk

# Install dependencies
npm install

# Build the SDK
npm run build

# Watch for changes during development
npm run dev
```

## License

MIT