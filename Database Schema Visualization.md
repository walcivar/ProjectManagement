# Database Schema Visualization

```mermaid
erDiagram
    Users ||--o{ UserRoles : "has"
    Users ||--o{ Projects : "manages"
    Users ||--o{ Tasks : "is assigned to"
    Users ||--o{ Comments : "creates"
    Users ||--o{ AuditLogs : "generates"
    
    Roles ||--o{ UserRoles : "has"
    
    Clients ||--o{ Projects : "owns"
    Clients {
        int id PK
        string name
        string email
        string phone
        string company
        datetime createdAt
        datetime updatedAt
        bool isActive
    }
    
    Projects {
        int id PK
        string name
        string description
        datetime startDate
        datetime endDate
        int clientId FK
        int managerId FK
        string status
        datetime createdAt
        datetime updatedAt
    }
    
    Tasks {
        int id PK
        string title
        string description
        int projectId FK
        int assigneeId FK
        string priority
        string status
        datetime dueDate
        datetime createdAt
        datetime updatedAt
    }
    
    Users {
        int id PK
        string username
        string email
        string passwordHash
        string firstName
        string lastName
        bool isActive
        datetime lastLogin
        datetime createdAt
        datetime updatedAt
    }
    
    Roles {
        int id PK
        string name
        string description
    }
    
    UserRoles {
        int userId FK
        int roleId FK
        datetime assignedAt
    }
    
    Comments {
        int id PK
        int taskId FK
        int userId FK
        string content
        datetime createdAt
        datetime updatedAt
    }
    
    Attachments {
        int id PK
        int taskId FK
        string fileName
        string fileType
        string filePath
        int fileSize
        datetime uploadedAt
        int uploadedBy FK
    }
    
    AuditLogs {
        int id PK
        int userId FK
        string entityType
        int entityId
        string action
        string oldValues
        string newValues
        datetime timestamp
        string ipAddress
    }
    
    Projects ||--o{ Tasks : "contains"
    Tasks ||--o{ Comments : "has"
    Tasks ||--o{ Attachments : "has"
```

This diagram shows:
1. **Core Entities**: Users, Roles, Clients, Projects, and Tasks
2. **Supporting Entities**: Comments, Attachments, and AuditLogs
3. **Junction Tables**: UserRoles for many-to-many relationships
4. **Relationships**: Shows cardinality and dependencies between entities
5. **Fields**: Essential fields for each entity including primary and foreign keys

Key Relationships:
- Users can have multiple roles (through UserRoles)
- Clients can have multiple projects
- Projects can have multiple tasks
- Tasks can have multiple comments and attachments
- All major actions are tracked in AuditLogs

The schema supports all requirements including:
- User and role management
- Client management
- Project and task tracking
- Document attachments
- Audit logging
- Comments and collaboration
