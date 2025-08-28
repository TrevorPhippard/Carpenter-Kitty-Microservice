# Carpenter-Kitty-Microservice

> A social media platform for contractors and clients to connect, share projects, and collaborate seamlessly.

---

## **Project Overview**

This project is built in the frontend with modern React, TypeScript, and TanStack libraries.

In the back-end with node using GraphQL federation and REST for auth. Running with docker-compose

More details, coming soon.

---

## **Design Overview**

**Visual References:** *(replace placeholders with actual screenshots once available)*

| Feature                  | Screenshot |
|---------------------------|------------|
| **Home Feed**             | ![FeedPage](docs/screenshots/feed-page.png) |
| **Profile Page**          | ![ProfilePage](docs/screenshots/profile-page.png) |
| **Messaging Panel**       | ![MessagingPanel](docs/screenshots/messaging-panel.png) |
| **Notifications Dropdown**| ![Notifications](docs/screenshots/notifications-dropdown.png) |
| **Settings Page**         | ![SettingsPage](docs/screenshots/settings-page.png) |

---

## **Features**

- Feed: Posts with likes, comments, share, and media support
- Profiles: Editable user profiles with experience, skills, and activity
- Connections: Follow/unfollow functionality
- Messaging: Real-time chat UI
- Notifications: Interactive dropdown panel
- Data Handling: Mock APIs integrated with TanStack Query
- Responsive & Accessible Design

---

## **Getting Started**

**1. Prerequisites**

- Node.js v20+
- npm v9+ or Yarn v4+

**2. Installation**

```bash
git clone https://github.com/TrevorPhippard/Carpenter-Kitty-Microservice.git
cd Carpenter-Kitty-Microservice/frontend
npm install
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173)

**3. Running backend services**

```bash
docker-compose up --build
```

---

## **Tentative Roadmap**

1. setup playwright testing with mocks
2. connect with graphql backend
3. Real-time messaging with WebSockets
4. Media uploads in posts & messages
5. Feed algorithms (likes, comments, recommendations)

---

## **License**

MIT License © 2025 Trevor Phippard
