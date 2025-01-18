
# Website Content Search with Next.js

This project is a web-based application for searching specific content on websites. It features a Next.js frontend that communicates with a FastAPI backend to fetch and process search results.

# Features

 - Search Functionality: Input a URL and query to search specific content on websites.
 - User-Friendly Interface: Modern and responsive design for a seamless experience.
 - Real-time Feedback: Displays results with match percentages and contextual highlights.
 - Error Handling: Notifies users about invalid inputs or backend issues.
 - Backend Integration: Communicates seamlessly with a FastAPI backend.

 # Prerequisites

Ensure the following are installed on your system:

 - Node.js: Version 16.x or higher [(Node.js Download)](https://nodejs.org/en).
 - npm or yarn: Comes with Node.js.
 - FastAPI Backend: Set up and run the FastAPI backend at http://localhost:8000.


# Setup

1. Clone this repository:
```bash
  git clone https://github.com/Midhun-live/Websense-Search-client.git
  cd Websense-Search-client
```
2. Install the dependencies:
Install the required packages using npm or yarn:
```bash
  # Using npm
  npm install

  # Or using yarn
  yarn install
```
3. Configure Environment Variables
```bash
  # .env.local
  NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```
4. Run the Development Server:
Start the Next.js development server:
```bash
  # Using npm
  npm run dev

  # Or using yarn
  yarn dev
```
Access the application in your browser at http://localhost:3000.


# API Routes
 
 1. Health Check

 - ROUTE /api/health

 - Description: Verifies if the backend service is running.

 Response:
 ```bash
  {
    "status": "ok"
  }
```

 2. Search

 - ROUTE /api/search

 - Description: Sends a URL and query to the backend and fetches matching results.

 Request Body::
 ```bash
  {
    "url": "https://example.com",
    "query": "your search query"
  }
```

# Project Structure:

 - **components/:** Contains reusable UI components like the search interface.
 - **pages/:** Includes Next.js pages such as index.tsx.
 - **routes/:** API route handlers for health checks and search requests.
 - **public/:** Public assets like icons and images.

# Notes

 - Ensure the backend is running before starting the frontend.
 - Use valid URLs and queries for best results.

# Screenshot
<img width="1440" alt="Screenshot 2025-01-18 at 2 59 56 PM" src="https://github.com/user-attachments/assets/e05c8963-5ed1-4e36-9e7e-3a2e1785a75f" />
