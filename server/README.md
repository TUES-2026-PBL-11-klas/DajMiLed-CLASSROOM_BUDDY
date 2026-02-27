## Classroom Buddy Backend (Server)

This is a **REST API written in Spring Boot** that powers the Classroom Buddy application.  
It provides authentication and material management endpoints, using stateless JWT for authentication and standardized API responses.

---

## Tech Stack

- **Language**: Java
- **Framework**: Spring Boot
- **Persistence**: Spring Data JPA
- **Auth**: stateless JWT authentication
- **File Storage**: Cloudinary (for uploaded materials)

---

## Common Response Structure

All endpoints return the same JSON wrapper defined by `ApiResponse`:

```json
{
  "status": 200,
  "message": "Human-readable message",
  "data": { }
}
```

- **status**: HTTP status code as an integer (e.g. `200`, `201`, `400`, `404`).
- **message**: Short description of the outcome.
- **data**: The actual payload (object, list, paged result, etc.).  
  - For paginated endpoints, this is a Spring `Page` object (see **Pagination** below).

On errors, the global exception handler also returns the same `ApiResponse` shape, with an appropriate `status` and `message`, and usually `data: null`.

---

## Authentication & Authorization

### JWT

Most protected endpoints expect a **JWT** in the `Authorization` header:

```http
Authorization: Bearer <jwt-token>
```

The token is parsed and validated by `JwtProvider`, and the username is extracted to load the user from the database.

---

## Endpoints

### AuthController (`/api/auth`)

#### POST `/api/auth/register`

- **Description**: Register a new account and immediately return an auth response (containing JWT and success message).
- **Request body** (`RegisterRequest`):

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "ROLE_STUDENT | ROLE_TEACHER"
}
```

- **Response** (`ApiResponse` with `AuthResponse` in `data`):

```json
{
  "status": 201,
  "message": "Student registered successfully",
  "data": {
    "token": "jwt-token",
    "message": "string",
  }
}
```

#### POST `/api/auth/login`

- **Description**: Authenticate a user and return a JWT.
- **Request body** (`LoginRequest`):

```json
{
  "username": "string", //username or email
  "password": "string"
}
```

- **Response** (`ApiResponse` with `AuthResponse` in `data`):

```json
{
  "status": 200,
  "message": "Login successful",
  "data": {
    "token": "jwt-token",
    "message": "string",
  }
}
```

---

### MatrerialController (`/api/material`)

#### POST `/api/material/upload`

- **Description**: Upload a material (document) for the currently authenticated user.
- **Auth**: Requires `Authorization: Bearer <jwt>` header.
- **Consumes**: `multipart/form-data`
- **Form fields** (`MaterialRequest`):
  - `subject` – `string`, subject name/category.
  - `file` – file content (document to upload).

- **Response** (`ApiResponse` with uploaded material ID in `data`):

```json
{
  "status": 201,
  "message": "Material created successfully",
  "data": 123
}
```

Where `data` is the new material’s numeric ID.

---

#### GET `/api/material/{subject_name}`

- **Description**: Get **paginated** list of materials for a given subject (for all users).
- **Path variable**:
  - `subject_name` – `string`, subject identifier.
- **Query parameters** (pagination):
  - `page` – zero-based page index (default from Spring if omitted).
  - `size` – page size (number of items per page).
  - `sort` – sorting, e.g. `sort=createdAt,desc`.

- **Response** (`ApiResponse` with Spring `Page<MaterialResponse>` in `data`):

```json
{
  "status": 200,
  "message": "Materials retrieved successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "username": "owner_username",
        "subject": "Math",
        "url": "https://cloudinary.com/.../file.pdf",
        "createdAt": "2024-02-27T12:34:56.000Z"
      }
      // more materials...
    ],
    "pageable": { ... },
    "totalPages": 5,
    "totalElements": 100,
    "last": false,
    "size": 20,
    "number": 0,
    "sort": { ... },
    "first": true,
    "numberOfElements": 20,
    "empty": false
  }
}
```

See **Pagination** section below for how to work with these fields.

---

#### GET `/api/material/me`

- **Description**: Get **paginated** list of materials owned by the **currently authenticated user**.
- **Auth**: Requires `Authorization: Bearer <jwt>` header.
- **Query parameters** (pagination, same as above):
  - `page` – zero-based page index.
  - `size` – page size.
  - `sort` – sorting, e.g. `sort=createdAt,desc`.

- **Response** (`ApiResponse` with `Page<MaterialResponse>` in `data`):

```json
{
  "status": 200,
  "message": "Materials retrieved successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "username": "current_user",
        "subject": "History",
        "url": "https://cloudinary.com/.../file.pdf",
        "createdAt": "2024-02-27T12:34:56.000Z"
      }
    ],
    "pageable": { ... },
    "totalPages": 1,
    "totalElements": 3,
    "last": true,
    "size": 20,
    "number": 0,
    "sort": { ... },
    "first": true,
    "numberOfElements": 3,
    "empty": false
  }
}
```

---

## Pagination Details

Whenever an endpoint returns a paginated result (currently material listing endpoints), the `data` field of `ApiResponse` contains a serialized Spring `Page`:

- **`content`**: Array of items (e.g. `MaterialResponse` objects).
- **`totalElements`**: Total number of items across all pages.
- **`totalPages`**: Total number of pages.
- **`size`**: Page size (items per page).
- **`number`**: Current page index (zero-based).
- **`first` / `last`**: Booleans indicating if this is the first/last page.
- **`empty`**: Boolean, `true` if there are no items.

### Requesting pages from the client

Example:

```http
GET /api/material/Math?page=0&size=10&sort=createdAt,desc
Authorization: Bearer <jwt-token>   (only required where the endpoint needs auth)
```

To move to the **next page**, increment `page`:

```http
GET /api/material/Math?page=1&size=10&sort=createdAt,desc
```

On the frontend, you typically:

- Read `data.totalPages` to know how many pages exist.
- Read `data.number` to know the current page index.
- Use `data.first` and `data.last` to disable **Previous/Next** buttons when appropriate.

---

## Error Handling

Errors such as validation failures, authentication issues, or missing resources are handled by `GlobalExceptionHandler` and returned with the same `ApiResponse` wrapper:

```json
{
  "status": 400,
  "message": "Some descriptive error message",
  "data": null
}
```

The exact `status` and `message` depend on the specific exception (e.g. invalid credentials, object not found, upload failure, etc.).

---

## Running the Backend

From the `server` directory:

```bash
./mvnw spring-boot:run
```

Or, if you have Maven installed:

```bash
mvn spring-boot:run
```

The API will be available at:

```text
http://localhost:8080
```
