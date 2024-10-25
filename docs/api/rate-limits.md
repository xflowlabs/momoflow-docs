---
title: Rate Limits
---

# Rate Limits

To ensure fair usage of the Momoflow API, we implement rate limits on API calls.

## Rate Limit Details
- **Standard Rate Limit**: 100 requests per minute.
- **Burst Capacity**: Up to 200 requests in a short burst.

## Handling Rate Limits
If you exceed the rate limit, you will receive a `429 Too Many Requests` response.