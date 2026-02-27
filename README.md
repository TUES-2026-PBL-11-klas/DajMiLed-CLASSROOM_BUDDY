# Classroom Buddy

A centralized platform for students and teachers to share, organize, and discuss academic resources. Built with a focus on simplicity, speed, and clean design, Classroom Buddy provides a private and distraction-free environment for the pursuit of academic excellence.

---

## 🚀 Features

- **Centralized Vault:** A single repository to upload, view, and organize materials by discipline (e.g., Computer Science, Mathematics, Physics, Literature).
- **Live Material Viewer:** Preview documents and images directly in the browser—no need to download to see the contents.
- **Secure Authentication:** JWT-based user authentication ensuring users securely log in before accessing or uploading resources.
- **Scholar Profiles:** Track personal contributions, view personalized statistics, and manage uploaded materials.
- **Privacy & Performance:** Keyboard-friendly, minimal telemetry, lazy-loaded components, and high-performance framework choices.
- **Cloud Storage:** Native integration with Cloudinary for fast and reliable file hosting.

---

## 🛠 Tech Stack

### Frontend (`client/`)
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS (Custom "Teal Serenity" theme)
- **Language:** TypeScript
- **Deployment:** Docker support available

### Backend (`server/`)
- **Framework:** Spring Boot (Java)
- **Persistence:** Spring Data JPA with PostgreSQL
- **Security:** Spring Security & Stateless JWT Authentication
- **Storage:** Cloudinary SDK

---

## 📁 Project Structure

```text
Classroom_Buddy/
├── client/                 # Next.js Frontend application
│   ├── src/app/            # App Router pages and layouts
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── server/                 # Spring Boot Backend application
│   ├── src/main/java/      # Java source code (Controllers, Services, Repositories)
│   ├── src/main/resources/ # Application properties and DB configs
│   └── pom.xml             # Maven dependencies
└── README.md               # You are here!
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** (v18+)
- **Java 17+** (JDK)
- **Maven** (optional, wrapper provided)
- **PostgreSQL** (running locally or remote)
- **Cloudinary Account** (for file uploads)

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd server
   ```
2. Configure the environment variables in `src/main/resources/application.properties` (or your `.env`):
   - Database connection (`spring.datasource.url`, `spring.datasource.username`, `spring.datasource.password`).
   - Cloudinary credentials (`cloudinary.url`).
   - JWT Secret (`jwt.secret`).
3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   > For detailed backend API documentation, see the [Server README](./server/README.md).

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the `client/` directory to point to the backend:

4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## 📖 API Documentation

The backend exposes a standardized REST API, with endpoints wrapping all responses in a uniform `ApiResponse` object. 

Key endpoints include:
- `POST /api/auth/register` - Create a new user account.
- `POST /api/auth/login` - Authenticate and retrieve a JWT.
- `GET /api/material/{subject_name}` - Retrieve paginated materials for a discipline.
- `POST /api/material/upload` - Securely upload files to Cloudinary.

For a comprehensive guide to the endpoints, pagination details, and error handling, please read the **[Backend Server Documentation](./server/README.md)**.