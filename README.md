# ThinqScribe Waitlist Application

A production-ready, full-stack MERN (MongoDB, Express, React, Node.js) waitlist application with TailwindCSS 3, featuring a beautiful blue gradient design. Deployed at **thinqscribe.com/waitlist**.

## 🚀 Features

### Frontend
- **Modern React 18** with functional components and hooks
- **TailwindCSS 3** with custom blue gradient theme
- **Responsive design** optimized for all devices
- **Real-time form validation** with error handling
- **Success/error modal notifications**
- **Beautiful animations** with fade-in and slide-up effects
- **Production optimized** with custom app icon

### Backend
- **Node.js & Express** with ES modules
- **MongoDB** with Mongoose ODM
- **Input validation** using express-validator
- **RESTful API** with comprehensive endpoints
- **Error handling** with detailed error responses
- **CORS enabled** for cross-origin requests
- **Pagination** and search functionality
- **Status-based filtering** and statistics

### Database Schema
- **firstName**: String, required, 2-50 characters
- **lastName**: String, required, 2-50 characters
- **email**: String, required, unique, validated format
- **status**: Enum (student, educator, professional, researcher, other)
- **joinedAt**: Date, auto-generated
- **isActive**: Boolean, for soft deletes
- **Timestamps**: createdAt, updatedAt

## 🚀 Quick Start

### Production Deployment
The application is deployed at: **https://thinqscribe.com/waitlist**

### Local Development Setup

#### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### 1. Clone the Repository
\`\`\`bash
git clone <your-repo-url>
cd ThinqSribeWaitlist
\`\`\`

### 2. Backend Setup

\`\`\`bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file (copy from .env.example)
cp .env.example .env

# Edit .env file with your MongoDB connection string
# For local MongoDB:
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/thinqscribe-waitlist
JWT_SECRET=your_jwt_secret_key_here

# Start the backend server
npm run dev
\`\`\`

### 3. Frontend Setup

\`\`\`bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
\`\`\`

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📁 Project Structure

\`\`\`
ThinqSribeWaitlist/
├── backend/
│   ├── config.js              # Configuration settings
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   ├── models/
│   │   └── Waitlist.js        # Mongoose schema
│   ├── routes/
│   │   └── waitlist.js        # API routes
│   └── middleware/
│       └── validation.js      # Input validation
├── frontend/
│   ├── package.json           # Frontend dependencies
│   ├── tailwind.config.js     # TailwindCSS configuration
│   ├── postcss.config.js      # PostCSS configuration
│   ├── public/
│   │   └── index.html         # HTML template
│   └── src/
│       ├── index.js           # React entry point
│       ├── index.css          # Global styles + Tailwind
│       ├── App.js             # Main App component
│       ├── components/
│       │   ├── WaitlistForm.js    # Signup form
│       │   └── WaitlistTable.js   # Admin table
│       └── services/
│           └── api.js         # API service layer
└── README.md
\`\`\`

## 🎨 Design Features

### Color Scheme
- **Primary Blue**: #0284c7 (sky-600)
- **Secondary Blue**: #164e63 (cyan-900)
- **Gradient**: Linear gradient from sky-600 to cyan-900
- **Accent Colors**: White cards, gray text, status badges

### Typography
- **Font**: Inter (Google Fonts)
- **Display Text**: Large, bold headings
- **Body Text**: Clean, readable sans-serif

### Components
- **Cards**: White with rounded corners and subtle shadows
- **Buttons**: Blue gradient with hover effects
- **Forms**: Clean inputs with focus states
- **Tables**: Responsive with hover effects
- **Modals**: Centered with backdrop blur

## 🔌 API Endpoints

### Waitlist Endpoints
- `POST /api/waitlist` - Add new entry
- `GET /api/waitlist` - Get all entries (with pagination, filtering)
- `GET /api/waitlist/:id` - Get specific entry
- `PUT /api/waitlist/:id` - Update entry
- `DELETE /api/waitlist/:id` - Soft delete entry
- `GET /api/waitlist/stats/overview` - Get statistics

### Utility Endpoints
- `GET /api/health` - Health check
- `GET /` - API information

### Query Parameters for GET /api/waitlist
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `status`: Filter by status (student, educator, etc.)
- `search`: Search in name/email
- `sortBy`: Sort field (createdAt, firstName, lastName, email)
- `order`: Sort order (asc, desc)

## 📱 Features

### Waitlist Form
- Collects first name, last name, email, and status
- Real-time validation with error messages
- Success/error modal notifications
- Responsive design for all devices

### Status Options
- Student
- Educator  
- Professional
- Researcher
- Other

## 🚀 Deployment

### Production Deployment
The application is deployed on **Render.com** with the following services:

- **Frontend**: Static site at `thinqscribe.com/waitlist`
- **Backend**: Web service API
- **Database**: MongoDB Atlas

### Deployment Guide
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Environment Variables
- `NODE_ENV`: production
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Secure JWT secret for production
- `CORS_ORIGIN`: https://thinqscribe.com
- `REACT_APP_API_URL`: Backend API URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check that MongoDB is running
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed
4. Check the console for error messages

For additional help, please open an issue in the repository.

---

**Built with ❤️ using the MERN stack and TailwindCSS**