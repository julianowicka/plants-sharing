# Plant Discovery 🌱

**Plant Discovery** to moja perełka, którą używam i samodzielnie rozwijam jako kontynuacje mojej inżynierskiej pracy dyplomowej. Aplikacja łączy pasję do roślin z nowoczesnymi technologiami webowymi, tworząc kieszonkowy atlas dla miłośników roślin doniczkowych.

## About Plant Discovery

**Plant Discovery** is a modern web application that brings together plant enthusiasts in a digital community. Built as an extension of my engineering thesis, this application showcases advanced web development technologies and user-centered design principles.

### 🌟 Key Features

- **Plant Catalog**: Browse and search through an extensive collection of houseplants with detailed care information
- **Personal Collection**: Manage your own plant collection with custom photos and care schedules
- **Smart Calendar**: Automated watering reminders based on each plant's specific needs
- **Plant Exchange**: Connect with other users to trade plants and expand your collection
- **Community Features**: Comment on plants, share experiences, and learn from other plant lovers
- **Responsive Design**: Seamless experience across desktop and mobile devices

### 🛠️ Technology Stack

This application demonstrates modern full-stack development practices using cutting-edge technologies:

#### Frontend
- **Next.js 15** with App Router for server-side rendering and optimal performance
- **React 19** with latest features and concurrent rendering
- **TypeScript** for type-safe development
- **Tailwind CSS** for utility-first styling
- **Material-UI (MUI)** for consistent component design
- **Lucide React** for beautiful, customizable icons

#### Backend & Database
- **Prisma ORM** for type-safe database operations and migrations
- **NextAuth.js** for secure authentication
- **bcrypt** for password hashing

#### Development & Performance
- **Turbo Mode** for faster development builds
- **Debounced Search** for optimal user experience
- **Image Optimization** with custom byte/URL handling
- **Responsive Design** with mobile-first approach

#### Advanced Features
- **Server Components** for improved performance and SEO
- **Client-Side State Management** with React hooks
- **Real-time Updates** with automatic page refreshing
- **Form Validation** with comprehensive error handling
- **File Upload** with image processing capabilities

### 🏗️ Architecture Highlights

- **Modular Component Structure**: Well-organized, reusable components
- **Type-Safe Database Schema**: Comprehensive Prisma models for plants, users, and interactions
- **Protected Routes**: Secure authentication and authorization
- **API Routes**: RESTful endpoints for data operations
- **Migration System**: Version-controlled database schema changes

### 🧪 Testing

End-to-end tests are available in a separate repository using Playwright:
- **E2E Tests Repository**: [plants-sharing-e2e-test](https://github.com/julianowicka/plants-sharing-e2e-test)
- **Test Framework**: Playwright with TypeScript
- **Coverage**: Complete user journey testing including authentication, plant management, and exchange features

### 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
pnpm migrate

# Start development server
pnpm dev
```

### 📱 User Experience

The application provides an intuitive interface for:
- Discovering new plants with detailed care instructions
- Tracking watering schedules with visual calendar
- Managing personal plant collections
- Connecting with the plant community
- Exchanging plants with other enthusiasts

This project represents a comprehensive understanding of modern web development, combining user experience design, database architecture, and scalable application structure.
