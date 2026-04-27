# 🚀 High-Performance Secure Notes API

A production-ready RESTful API backend engineered for scalability, speed, and uncompromising security. This project goes beyond basic CRUD operations by implementing enterprise-level architectural patterns, including distributed rate-limiting, stateful JWT blacklisting, strict cache invalidation, and advanced dual-layer data compression.

## 🌟 Core Architecture & Features

### 🛡️ 1. Advanced Security & Auth
* **Stateful JWT Management:** Utilizes JSON Web Tokens (JWT) for stateless authentication, but enforces **Secure Token Blacklisting** via Redis upon user logout to prevent hijacked tokens from being reused.
* **Distributed Rate Limiting:** Implemented a robust centralized rate-limiting system using `express-rate-limit` backed by a **Redis Store**. This ensures global synchronization across multiple server instances to thwart DDoS attacks and brute-force attempts.
* **Ownership Verification:** Strict resource-level middleware validation ensures users can only access, mutate, or delete their own data.

### ⚡ 2. High-Performance Caching Layer (Redis)
* **Cache-Aside Pattern:** Rapid data retrieval bypassing the primary database (MongoDB) for frequently accessed resources.
* **Clear-on-Write Invalidation:** Ensures strict data consistency. The moment a resource is created, updated, or deleted, the corresponding cache key is instantly purged (`redisClient.del`), preventing "stale data" from reaching the client.
* **Graceful Degradation:** Built-in failovers ensure that if the Redis instance goes offline, the application seamlessly falls back to the primary database without crashing.

### 🗜️ 3. Dual-Layer Brotli Compression
* **Network-Level Compression:** Integrated Express middleware to automatically compress HTTP responses using the Brotli algorithm (`br`), drastically reducing network payloads and API response times.
* **RAM-Level Compression (zlib):** Engineered a custom pipeline utilizing Node.js native `zlib` (`brotliCompress`/`brotliDecompress`) to compress JSON payloads into Base64 binary buffers *before* storing them in Redis. This maximizes Redis RAM efficiency, allowing the system to handle massive concurrent user data within a constrained memory footprint.

### 🛠️ 4. Clean Code & Architecture
* **Centralized Error Handling:** Global async error wrappers (`CatchError`) and a custom `AppError` class for predictable, formatted API responses.
* **Modular Design:** Strict separation of concerns across Controllers, Models, Routes, and utility functions.

---

## 💻 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Primary Database:** MongoDB (Mongoose ORM)
* **In-Memory Datastore:** Redis (Upstash)
* **Security:** `jsonwebtoken`, `bcrypt`, `express-rate-limit`, `rate-limit-redis`
* **Performance:** `compression`, Node.js native `zlib`

---

## ⚙️ Local Setup & Installation

**1. Clone the repository**
```bash
git clone https://github.com/satyamkatiyar-712/secure-backend.git
cd secure-backend
```


**2. Install Dependencies**
```bash
npm install
```


**4. Configure Environment Variables**

Create a .env file in the root directory and add the following keys:
```bash
PORT=8080
MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_upstash_redis_url
JWT_SECRET=your_super_secret_jwt_key # used for both access and refresh tokens
```

**4. Start the Server**

 For development
```bash
npm run dev
```
 For production
```bash
npm start
```


📡 Core API Endpoints

**Authentication**

POST /api/auth/signup - Create a new user account.

POST /api/auth/login - Authenticate user and issue JWT.

POST /api/auth/logout - Securely logout and add JWT to Redis Blacklist.

**Notes (Protected Routes)**

GET /api/notes/getall - Fetch all notes (Serves via Redis Cache if available).

POST /api/notes/create - Create a new note (Triggers Cache Invalidation).

PUT /api/notes/update/:id - Update a specific note (Triggers Cache Invalidation).

DELETE /api/notes/delete/:id - Delete a specific note (Triggers Cache Invalidation).

## Engineered with focus on Scalability, Security, and Clean Architecture.
