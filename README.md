# Carpenter Kitty

## 🚀 Overview

**Carpenter Kitty** is a full-featured professional networking platform, designed to be a more blue collared version LinkedIn. It allows professionals to:

- Build and manage profiles
- Connect with other professionals
- Connect freelancers to contractors
- Connect both potential clients
- Post updates and share articles, recent projects, etc
- Search and apply for jobs
- Chat in real-time
- Receive instant notifications
- Leave reviews

The project is **modular, scalable, and eventually microservices-based**, built to demonstrate a production-ready architecture.

---

## 🎨 Dashboard So far

> probably won't have a live link for awhile so here's a peak.

**Feed Page**
![Feed GIF](https://)

**Profile Page**
![Profile GIF](https://)

**Messaging**
![Messaging GIF](https:/)

---

## ✨ Features

### User Features

- ❌ Signup/Login with JWT
- ❌ Edit profile, add experience, education, skills
- ❌ Connect, follow companies, endorse skills
- ✅ Post updates, like, comment, share
- ❌ Real-time chat with Socket.IO
- ❌ Job search, save, and apply
- ✅ Activity notifications

### Admin Features (eventually)

- ⚡ Manage users (suspend, ban)
- ⚡ Moderate content (flag posts/comments)
- ⚡ Analytics dashboard for engagement

---

## 🛠 Tech Stack

### Frontend

Tannerverse + React

### Backend / API

nestjs, prisma, postgres

### Realtime & Messaging

WIP

### Search & Queue

Elasticsearch & Kafka would be nice

### DevOps

Docker with plans of local version of mini-kube  or Kind

---

## 🏗 Architecture

![Tech Stack Diagram](https://via.placeholder.com/900x500?text=Tech+Stack+Diagram)

**Description:**
| **current dev**

- just one  NestFactory

| **goal**

- Microservices-based architecture with independent deployments
- API Gateway (GraphQL/REST) for client communication
- Asynchronous messaging via **Kafka/RabbitMQ**
- Real-time features powered by **Socket.IO + Redis**

---

## ⚡ Getting Started

### Prerequisites

- Node.js v20+
- Docker & Docker Compose

### Installation

```bash
# Clone repository
git clone https://github.com/TrevorPhippard/Carpenter-Kitty-Microservice.git

cd Carpenter-Kitty-Microservice

# Install dependencies in both /frontend & /backend
npm install

# Start backend and services
docker-compose up -d

# Start frontend
cd frontend
npm run dev
```

---

## 🗂 Folder Structure

```
Carpenter-Kitty-Microservice/
│
├── backend/
│   ├── prisma/
│   │   ├── Migrations/
│   │   ├── user-service/
│   ├── src/
│   │   ├── comments
│   │   ├── network/
│   │   ├── posts/
│   │   └── prisma/
│   │   ├── profile/
│   │   ├── users/
│   │   └── jobs/
│   └── gateway/
│
├── frontend/
|   └── src
│       ├── components/
│       |     └── [page specific components]/
│       |     ├── storybook/
│       |     └── ui/
│       ├── hooks/
│       |     └── [page specific hooks]/
│       ├── lib/
│       ├── routes/
│       |     └── (auth-pages)
│       |     └── (authorized)
│       ├── types/
│       ├── data/
│       ├── utils/
│       └── integrations/
│
├── .env (you'll add this)
├── docker-compose.yml
└── README.md
```

---

## 🔌 API Endpoints

**Auth:**

- `POST /auth/register` – Signup
- `POST /auth/login` – Login

**User:**

- `GET /users/:id` – Fetch profile
- `PUT /users/:id` – Update profile
- `POST /users/:id/connect` – Send connection request

**Posts:**

- `GET /posts` – Fetch feed
- `POST /posts` – Create post
- `POST /posts/:postId/like` – Like post
- `POST /posts/:postId/comments` – Like post

**Jobs:**

- `GET /jobs` – List jobs
- `POST /jobs` – Create job

**Friends/Network:**

- `api/network/connections/userId`
- `api/network/invitations/userId`
- `api/network/suggestions/userId`
- `api/network/invite/userId`
- `api/network/accept/inviteId`
- `api/network/decline/inviteId`

---

## 🤝 Contributing

1. don't

---

## 📄 License

MIT License – See [LICENSE](LICENSE)
