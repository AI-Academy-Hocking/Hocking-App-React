# DynamoDB Table Schemas

Complete reference for all tables if you want to move from MemStorage to DynamoDB.

---

## Table 1: users

**Primary Key:** `id` (Number)

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| id | Number | Yes | Auto-increment | Primary key |
| username | String | Yes | - | Unique username |
| password | String | Yes | - | Hashed password |
| name | String | Yes | - | Full name |
| isGuest | Boolean | Yes | false | Guest user flag |
| createdAt | String (ISO) | Yes | Now | Account creation timestamp |
| lastLogin | String (ISO) | No | null | Last login timestamp |
| location | String | No | null | Current location |
| isSharingLocation | Boolean | Yes | false | Location sharing enabled |

**Example:**
```json
{
  "id": 1,
  "username": "jsmith",
  "password": "$2b$10$...",
  "name": "John Smith",
  "isGuest": false,
  "createdAt": "2024-01-15T10:30:00Z",
  "lastLogin": "2024-01-20T15:45:00Z",
  "location": "Main Hall",
  "isSharingLocation": true
}
```

---

## Table 2: events

**Primary Key:** `id` (Number)

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| id | Number | Yes | Auto-increment | Primary key |
| title | String | Yes | - | Event title |
| description | String | Yes | - | Event description |
| startTime | String (ISO) | Yes | - | Event start time |
| endTime | String (ISO) | Yes | - | Event end time |
| location | String | Yes | - | Event location |
| createdAt | String (ISO) | Yes | Now | Creation timestamp |
| isRecurring | Boolean | Yes | false | Recurring event flag |
| recurrencePattern | String | No | null | Recurrence pattern (e.g., "weekly") |

**Example:**
```json
{
  "id": 1,
  "title": "Fall Festival",
  "description": "Annual celebration with food and games",
  "startTime": "2024-10-15T12:00:00Z",
  "endTime": "2024-10-15T16:00:00Z",
  "location": "Student Center",
  "createdAt": "2024-09-01T08:00:00Z",
  "isRecurring": false,
  "recurrencePattern": null
}
```

---

## Table 3: buildings

**Primary Key:** `id` (Number)

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| id | Number | Yes | Auto-increment | Primary key |
| name | String | Yes | - | Building name |
| description | String | Yes | - | Building description |
| location | String | Yes | - | Building location/address |
| createdAt | String (ISO) | Yes | Now | Creation timestamp |
| isOpen | Boolean | Yes | true | Building open status |
| openHours | String | No | null | Operating hours |
| contactInfo | String | No | null | Contact phone/email |

**Example:**
```json
{
  "id": 1,
  "name": "Main Hall",
  "description": "Administrative offices, classrooms",
  "location": "Main Campus",
  "createdAt": "2024-01-01T00:00:00Z",
  "isOpen": true,
  "openHours": "8:00 AM - 5:00 PM",
  "contactInfo": "740-753-6000"
}
```

---

## Table 4: student_tools

**Primary Key:** `id` (String)

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| id | String | Yes | - | Primary key (e.g., "course-catalog") |
| name | String | Yes | - | Tool name |
| description | String | Yes | - | Tool description |
| url | String | Yes | - | Tool URL/link |
| category | String | Yes | - | Category (academic, financial, resources) |
| createdAt | String (ISO) | Yes | Now | Creation timestamp |
| isActive | Boolean | Yes | true | Tool active status |

**Example:**
```json
{
  "id": "course-catalog",
  "name": "Course Catalog",
  "description": "Browse available courses",
  "url": "/tools/academic/course-catalog",
  "category": "academic",
  "createdAt": "2024-01-01T00:00:00Z",
  "isActive": true
}
```

---

## Table 5: safety_alerts

**Primary Key:** `id` (Number)

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| id | Number | Yes | Auto-increment | Primary key |
| title | String | Yes | - | Alert title |
| description | String | Yes | - | Alert details |
| severity | String | Yes | - | Severity (info, warning, critical) |
| location | String | Yes | - | Affected location |
| createdAt | String (ISO) | Yes | Now | Creation timestamp |
| isActive | Boolean | Yes | true | Alert active status |
| expiresAt | String (ISO) | No | null | Expiration timestamp |

**Example:**
```json
{
  "id": 1,
  "title": "Weather Alert: Winter Storm Warning",
  "description": "Heavy snowfall expected. Use caution when traveling.",
  "severity": "warning",
  "location": "All Campus",
  "createdAt": "2024-01-15T06:00:00Z",
  "isActive": true,
  "expiresAt": "2024-01-16T06:00:00Z"
}
```

---

## Table 6: safety_resources

**Primary Key:** `id` (Number)

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| id | Number | Yes | Auto-increment | Primary key |
| title | String | Yes | - | Resource title |
| description | String | Yes | - | Resource description |
| category | String | Yes | - | Category (emergency, health, security, weather) |
| url | String | Yes | - | Resource URL/link |
| createdAt | String (ISO) | Yes | Now | Creation timestamp |
| isActive | Boolean | Yes | true | Resource active status |

**Example:**
```json
{
  "id": 1,
  "title": "Campus Police",
  "description": "24/7 emergency assistance and security services",
  "category": "emergency",
  "url": "#",
  "createdAt": "2024-01-01T00:00:00Z",
  "isActive": true
}
```

---

## DynamoDB Setup Commands (AWS CLI)

```bash
# Create users table
aws dynamodb create-table \
  --table-name users \
  --attribute-definitions AttributeName=id,AttributeType=N \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

# Create events table
aws dynamodb create-table \
  --table-name events \
  --attribute-definitions AttributeName=id,AttributeType=N \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

# Create buildings table
aws dynamodb create-table \
  --table-name buildings \
  --attribute-definitions AttributeName=id,AttributeType=N \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

# Create student_tools table
aws dynamodb create-table \
  --table-name student_tools \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

# Create safety_alerts table
aws dynamodb create-table \
  --table-name safety_alerts \
  --attribute-definitions AttributeName=id,AttributeType=N \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

# Create safety_resources table
aws dynamodb create-table \
  --table-name safety_resources \
  --attribute-definitions AttributeName=id,AttributeType=N \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

---

## Notes

- **PAY_PER_REQUEST**: No upfront costs, pay only for what you use
- **Auto-increment IDs**: DynamoDB doesn't have auto-increment; use UUID or implement counter table
- **Timestamps**: Store as ISO 8601 strings (e.g., "2024-01-15T10:30:00Z")
- **Queries**: Primary key queries are fast; consider adding GSI (Global Secondary Index) for other query patterns
- **Region**: Set to `us-east-1` (or your preferred region) in `.env`

---

## Migration Steps

1. Create all tables in AWS Console or via CLI
2. Install AWS SDK: `npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb`
3. Update `server/storage.ts` to replace Map operations with DynamoDB calls
4. Test locally with DynamoDB Local (optional)
5. Deploy with production credentials

