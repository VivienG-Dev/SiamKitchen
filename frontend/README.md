# Thai Restaurant Website

A modern, full-stack restaurant website built with Nuxt 3 and Strapi CMS. Features a responsive design, multilingual support, and real-time opening hours.

## 🌟 Features

- **Modern Stack**: Built with Nuxt 3 (Vue.js) and Strapi CMS
- **Responsive Design**: Mobile-first approach with Tailwind CSS 4
- **Real-time Status**: Shows if the restaurant is currently open
- **Menu Management**: Easy-to-update menu items with categories
- **Recipe Section**: Share your restaurant's recipes with customers
- **Image Optimization**: Automatic image optimization and responsive images
- **SEO Friendly**: Built-in SEO optimization with dynamic meta tags

## 🚀 Getting Started

### Prerequisites

- Node.js (>=18.0.0)
- MySQL (for production) or SQLite (for development)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/VivienG-Dev/SiamKitchen.git
cd restaurant-website
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Fill in the following environment variables in your `.env` file:

```env
# Frontend Configuration
STRAPI_URL=http://localhost:1337  # Strapi API base URL
SITE_URL=http://localhost:3000      # Frontend URL
NUXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_strapi_token      # API key for Google Maps
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000` to see the website.

## 📦 Project Structure

The project is organized into the following directories:

- `components`: Reusable Vue components
- `composables`: Composables for reusable logic
- `constants`: Constants for dietary icons
- `layouts`: Layout files for different pages
- `pages`: Page components
- `public`: Static assets
- `server`: Strapi server configuration
- `stores`: Pinia store
- `types`: TypeScript types using zod

## 🛠 Built With

- [Nuxt 3](https://nuxt.com/) - The Vue.js Framework
- [Strapi](https://strapi.io/) - Headless CMS
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Pinia](https://pinia.vuejs.org/) - State Management
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Zod](https://zod.dev/) - Schema Validation

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.