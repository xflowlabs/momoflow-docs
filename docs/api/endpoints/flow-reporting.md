# Flow Reporting API

## Overview

The Flow Reporting API provides comprehensive insights into flow assignments and schedules. Use this API to:

- Track completion rates of assigned flows
- Monitor user progress through modules
- Generate compliance reports
- Analyze workflow efficiency
- Export flow data for custom analytics

## Endpoint Details

```endpoint
POST https://api.momoflow.com/v1/flows/report
```

## Authentication

Authentication works the same way as other MomoFlow APIs. Include your API secret key in the Authorization header:

```
Authorization: Bearer YOUR_SECRET_KEY
```

See our [Authentication Guide](/api/authentication) for details on generating and managing API keys.

## Request Headers

| Header          | Required | Description                                          |
|-----------------|----------|------------------------------------------------------|
| Authorization   | Yes      | Your API key prefixed with "Bearer "                 |
| Content-Type    | Yes      | Must be "application/json"                          |
| X-Request-ID    | No       | Optional request identifier for tracking purposes    |

## Request Body Parameters

| Parameter    | Type   | Required | Description                                    |
|-------------|--------|----------|------------------------------------------------|
| flowId      | string | Yes      | Unique identifier of the flow to report on     |
| startDate   | string | No       | ISO 8601 date to start report from            |
| endDate     | string | No       | ISO 8601 date to end report at                |
| status      | string | No       | Filter by status: "pending", "in_progress", "completed", "overdue" |
| detailed    | boolean| No       | Include detailed module-level progress (default: false) |

### Example Request Body

```json
{
  "flowId": "flow_123abc",
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-12-31T23:59:59Z",
  "status": "in_progress",
  "detailed": true
}
```

## Response

### Success Response (200 OK)

```json
{
  "flowId": "flow_123abc",
  "flowName": "Customer Onboarding",
  "metrics": {
    "totalAssignments": 45,
    "completedAssignments": 38,
    "averageCompletionTime": "1.5 days",
    "completionRate": 84.4
  },
  "schedules": [
    {
      "scheduleId": "sched_456def",
      "assigneeEmail": "employee@company.com",
      "scheduledAt": "2024-10-28T10:00:00Z",
      "status": "pending",
      "recurrence": "weekly"
    }
  ],
  "assignments": [
    {
      "assignmentId": "asgn_789xyz",
      "assigneeEmail": "employee@company.com",
      "assignedAt": "2024-10-25T15:30:00Z",
      "status": "in_progress",
      "completedModules": 2,
      "totalModules": 5,
      "moduleProgress": [
        {
          "moduleId": "mod_001",
          "moduleName": "Welcome",
          "status": "completed",
          "completedAt": "2024-10-25T16:00:00Z"
        },
        {
          "moduleId": "mod_002",
          "moduleName": "Company Policies",
          "status": "completed",
          "completedAt": "2024-10-25T16:30:00Z"
        },
        {
          "moduleId": "mod_003",
          "moduleName": "Safety Training",
          "status": "in_progress",
          "startedAt": "2024-10-25T16:45:00Z"
        }
      ]
    }
  ]
}
```

### Error Responses

#### Invalid Authentication (401 Unauthorized)
```json
{
  "error": "unauthorized",
  "message": "Invalid or missing API key"
}
```

#### Flow Not Found (404 Not Found)
```json
{
  "error": "not_found",
  "message": "Flow with ID 'flow_123abc' does not exist"
}
```

#### Invalid Date Range (400 Bad Request)
```json
{
  "error": "invalid_request",
  "message": "End date must be after start date"
}
```

#### Rate Limit Exceeded (429 Too Many Requests)
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Please try again in 60 seconds",
  "retry_after": 60
}
```

## Code Examples

### cURL
<details>
<summary>Click to expand</summary>

```bash
curl -X POST https://api.momoflow.com/v1/flows/report \
  -H "Authorization: Bearer YOUR_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -H "X-Request-ID: req_unique_id" \
  -d '{
    "flowId": "flow_123abc",
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-12-31T23:59:59Z",
    "status": "in_progress",
    "detailed": true
  }'
```
</details>

### Node.js
<details>
<summary>Click to expand</summary>

```javascript
const axios = require('axios');

async function getFlowReport() {
  try {
    const response = await axios.post(
      'https://api.momoflow.com/v1/flows/report',
      {
        flowId: 'flow_123abc',
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2024-12-31T23:59:59Z',
        status: 'in_progress',
        detailed: true
      },
      {
        headers: {
          'Authorization': 'Bearer YOUR_SECRET_KEY',
          'Content-Type': 'application/json',
          'X-Request-ID': 'req_unique_id'
        }
      }
    );
    
    console.log('Flow report:', response.data);
  } catch (error) {
    console.error('Error fetching report:', error.response.data);
  }
}
```
</details>

### Python
<details>
<summary>Click to expand</summary>

```python
import requests

def get_flow_report():
    headers = {
        'Authorization': 'Bearer YOUR_SECRET_KEY',
        'Content-Type': 'application/json',
        'X-Request-ID': 'req_unique_id'
    }

    data = {
        'flowId': 'flow_123abc',
        'startDate': '2024-01-01T00:00:00Z',
        'endDate': '2024-12-31T23:59:59Z',
        'status': 'in_progress',
        'detailed': True
    }

    try:
        response = requests.post(
            'https://api.momoflow.com/v1/flows/report',
            json=data,
            headers=headers
        )
        response.raise_for_status()
        print('Flow report:', response.json())
    except requests.exceptions.RequestException as e:
        print('Error fetching report:', e)
```
</details>

## Data Export

The reporting API supports various export formats:

1. Add `format` parameter to request body:
   - `"format": "csv"` for CSV export
   - `"format": "excel"` for Excel export
   - `"format": "pdf"` for PDF export

2. Response will include a `downloadUrl` field:
```json
{
  "downloadUrl": "https://api.momoflow.com/v1/exports/exp_abc123",
  "expiresAt": "2024-10-26T15:30:00Z"
}
```

## Aggregation Options

Use the `aggregate` parameter to group data:

```json
{
  "flowId": "flow_123abc",
  "aggregate": {
    "by": "week",
    "metrics": ["completion_rate", "average_duration"]
  }
}
```

Supported aggregation periods:
- `day`
- `week`
- `month`
- `quarter`
- `year`

## Rate Limits

- Standard tier: 50 requests per minute
- Enterprise tier: 500 requests per minute
- Large reports may count as multiple requests

## Best Practices

1. Use date ranges to limit response size
2. Enable detailed mode only when necessary
3. Implement