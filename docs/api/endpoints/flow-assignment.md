# Flow Assignment API

## Overview

The Flow Assignment API allows you to programmatically assign flows to users in your organization. This is particularly useful for:

- Automating employee onboarding processes
- Scheduling recurring training flows
- Integrating MomoFlow with your existing HR systems
- Bulk assigning flows to multiple users
- Triggering flow assignments based on external events

## Endpoint Details

```endpoint
POST https://api.momoflow.com/v1/flows/assign
```

## Authentication

All requests must include your API secret key in the Authorization header. You can generate this key from your MomoFlow dashboard:

1. Navigate to Settings → API Keys
2. Click "Generate New Key"
3. Copy the key immediately (it won't be shown again)

```
Authorization: Bearer YOUR_SECRET_KEY
```

⚠️ Keep your API key secure and never share it in public repositories or client-side code.

## Request Headers

| Header          | Required | Description                                          |
|-----------------|----------|------------------------------------------------------|
| Authorization   | Yes      | Your API key prefixed with "Bearer "                 |
| Content-Type    | Yes      | Must be "application/json"                          |
| X-Request-ID    | No       | Optional request identifier for tracking purposes    |

## Request Body Parameters

| Parameter    | Type   | Required | Description                                    |
|-------------|--------|----------|------------------------------------------------|
| flowId      | string | Yes      | Unique identifier of the flow to be assigned   |
| userEmail   | string | Yes      | Email address of the assignee                  |
| dueDate     | string | No       | ISO 8601 formatted due date for the flow      |
| priority    | string | No       | Priority level: "low", "medium", or "high"     |
| notes       | string | No       | Additional notes for the assignee              |

### Example Request Body

```json
{
  "flowId": "flow_123abc",
  "userEmail": "employee@company.com",
  "dueDate": "2024-11-25T23:59:59Z",
  "priority": "high",
  "notes": "Please complete this onboarding flow before the team meeting"
}
```

## Response

### Success Response (200 OK)

```json
{
  "success": true,
  "assignmentId": "asgn_789xyz",
  "message": "Flow assigned successfully",
  "details": {
    "assignedAt": "2024-10-25T15:30:00Z",
    "assigneeEmail": "employee@company.com",
    "flowName": "Customer Onboarding",
    "moduleCount": 5,
    "estimatedDuration": "2 hours"
  }
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

#### User Not Found (404 Not Found)
```json
{
  "error": "not_found",
  "message": "User with email 'employee@company.com' does not exist in your organization"
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
curl -X POST https://api.momoflow.com/v1/flows/assign \
  -H "Authorization: Bearer YOUR_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -H "X-Request-ID: req_unique_id" \
  -d '{
    "flowId": "flow_123abc",
    "userEmail": "employee@company.com",
    "dueDate": "2024-11-25T23:59:59Z",
    "priority": "high",
    "notes": "Please complete this onboarding flow before the team meeting"
  }'
```
</details>

### Node.js
<details>
<summary>Click to expand</summary>

```javascript
const axios = require('axios');

async function assignFlow() {
  try {
    const response = await axios.post(
      'https://api.momoflow.com/v1/flows/assign',
      {
        flowId: 'flow_123abc',
        userEmail: 'employee@company.com',
        dueDate: '2024-11-25T23:59:59Z',
        priority: 'high',
        notes: 'Please complete this onboarding flow before the team meeting'
      },
      {
        headers: {
          'Authorization': 'Bearer YOUR_SECRET_KEY',
          'Content-Type': 'application/json',
          'X-Request-ID': 'req_unique_id'
        }
      }
    );
    
    console.log('Flow assigned:', response.data);
  } catch (error) {
    console.error('Error assigning flow:', error.response.data);
  }
}
```
</details>

### Python
<details>
<summary>Click to expand</summary>

```python
import requests

def assign_flow():
    headers = {
        'Authorization': 'Bearer YOUR_SECRET_KEY',
        'Content-Type': 'application/json',
        'X-Request-ID': 'req_unique_id'
    }

    data = {
        'flowId': 'flow_123abc',
        'userEmail': 'employee@company.com',
        'dueDate': '2024-11-25T23:59:59Z',
        'priority': 'high',
        'notes': 'Please complete this onboarding flow before the team meeting'
    }

    try:
        response = requests.post(
            'https://api.momoflow.com/v1/flows/assign',
            json=data,
            headers=headers
        )
        response.raise_for_status()
        print('Flow assigned:', response.json())
    except requests.exceptions.RequestException as e:
        print('Error assigning flow:', e)
```
</details>

## Rate Limits

- Standard tier: 100 requests per minute
- Enterprise tier: 1000 requests per minute
- Exceeded rate limits will return a 429 status code

## Best Practices

1. Always include a unique X-Request-ID header for tracking purposes
2. Implement exponential backoff for retry logic
3. Handle all potential error responses in your code
4. Validate user email addresses before making the API call
5. Store the returned assignmentId for future reference

## Webhook Notifications

You can configure webhook notifications for assignment events in your MomoFlow dashboard. Available events:

- `flow.assigned`: Triggered when a flow is successfully assigned
- `flow.started`: Triggered when the assignee starts the flow
- `flow.completed`: Triggered when the flow is completed
- `flow.overdue`: Triggered when a flow passes its due date

## Need Help?

- Contact support at info@momoflow.com