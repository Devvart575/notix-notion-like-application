# Notix 📝

Notix is a modern, full-stack Notion-like workspace application designed to help you organize your thoughts, write rich documents, and manage tasks seamlessly in one place. 

Built with the **MERN Stack** (MongoDB, Express, React, Node.js) and styled with **Tailwind CSS**.

---

## ✨ Features

- **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT) and bcrypt password hashing.
- **Dynamic Sidebar Navigation**: Create and manage unlimited pages.
- **Drag & Drop Reordering**: Native HTML5 drag-and-drop system to easily organize your pages in the sidebar.
- **Home Dashboard**: A personalized landing page featuring a time-sensitive greeting, the current date, and quick access to your 6 most recently opened pages.
- **Rich Text Editor**: A built-in document editor supporting inline formatting.
  - Keyboard shortcuts (`Ctrl+B`, `Ctrl+I`, `Ctrl+U`).
  - Bulleted and numbered lists.
  - Headings (H1, H2) and text alignment.
- **Live Auto-Save**: Never lose your work again. The editor automatically and seamlessly syncs your content with the database in the background as you type.
- **Task Management**: Track actionable items directly inside any document with an interactive checklist and an animated progress bar.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **React 19** powered by **Vite**
- **Tailwind CSS v4** for utility-first, responsive styling
- **React Router DOM** for navigation
- **Lucide React** for beautiful, consistent iconography

### Backend (Server)
- **Node.js** & **Express** for the REST API
- **MongoDB** & **Mongoose** for data modeling and database management
- **JSON Web Token (JWT)** for session management
- **bcryptjs** for secure password hashing
- **CORS** & **dotenv** for environment configuration

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas URI)

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/your-username/notix.git
cd notix
\`\`\`

### 2. Setup the Backend Server
1. Navigate to the server directory:
   \`\`\`bash
   cd server
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a \`.env\` file in the `server` directory and add your environment variables:
   \`\`\`env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   \`\`\`
4. Start the server (development mode with Nodemon):
   \`\`\`bash
   npm run dev
   \`\`\`

### 3. Setup the Frontend Client
1. Open a new terminal and navigate to the client directory:
   \`\`\`bash
   cd client
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Ensure your API endpoint is pointing to the correct local server (typically \`http://localhost:5000\`). This is usually configured in a constants file like \`src/utils/constant.js\`.
4. Start the Vite development server:
   \`\`\`bash
   npm run dev
   \`\`\`

### 4. Open the Application
Navigate to \`http://localhost:5173\` (or the port Vite provides) in your browser to start using Notix!

---

## 📂 Folder Structure

\`\`\`text
notix/
├── client/                 # React Frontend
│   ├── public/             
│   └── src/                
│       ├── components/     # Reusable UI components (Editor, Sidebar, Auth, Home)
│       ├── hooks/          # Custom React hooks (e.g., useAuth)
│       ├── services/       # API call utilities
│       └── utils/          # Constants and helpers
│
└── server/                 # Node/Express Backend
    ├── config/             # Database connection setup
    ├── controllers/        # Route logic and handlers
    ├── middleware/         # Custom Express middlewares (e.g., JWT Auth validator)
    ├── model/              # Mongoose DB schemas (User, Page, Block)
    └── routes/             # API endpoint definitions
\`\`\`

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is licensed under the ISC License.
