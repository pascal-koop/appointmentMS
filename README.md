# Appointment Management System

A full-stack monorepo application built with **Nuxt.js** (frontend) and **NestJS** (backend).

## 🏗️ Project Structure

```
appointmentMS/
├── frontend/          # Nuxt.js Vue.js application
│   ├── app/          # Nuxt app directory
│   ├── components/   # Vue components
│   ├── pages/        # Application pages
│   └── ...
├── backend/          # NestJS API server
│   ├── src/          # Source code
│   ├── test/         # Tests
│   └── ...
└── package.json      # Root package.json for monorepo
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start both frontend and backend in development mode:**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

### Individual Commands

#### Frontend (Nuxt.js)
```bash
# Development
npm run dev:frontend

# Build
npm run build:frontend

# Preview production build
npm run start:frontend
```

#### Backend (NestJS)
```bash
# Development
npm run dev:backend

# Build
npm run build:backend

# Start production
npm run start:backend
```

## 📁 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend
- `npm run install:all` - Install dependencies for all workspaces
- `npm run clean` - Remove all node_modules directories
- `npm run start` - Start both frontend and backend in production mode

## 🔧 Development

### Frontend (Nuxt.js)
- **Port:** 3000
- **Framework:** Vue.js 3 with Nuxt 4
- **UI Library:** Nuxt UI
- **TypeScript:** Enabled

### Backend (NestJS)
- **Port:** 3001
- **Framework:** NestJS
- **Language:** TypeScript
- **API Base:** `/api`

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test
```

### Backend
```bash
cd backend
npm run test
npm run test:e2e
```

## 📝 API Endpoints

- `GET /api` - Welcome message
- `GET /api/health` - Health check endpoint

## 🔄 Monorepo Benefits

- **Shared dependencies** - Common packages installed once
- **Unified development** - Run both services with one command
- **Consistent tooling** - Same linting, formatting, and testing setup
- **Easy deployment** - Deploy both services together

## 🛠️ Tech Stack

### Frontend
- **Nuxt.js 4** - Vue.js framework
- **Vue 3** - Progressive JavaScript framework
- **Nuxt UI** - UI component library
- **TypeScript** - Type safety
- **Zod** - Schema validation

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type safety
- **Express** - Web framework (underlying)
- **Jest** - Testing framework

## 📚 Learning Resources

- [Nuxt.js Documentation](https://nuxt.com/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Vue.js Documentation](https://vuejs.org/guide/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License