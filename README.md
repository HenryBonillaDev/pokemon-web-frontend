# Pokemon Web Frontend

Frontend application built with React + TypeScript + Vite that consumes the Pokemon API.

## Features

- User authentication (Login/Register) with JWT
- Pokemon list with pagination
- Pokemon detail modal
- Pokemon VS comparison
- Responsive design with TailwindCSS
- Protected routes

## Tech Stack

- React
- TypeScript
- Vite
- TailwindCSS
- Axios
- React Router DOM

## Prerequisites

- Node.js 18+
- npm or yarn

## Local Development

### Install dependencies
```bash
npm install
```

### Configure environment variables

Create a `.env` file:
```env
VITE_API_URL=http://pokemon-alb-1066697966.us-east-2.elb.amazonaws.com
```

### Run development server
```bash
npm run dev
```

Application available at: `http://localhost:5173`

## Docker

### Build image
```bash
docker build -t pokemon-frontend --build-arg VITE_API_URL=https://pokemon-api.duvanbonilladev.com .
```

### Run container
```bash
docker run -p 3000:80 pokemon-frontend
```

Application available at: `http://localhost:3000`

### Using Docker Compose
```bash
docker-compose up --build
```

## Build for Production
```bash
npm run build
```

Output files in `dist/` directory.

## Project Structure
```
src/
├── components/       # Reusable components
├── pages/           # Page components
│   ├── auth/       # Authentication pages
│   └── pokemon/    # Pokemon pages
├── services/        # API services
├── hooks/          # Custom hooks
├── context/        # React context
├── types/          # TypeScript types
├── utils/          # Utility functions
└── App.tsx         # Main app component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The frontend connects to the Pokemon API backend:

- Base URL: `http://pokemon-alb-1066697966.us-east-2.elb.amazonaws.com/`
- Authentication: JWT Bearer token
- Endpoints:
  - POST `/auth/register` - User registration
  - POST `/auth/login` - User login
  - GET `/pokemon` - List pokemon
  - GET `/pokemon/{id}` - Pokemon detail
  - GET `/pokemon/search` - Search pokemon
  - GET `/pokemon/compare` - Compare pokemon

## Deployment

### AWS S3 + CloudFront

1. Build the application
2. Upload `dist/` contents to S3 bucket
3. Configure CloudFront distribution
4. Update DNS to point to CloudFront
