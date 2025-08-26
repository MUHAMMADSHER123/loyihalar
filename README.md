# 🚀 Takomillashgan CRUD Tizimi

Zamonaviy va to'liq funksional CRUD tizimi - eslatmalar, notifikatsiyalar va real-time xususiyatlar bilan. Bu loyiha Node.js, Express, MongoDB va React yordamida yaratilgan professional darajadagi vazifa boshqaruv tizimi.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

## ✨ Asosiy Xususiyatlar

### 🔐 **Autentifikatsiya va Avtorizatsiya**
- JWT token asosidagi autentifikatsiya
- Foydalanuvchi ro'yxatdan o'tish va tizimga kirish
- Rol asosidagi ruxsat nazorati (Admin, Moderator, User)
- Profil boshqaruvi va sozlamalar

### 📝 **CRUD Operatsiyalar**
- **Create**: Yangi vazifalarni yaratish
- **Read**: Vazifalarni ko'rish va qidirish
- **Update**: Vazifalarni yangilash va tahrirlash
- **Delete**: Vazifalarni o'chirish
- Real-time progress tracking
- Kategoriya va prioritet boshqaruvi

### ⏰ **Eslatmalar Tizimi**
- Bir martalik va takrorlanuvchi eslatmalar
- Email va push notifikatsiyalar
- Cron job bilan avtomatik yuborish
- Snooze funksiyasi
- Prioritet va kategoriya belgilash

### 🔔 **Notifikatsiyalar**
- Real-time in-app notifikatsiyalar
- Email xabarlari (Nodemailer)
- Vazifa muddatlari haqida avtomatik eslatmalar
- O'qilgan/o'qilmagan holat nazorati

### 🔍 **Qidiruv va Filtrlash**
- Matn bo'yicha qidiruv
- Kategoriya, prioritet, holat bo'yicha filtrlash
- Sahifalash (Pagination)
- Saralash (Sorting)
- Advanced filters

### 📊 **Statistikalar va Hisobotlar**
- Foydalanuvchi faoliyati statistikasi
- Vazifalar holati bo'yicha hisobotlar
- Kategoriya va prioritet tahlili
- Progress tracking

### 🛡️ **Xavfsizlik**
- Helmet.js bilan HTTP security headers
- Rate limiting (DoS hujumlardan himoya)
- CORS sozlamalari
- Ma'lumotlar validatsiyasi
- SQL Injection himoyasi

## 🏗️ Arxitektura

```
├── 📁 backend/
│   ├── 📁 models/          # MongoDB modellari
│   ├── 📁 routes/          # API endpoint'lari
│   ├── 📁 middleware/      # Autentifikatsiya va boshqa middleware
│   ├── 📁 services/        # Business logic va external services
│   ├── 📁 tests/           # Unit va integration testlar
│   └── 📁 scripts/         # Utility skriptlar
├── 📁 public/             # Frontend test interface
└── 📁 coverage/           # Test coverage hisobotlari
```

## 🚀 O'rnatish va Sozlash

### Talablar
- **Node.js** >= 14.0.0
- **MongoDB** >= 4.0
- **NPM** >= 6.0.0

### 1. Loyihani Klonlash

```bash
git clone <repository-url>
cd takomillashgan-crud-tizimi
```

### 2. Dependencies O'rnatish

```bash
npm install
```

### 3. Environment Variables Sozlash

`.env` faylini yarating va quyidagi ma'lumotlarni kiriting:

```env
# Asosiy sozlamalar
NODE_ENV=development
PORT=5000

# Ma'lumotlar bazasi
MONGODB_URI=mongodb://localhost:27017/advanced_crud

# JWT sozlamalari
JWT_SECRET=sizning_juda_maxfiy_kalitingiz_2024
JWT_EXPIRE=7d

# Email sozlamalari (Gmail uchun)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=sizning_email@gmail.com
EMAIL_PASS=sizning_app_parolingiz

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 4. MongoDB Sozlash

#### Local MongoDB:
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS (Homebrew)
brew install mongodb-community

# Windows - MongoDB Community Edition ni rasmiy saytdan yuklab oling
```

#### MongoDB Cloud (Atlas):
1. [MongoDB Atlas](https://cloud.mongodb.com/) ga ro'yxatdan o'ting
2. Yangi cluster yarating
3. Connection string ni `.env` fayliga qo'shing

### 5. Ma'lumotlar Bazasini To'ldirish

```bash
# Sample data bilan to'ldirish
npm run seed

# Faqat tozalash
npm run seed -- --clear-only
```

### 6. Serverni Ishga Tushirish

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server `http://localhost:5000` da ishga tushadi.

## 🌐 API Dokumentatsiyasi

### Authentication Endpoints

#### POST `/api/auth/register`
Yangi foydalanuvchi ro'yxatdan o'tkazish

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### POST `/api/auth/login`
Tizimga kirish

```json
{
  "login": "john@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/profile`
Foydalanuvchi profili (Auth token kerak)

### Items CRUD Endpoints

#### GET `/api/items`
Barcha vazifalarni olish (query parameters bilan)

Query parameters:
- `page`: Sahifa raqami (default: 1)
- `limit`: Sahifadagi elementlar soni (default: 10)
- `search`: Qidiruv matni
- `category`: Kategoriya filtri
- `priority`: Prioritet filtri
- `status`: Holat filtri
- `sortBy`: Saralash maydoni (default: createdAt)
- `sortOrder`: Saralash tartibi (asc/desc)

#### POST `/api/items`
Yangi vazifa yaratish

```json
{
  "title": "Vazifa sarlavhasi",
  "description": "Batafsil tavsif",
  "category": "ish",
  "priority": "yuqori",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "tags": ["urgent", "important"]
}
```

#### GET `/api/items/:id`
Bitta vazifani olish

#### PUT `/api/items/:id`
Vazifani yangilash

#### DELETE `/api/items/:id`
Vazifani o'chirish

### Reminders Endpoints

#### GET `/api/reminders`
Eslatmalar ro'yxati

#### POST `/api/reminders`
Yangi eslatma yaratish

```json
{
  "title": "Eslatma sarlavhasi",
  "message": "Eslatma matni",
  "reminderDate": "2024-12-31T12:00:00.000Z",
  "type": "bir_martalik",
  "priority": "yuqori",
  "category": "uchrashuv"
}
```

#### PUT `/api/reminders/:id/snooze`
Eslatmani kechiktirish

```json
{
  "minutes": 30
}
```

### Notifications Endpoints

#### GET `/api/notifications`
Notifikatsiyalar ro'yxati

#### PUT `/api/notifications/:id/read`
Notifikatsiyani o'qilgan deb belgilash

#### PUT `/api/notifications/mark-all-read`
Barcha notifikatsiyalarni o'qilgan deb belgilash

## 🧪 Testlar

### Testlarni Ishga Tushirish

```bash
# Barcha testlar
npm test

# Watch mode
npm run test:watch

# Coverage bilan
npm run test:coverage
```

### Test Coverage

Testlar quyidagi qismlarni qamrab oladi:
- ✅ Authentication endpoints
- ✅ Items CRUD operations
- ✅ Reminders functionality
- ✅ Access control
- ✅ Input validation
- ✅ Error handling

## 🎨 Frontend Test Interface

Loyiha bilan birga keluvchi test interface orqali barcha funksiyalarni sinab ko'rishingiz mumkin:

**URL**: `http://localhost:5000`

### Mavjud bo'limlar:
1. **🔐 Autentifikatsiya** - Ro'yxatdan o'tish va tizimga kirish
2. **📝 CRUD Operatsiyalar** - Vazifalar boshqaruvi
3. **⏰ Eslatmalar** - Eslatmalar yaratish va boshqarish
4. **🔔 Notifikatsiyalar** - Xabarlarni ko'rish
5. **📚 API Ma'lumotlari** - Server haqida ma'lumot

## 📦 NPM Skriptlar

```bash
npm start              # Production server
npm run dev            # Development server (nodemon)
npm test               # Testlarni ishga tushirish
npm run test:watch     # Testlarni watch mode da ishga tushirish
npm run test:coverage  # Coverage bilan testlar
npm run seed           # Ma'lumotlar bazasini sample data bilan to'ldirish
npm run lint           # Code linting
npm run format         # Code formatting
```

## 🌍 Environment Modes

### Development
```bash
NODE_ENV=development npm run dev
```
- Verbose logging
- Auto-restart with nodemon
- Detailed error messages

### Production
```bash
NODE_ENV=production npm start
```
- Optimized performance
- Minimal logging
- Error handling

### Test
```bash
NODE_ENV=test npm test
```
- Test database
- Mock services
- Isolated environment

## 🔧 Konfiguratsiya

### MongoDB Indexes
Tizim avtomatik ravishda quyidagi indexlarni yaratadi:
- Users: email, username, createdAt
- Items: title (text), description (text), category, priority, status, createdBy, assignedTo, dueDate, tags
- Reminders: user, reminderDate, isActive, isCompleted

### Rate Limiting
- 15 daqiqada 100 ta request har bir IP uchun
- DoS hujumlardan himoya

### Security Headers
Helmet.js yordamida qo'shilgan xavfsizlik sarlavhalari:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Strict-Transport-Security

## 🚨 Tez-tez Uchraydigan Muammolar

### 1. MongoDB Ulanish Xatoligi
```
MongooseServerSelectionError: connect ECONNREFUSED
```
**Yechim**: MongoDB servisining ishlab turganini tekshiring:
```bash
# Ubuntu/Debian
sudo systemctl start mongodb

# macOS
brew services start mongodb-community

# Windows
net start MongoDB
```

### 2. Port Band Xatoligi
```
Error: listen EADDRINUSE :::5000
```
**Yechim**: Boshqa port ishlatish yoki ishlab turgan jarayonni to'xtatish:
```bash
# Boshqa port
PORT=5001 npm start

# Jarayonni topish va to'xtatish
lsof -ti:5000 | xargs kill
```

### 3. JWT Token Xatoligi
```
JsonWebTokenError: invalid token
```
**Yechim**: 
- JWT_SECRET ni to'g'ri sozlash
- Token ni to'g'ri formatda yuborish (`Bearer <token>`)

### 4. Email Yuborishda Xatolik
```
Error: Invalid login
```
**Yechim**:
- Gmail uchun App Password ishlatish
- EMAIL_HOST, EMAIL_USER, EMAIL_PASS ni to'g'ri sozlash

## 📈 Performance Optimizatsiyasi

### Database
- Indexlar yordamida qidiruv tezligini oshirish
- Aggregation pipeline yordamida murakkab query'lar
- Connection pooling

### Caching
- Redis yordamida session management (optional)
- Memory caching for frequently accessed data

### Rate Limiting
- API abuse prevention
- Per-user rate limiting

## 🤝 Hissa Qo'shish

1. Repository ni fork qiling
2. Feature branch yarating (`git checkout -b feature/AmazingFeature`)
3. O'zgarishlarni commit qiling (`git commit -m 'Add some AmazingFeature'`)
4. Branch ga push qiling (`git push origin feature/AmazingFeature`)
5. Pull Request oching

### Code Style
- ESLint va Prettier ishlatiladi
- Commit message'lar aniq va tushunarli bo'lishi kerak
- Har bir feature uchun test yozish shart

## 📄 Litsenziya

Bu loyiha MIT litsenziyasi ostida tarqatiladi. Batafsil ma'lumot uchun [LICENSE](LICENSE) faylini ko'ring.

## 👥 Mualliflar

- **Qoder Assistant** - *Bosh dasturchi* - [GitHub](https://github.com/qoder)

## 🙏 Minnatdorchilik

- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - ODM
- [JWT](https://jwt.io/) - Authentication
- [Nodemailer](https://nodemailer.com/) - Email sending
- [Jest](https://jestjs.io/) - Testing framework

## 📞 Qo'llab-quvvatlash

Agar savollaringiz bo'lsa yoki yordam kerak bo'lsa:

- 📧 Email: support@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/qoder/advanced-crud/issues)
- 📖 Documentation: [Wiki](https://github.com/qoder/advanced-crud/wiki)

---

⭐ Agar ushbu loyiha sizga foydali bo'lsa, iltimos GitHub'da star bering!

**Yaratilgan ❤️ bilan Qoder Assistant tomonidan**