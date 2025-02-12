# Thai Restaurant Website - Strapi Backend

The backend CMS for the Thai Restaurant Website, built with Strapi. This provides content management for menus, recipes, and restaurant information.

## 🌟 Features

- **Menu Management**: Pre-configured content types for menu items and categories
- **Recipe Section**: Dedicated content type for sharing restaurant recipes
- **Opening Hours**: Flexible scheduling system for restaurant hours
- **Media Library**: Organized structure for food and ambiance images
- **Multi-language**: Support for multiple language content
- **Role-Based Access**: Preconfigured user roles and permissions

## 🚀 Getting Started

### Prerequisites

- Node.js (>=18.0.0)
- MySQL (for production) or SQLite (for development)
- npm

### Installation

1. Setup Strapi Backend:
```bash
cd backend
npm install
npm run develop
```

2. First-time Setup:
   - Access admin panel at `http://localhost:1337/admin`
   - Create your admin account
   - Import database schema: `backend/schema/schema.sql`
   - Generate API token: Settings > API Tokens

3. Create `.env` file:
```bash
cp .env.example .env
```

Fill in the following environment variables:
```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=the_database_name
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password

# Admin Configuration
ADMIN_JWT_SECRET=your_jwt_secret    # Generate a secure random string
API_TOKEN_SALT=your_token_salt      # Generate a secure random string

# Media Configuration
STRAPI_UPLOAD_PROVIDER=local        # or 'cloudinary' for production
```

### Content Structure

The CMS comes pre-configured with:

#### Menu Management
- Categories (appetizers, main courses, desserts)
- Menu items with prices, descriptions, and dietary information
- Special offers and promotions

#### Recipe Section
- Detailed recipe content type
- Ingredient lists
- Step-by-step instructions
- Cooking tips

#### Restaurant Information
- Opening hours
- Contact details
- Location data
- About us content

## 📦 Project Structure

Key directories in the Strapi backend:

- `config`: API and plugin configurations
- `src/api`: Content type definitions
- `src/components`: Reusable content components
- `database`: Database configurations
- `public/uploads`: Media storage (development)

## 🛠 Built With

- [Strapi](https://strapi.io/) - Headless CMS
- [MySQL](https://www.mysql.com/) - Database (Production)
- [SQLite](https://www.sqlite.org/) - Database (Development)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.