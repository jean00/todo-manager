# Todo Manager

A full-stack todo management application built with React, TypeScript, Node.js, Express, and MongoDB. Features a modern UI with Material-UI, real-time search, pinned todos, color coding, and due dates.

## Features

- Create, read, update, and delete todos
- Pin important todos to the top
- Color-code todos with custom background colors
- Set due dates and reminders
- Real-time search with debouncing
- Dark/Light mode toggle
- Responsive design
- Fast and optimized with React Query
- Secure with input validation and rate limiting

## Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for fast development
- **Material-UI (MUI)** for UI components
- **TanStack React Query** for server state management
- **Zustand** for client state management
- **Axios** for HTTP requests
- **Day.js** for date formatting

### Backend

- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **Zod** for validation
- **Helmet** for security headers
- **Express Rate Limit** for rate limiting
- **Morgan** for logging
- **CORS** enabled

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `config.env` file based on `.env.example`:

```bash
cp .env.example config.env
```

4. Update `config.env` with your MongoDB credentials:

```env
DATABASE=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
DATABASE_PASSWORD=your_database_password
PORT=8000
NODE_ENV=development
```

5. Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Create a `.env` file for custom API configuration:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` with API proxy to backend.

## Usage

1. **Create a Todo**: Click the floating action button (FAB) in the bottom right corner
2. **Edit a Todo**: Click on any todo card to edit its title, description, or add a due date
3. **Pin a Todo**: Click the pin icon on any todo card
4. **Delete a Todo**: Open the todo edit modal and click delete
5. **Color Code**: Click the color palette icon to change the background color
6. **Search**: Use the search bar in the header to filter todos
7. **Theme**: Toggle between light and dark mode using the theme button

## 📡 API Endpoints

### Todos

| Method | Endpoint                 | Description       |
| ------ | ------------------------ | ----------------- |
| GET    | `/api/v1/todos`          | Get all todos     |
| GET    | `/api/v1/todos?q=search` | Search todos      |
| POST   | `/api/v1/todos`          | Create a new todo |
| PATCH  | `/api/v1/todos/:id`      | Update a todo     |
| DELETE | `/api/v1/todos/:id`      | Delete a todo     |

### Request/Response Examples

#### Create Todo

```bash
POST /api/v1/todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "backgroundColor": "#ffeb3b",
  "isPinned": false,
  "dueDate": "2025-11-20T10:00:00.000Z"
}
```

Response:

```json
{
  "status": "success",
  "todo": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "backgroundColor": "#ffeb3b",
    "isPinned": false,
    "dueDate": "2025-11-20T10:00:00.000Z"
  }
}
```

## Security Features

- **Helmet.js**: Secure HTTP headers
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Zod schemas for all inputs
- **NoSQL Injection Protection**: MongoDB sanitization
- **Request Size Limits**: 10kb body size limit
- **Error Handling**: Centralized error handling with proper status codes

## Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests (if implemented)
cd backend
npm test
```

## Environment Variables

### Backend (`config.env`)

- `DATABASE`: MongoDB connection string
- `DATABASE_PASSWORD`: MongoDB password
- `PORT`: Server port (default: 8000)
- `NODE_ENV`: Environment mode (development/production)

### Frontend (`.env`)

- `VITE_API_BASE_URL`: API base URL (optional, defaults to proxy)

## Development

### Backend Structure

```
backend/
├── Controllers/        # Request handlers
├── Models/            # Mongoose models
├── Routes/            # API routes
├── middleware/        # Custom middleware
├── validators/        # Zod validation schemas
├── utils/            # Utility functions
├── app.js            # Express app setup
└── server.js         # Server entry point
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/    # React components
│   ├── hooks/        # Custom React hooks
│   ├── service/      # API service layer
│   ├── store/        # Zustand stores
│   └── types/        # TypeScript types
└── public/           # Static assets
```

## Known Issues & Improvements

- [ ] Add authentication and authorization
- [ ] Implement todo categories/tags
- [ ] Add todo sharing functionality
- [ ] Implement undo/redo functionality
- [ ] Add todo attachments
- [ ] Implement recurring todos
- [ ] Add notifications for due dates
- [ ] Write comprehensive tests

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Jean00

## Contributing

Contributions, issues, and feature requests are welcome!

## Support

If you encounter any issues or have questions, please create an issue in the repository.

---

Made using React and Node.js
