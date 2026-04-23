# WordPress React Theme

![License](https://img.shields.io/badge/license-MIT-green)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![React](https://img.shields.io/badge/frontend-react-61DAFB)
![GraphQL](https://img.shields.io/badge/api-graphql-E10098)
![WordPress](https://img.shields.io/badge/backend-wordpress-21759B)
![Security](https://img.shields.io/badge/security-sanitized-brightgreen)

A modern headless WordPress theme using React and WPGraphQL with a dynamic block-based rendering system.

Built with React, TypeScript, Apollo Client, GraphQL, MUI and SCSS.

---

## ✨ Features

* Headless WordPress architecture
* GraphQL-based data fetching
* Dynamic block renderer system
* Sanitized HTML output (XSS-safe)
* Modular layout system per page template

---

## ⚡ Quick Start

```bash
docker-compose up -d
cd ntech-theme
npm install
npm run dev
```

---

## 🚀 Setup

### Requirements

* Docker
* Node.js / npm

---

### Installation

Create a `.env` file based on `.env.dist`.

#### 1. Backend (WordPress + Docker)

Start the backend services:

```bash
docker-compose up -d
```

#### 2. Frontend (React Theme)

Install dependencies and start development:

```bash
cd ntech-theme
npm install
npm run dev
```

---

## 🌐 Services

| Service     | URL                           |
| ----------- | ----------------------------- |
| Frontend    | http://localhost:3000         |
| WordPress   | http://localhost:8080         |
| GraphQL API | http://localhost:8080/graphql |
| BrowserSync | http://localhost:3001         |
| MailDev     | http://localhost:1080         |
| PHPMyAdmin  | http://localhost:8180         |

> ℹ️ WP CLI:
>
> ```bash
> docker compose run --rm wordpress-cli bash
> ```

---

## 📦 Import DB Dump

Import via PHPMyAdmin or use `/db/init.sql` during Docker initialization.

### Modify via SQL

```sql
UPDATE wp_options 
SET option_value = 'http://localhost:8080' 
WHERE option_name IN ('siteurl','home');

UPDATE wp_users 
SET user_pass = MD5('newpassword') 
WHERE user_login = 'admin';
```

### Modify via WP CLI

```bash
wp search-replace 'https://old-domain.com' 'http://localhost:8080' --all-tables
wp user update admin --user_pass=newpassword
```

---

## ⚙️ WordPress Installation

1. Install & activate plugins:

   * WPGraphQL
   * ACF
   * WPGraphQL for ACF

2. Configure settings:

   * Set static front page (settings → reading )
   * Disable “organize uploads” (settings → media)
   * Enable post name permalinks (settings → permalinks)
   * Activate the ntech theme

---

## 🧠 Usage

1. Create an ACF Field Group:

   * Name: `Post Layout`
   * Field: `Placement` (required)
   * Type: Select (`header`, `content`, `sidebar`)
   * Default: `content`

2. Create categories for page mapping (e.g. `home`, `profile`, ...)

3. Create pages with templates:

   * **Home** → FrontPage
   * **Default** → Header + Content + Sidebar
   * **Static** → Content only
   * **Error** → Excluded from search

4. Create posts:

   * Assign category
   * Define placement (controls layout position)

5. Configure menus (Appearance → Menus):

   * Primary (main)
   * Secondary (footer)

---

## 🛠️ Commands

Run inside `ntech-theme`:

```bash
npm run lint        # ESLint
npm run test        # TypeScript + Jest
npm run build:prod  # Production build
npm run build:dev   # Development build
npm run dev         # Watch mode
```

---

## 🔐 Security

* All HTML content is sanitized using DOMPurify
* GraphQL endpoint is public (read-only usage intended)
* No authentication or user data handling on frontend

---

## 📄 License

MIT © Thomas Pham
