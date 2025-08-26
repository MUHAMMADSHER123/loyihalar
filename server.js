const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet()); // Xavfsizlik uchun
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Rate limiting - DoS hujumlardan himoya
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 daqiqa
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // har bir IP uchun maksimal 100 ta so'rov
  message: {
    success: false,
    message: 'Juda ko\'p so\'rov yuborildi, keyinroq urinib ko\'ring'
  }
});
app.use(limiter);

// Ma'lumotlar bazasiga ulanish
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/advanced_crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB ga muvaffaqiyatli ulandi');
  console.log(`📊 Ma'lumotlar bazasi: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/advanced_crud'}`);
})
.catch((error) => {
  console.error('❌ MongoDB ulanishida xatolik:', error);
  process.exit(1);
});

// Services - Notifikatsiya servislari
const NotificationService = require('./services/NotificationService');
let notificationService;

// Notifikatsiya servisini ishga tushirish
if (process.env.NODE_ENV !== 'test') {
  notificationService = new NotificationService();
  console.log('🔔 Notifikatsiya servislari ishga tushirildi');
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/api/notifications', require('./routes/notifications').router);
app.use('/api/reminders', require('./routes/reminders'));

// Asosiy sahifa - API ma'lumotlari
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Takomillashgan CRUD API ishlamoqda! 🚀',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    features: [
      '✅ CRUD operatsiyalari (Create, Read, Update, Delete)',
      '🔐 Foydalanuvchi autentifikatsiyasi va avtorizatsiya',
      '⏰ Eslatmalar tizimi (bir martalik va takrorlanuvchi)',
      '🔔 Real-time notifikatsiyalar (email va in-app)',
      '🔍 Qidiruv va filtrlash (matn, kategoriya, prioritet bo\'yicha)',
      '📊 Ma\'lumotlar eksporti va statistikalar',
      '👥 Ko\'p foydalanuvchi qo\'llab-quvvatlash',
      '🏷️ Teglar va kategoriyalar',
      '💬 Izohlar tizimi',
      '👍 Like/unlike funksiyasi',
      '📱 Responsive dizayn',
      '🛡️ Xavfsizlik (Rate limiting, CORS, Helmet)',
      '📈 Progress tracking',
      '🎯 Prioritet darajalari',
      '📅 Muddat belgilash va nazorat',
      '🔄 Takrorlanuvchi eslatmalar'
    ],
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Ro\'yxatdan o\'tish',
        'POST /api/auth/login': 'Tizimga kirish',
        'GET /api/auth/profile': 'Profil ma\'lumotlari',
        'PUT /api/auth/profile': 'Profilni yangilash',
        'POST /api/auth/change-password': 'Parolni o\'zgartirish'
      },
      items: {
        'GET /api/items': 'Barcha vazifalarni olish (filter, search, pagination)',
        'GET /api/items/:id': 'Bitta vazifani olish',
        'POST /api/items': 'Yangi vazifa yaratish',
        'PUT /api/items/:id': 'Vazifani yangilash',
        'DELETE /api/items/:id': 'Vazifani o\'chirish',
        'POST /api/items/:id/comments': 'Izoh qo\'shish',
        'POST /api/items/:id/like': 'Like/unlike qilish',
        'GET /api/items/stats/overview': 'Statistikalar'
      },
      reminders: {
        'GET /api/reminders': 'Eslatmalarni olish',
        'GET /api/reminders/upcoming': 'Kelayotgan eslatmalar',
        'GET /api/reminders/active': 'Faol eslatmalar',
        'POST /api/reminders': 'Yangi eslatma yaratish',
        'PUT /api/reminders/:id': 'Eslatmani yangilash',
        'PUT /api/reminders/:id/complete': 'Eslatmani bajarilgan deb belgilash',
        'PUT /api/reminders/:id/snooze': 'Eslatmani kechiktirish',
        'DELETE /api/reminders/:id': 'Eslatmani o\'chirish'
      },
      notifications: {
        'GET /api/notifications': 'Notifikatsiyalarni olish',
        'GET /api/notifications/unread-count': 'O\'qilmagan notifikatsiyalar soni',
        'PUT /api/notifications/:id/read': 'Notifikatsiyani o\'qilgan deb belgilash',
        'PUT /api/notifications/mark-all-read': 'Barchasini o\'qilgan deb belgilash',
        'DELETE /api/notifications/:id': 'Notifikatsiyani o\'chirish'
      }
    },
    technologies: [
      'Node.js + Express.js',
      'MongoDB + Mongoose',
      'JWT Authentication',
      'Nodemailer (Email)',
      'Cron Jobs (Scheduled tasks)',
      'Express Validator',
      'Helmet.js (Security)',
      'CORS',
      'Rate Limiting'
    ]
  });
});

// API dokumentatsiya route
app.get('/api', (req, res) => {
  res.redirect('/');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 404 - topilmagan sahifalar
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint topilmadi',
    availableEndpoints: [
      'GET /',
      'GET /health',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/items',
      'GET /api/reminders',
      'GET /api/notifications'
    ]
  });
});

// Global xatoliklarni boshqarish
app.use((err, req, res, next) => {
  console.error('❌ Global xatolik:', err.stack);
  
  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Ma\'lumotlar validation xatoligi',
      errors
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Noto\'g\'ri token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token muddati tugagan'
    });
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} allaqachon mavjud`
    });
  }

  // Default server error
  res.status(500).json({
    success: false,
    message: 'Serverda ichki xatolik yuz berdi',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Ichki server xatosi',
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🔄 SIGTERM signal qabul qilindi. Server yopilmoqda...');
  await mongoose.connection.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🔄 SIGINT signal qabul qilindi. Server yopilmoqda...');
  await mongoose.connection.close();
  process.exit(0);
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('🌟 =====================================');
  console.log(`🚀 Server ${PORT} portida ishlamoqda`);
  console.log(`🔗 API manzili: http://localhost:${PORT}`);
  console.log(`📖 API dokumentatsiya: http://localhost:${PORT}`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('🌟 =====================================');
});

// Export for testing
module.exports = { app, server, notificationService };