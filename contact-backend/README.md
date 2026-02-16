# Portfolio Contact Backend API

Complete backend API for portfolio contact form with MongoDB database and Brevo email integration.

## 🚀 Features

- ✅ Contact form submission with validation
- 📧 Automatic email notifications using Brevo (Sendinblue)
- 💾 MongoDB database storage
- 📬 Admin notification emails
- 🎯 User confirmation emails
- 🔒 Input validation and sanitization
- 🎨 Beautiful HTML email templates
- 📊 Admin panel endpoints (CRUD operations)

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Brevo (Sendinblue) account with API key

## 🛠️ Installation

1. **Extract the zip file and navigate to the directory:**
   ```bash
   cd contact-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your credentials:
   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/portfolio-contact
   # Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/portfolio-contact

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Brevo Configuration
   BREVO_API_KEY=your_actual_brevo_api_key
   BREVO_SENDER_EMAIL=your-verified-email@example.com
   BREVO_SENDER_NAME=Your Portfolio

   # Admin Email
   ADMIN_EMAIL=jshari0209@gmail.com

   # Frontend URL
   FRONTEND_URL=http://localhost:3000
   ```

## 🔑 Getting Brevo API Key

1. Go to [Brevo](https://www.brevo.com) and sign in
2. Navigate to **Settings** → **SMTP & API** → **API Keys**
3. Click **Generate a new API key**
4. Copy the key and paste it in your `.env` file as `BREVO_API_KEY`
5. Make sure to verify your sender email in Brevo settings

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB
```bash
# Install MongoDB locally and start the service
mongod
```

### Option 2: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `MONGODB_URI` in `.env` with your Atlas connection string

## 🚀 Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Public Endpoints

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I would like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon.",
  "data": {
    "id": "65f123abc...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-03-15T10:30:00.000Z"
  }
}
```

### Admin Endpoints (Add authentication middleware for production)

#### Get All Contacts
```http
GET /api/contact?status=new&page=1&limit=10
```

#### Get Single Contact
```http
GET /api/contact/:id
```

#### Update Contact Status
```http
PATCH /api/contact/:id
Content-Type: application/json

{
  "status": "replied"
}
```

#### Delete Contact
```http
DELETE /api/contact/:id
```

### Health Check
```http
GET /api/health
```

## 📧 Email Flow

When a user submits the contact form:

1. **Data saved to MongoDB** with validation
2. **Admin receives email** with:
   - Sender's name, email, and message
   - Timestamp
   - Beautiful HTML formatted email
3. **User receives confirmation email** with:
   - Thank you message
   - Copy of their submitted message
   - Expected response time

## 📁 Project Structure

```
contact-backend/
├── config/
│   ├── database.js          # MongoDB connection
│   └── emailService.js      # Brevo email service
├── controllers/
│   └── contactController.js # Business logic
├── models/
│   └── Contact.js           # MongoDB schema
├── routes/
│   └── contactRoutes.js     # API routes
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore file
├── index.js                # Main server file
├── package.json            # Dependencies
└── README.md               # This file
```

## 🔒 Security Recommendations

For production deployment:

1. **Add authentication** to admin endpoints
2. **Rate limiting** to prevent spam
3. **HTTPS** for secure communication
4. **Environment variables** properly secured
5. **CORS** configured for your domain only
6. **Input sanitization** (already implemented)

## 🎨 Email Templates

The service sends two types of emails:

### Admin Notification Email
- Professional design with gradient header
- Displays all contact information
- Timestamp and formatting
- Easy to read on mobile

### User Confirmation Email
- Friendly welcome message
- Copy of their message
- Expected response time
- Call-to-action buttons

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
sudo service mongod start
```

### Brevo Email Not Sending
- Verify API key is correct
- Check sender email is verified in Brevo
- Check Brevo dashboard for errors
- Ensure you haven't exceeded Brevo free tier limits

### Port Already in Use
```bash
# Change PORT in .env file or kill the process
lsof -ti:5000 | xargs kill -9
```

## 📝 Testing the API

### Using curl:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message for the contact form."
  }'
```

### Using Postman:
1. Create a new POST request
2. URL: `http://localhost:5000/api/contact`
3. Body → raw → JSON
4. Add the JSON data above
5. Send request

## 🚀 Deployment

### Deploy to Heroku:
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set BREVO_API_KEY=your_brevo_key
git push heroku main
```

### Deploy to Vercel:
```bash
vercel
# Follow the prompts and add environment variables
```

## 📞 Support

If you encounter any issues, please check:
1. All environment variables are set correctly
2. MongoDB is running and accessible
3. Brevo API key is valid and email is verified
4. CORS settings match your frontend URL

## 📄 License

ISC

## 👨‍💻 Author

Your Name - Portfolio Backend

---

**Happy coding! 🎉**
