# WordPress React Theme

This is a headless WordPress theme built with React that consumes a WPGraphQL API and renders content dynamically using a block-based layout system.  
**Author:** Thomas Pham

Built with React, TypeScript, Apollo Client, GraphQL, MUI and SCSS

**Dependencies:**
* Swiper
* Yet-another-react-lightbox
* DOMPurify
* Framer-Motion

## Features

- Headless WordPress architecture
- GraphQL-based data fetching
- Dynamic block renderer system
- Sanitized HTML output (XSS-safe)
- Modular layout system per page template

## Setup

#### REQUIREMENTS:
* docker
* npm

<br>

#### INSTALLATION:
Create **.env** file based on **.env.dist**  

##### 1. Backend (WordPress + Docker)
Run docker to install all dependencies
```bash
docker-compose up -d
```

##### 2. Frontend (WordPress React Theme)
Run npm to install all packages and start the dev server
```bash
cd ntech-theme
npm install
npm run dev
```

## Services
**Frontend:** http://localhost:3000  
**WordPress:** http://localhost:8080  
**GraphQL:** http://localhost:8080/graphql  
**BrowserSync Settings:** http://localhost:3001  
**MailDev:** http://localhost:1080  
**PHPMyAdmin:** http://localhost:8180  

**Note:** To use WP CLI run `docker compose run --rm wordpress-cli bash`

---

### Import DB Dump
If necessary, use PHPMyAdmin to import a dump (compressed sql file, e.g: "dump.sql.zip") or use /db/init.sql to create a database during the docker initialization process.

#### Modify WP Dump by SQL:
1. Run query to set endpoint:  
   `UPDATE wp_options SET option_value = 'http://localhost:8080' WHERE option_name IN ('siteurl','home');`
2. Run query to set new password:   
   `UPDATE wp_users SET user_pass = MD5('newpassword') WHERE user_login = 'admin';`

#### Modify WP Dump by WP CLI:
1. `wp search-replace 'https://old-domain.com' 'http://localhost:8080' --all-tables`
2. `wp user update admin --user_pass=newpassword`

---

### WordPress Installation
Install WordPress and follow this steps for configuration:

1. Plugin: Install and activate WPGraphQL
2. Plugin: Install and activate ACF
3. Plugin: Install and activate WPGraphQL for ACF
4. Config: Set static page in settings/reading
5. Config: Disable organize uploads in settings/media
6. Config: Activate postname in settings/permalinks
7. Config: Activate n-tech theme in design

### Usage
1. Create in ACF new Field Group:  
   "Post Layout" with field "Placement", type "select" and values "header", "content" and "sidebar"  
   Set "content" as default and field as required 
2. Create Categories to assign posts to pages (e.g. "Home", "Profile", ...)
3. Create Pages and assign templates:  
   **Home:** FrontPage  
   **Default:** Content header, Content area + sidebar  
   **Static:** Content area only  
   **Error:** Specific for error pages (excluded from search results)
4. Create Posts and select category (category `form-title` = page `form-title`) and placement to control their position
5. Create main (primary) and footer (secondary) menu in Appearance &rarr; Menus

---

### Commands

To run inside the theme directory

- ESLinting:  `npm run lint`
- Testing:    `npm run test`
- Build Prod: `npm run build:prod`
- Build Dev:  `npm run build:dev`
- Dev Server: `npm run dev`


## Security

- All HTML content is sanitized using DOMPurify
- GraphQL endpoint is public but read-only
- No authentication or user data handling on frontend

## License

MIT © Thomas Pham
