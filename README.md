# 🛍️ **PUP E-Commerce**  

An advanced, high-performance **eCommerce platform** built with **Next.js 15**, featuring modern UI, optimized SEO, and seamless shopping experience.  

---

## 🚀 **Features**  
✅ **Next.js 15 App Router** – Optimized performance with the latest features.  
✅ **Server Actions** – Improved API handling and data mutations.  
✅ **Tailwind CSS** – Fully responsive & sleek UI.  
✅ **Authentication** – Secure user login/signup (NextAuth or custom JWT).  
✅ **Product Management** – Add, update, delete products easily.  
✅ **Cart & Checkout** – Smooth shopping cart experience.  
✅ **Payment Integration** – Stripe or PayPal for seamless payments.  
✅ **SEO Optimized** – Dynamic metadata for better search rankings.  
✅ **Image Optimization** – Next.js `next/image` for fast loading.  

---

## 🏗 **Tech Stack**  
🔹 **Frontend:** Next.js 15, React, Tailwind CSS  
🔹 **Backend:** Node.js, Express  
🔹 **Database:** MongoDB  
🔹 **Authentication:** JWT  
🔹 **Deployment:** Vercel, Docker  

---

## 📦 **Installation**  

### **1️⃣ Clone the Repository**  
```bash
# Clone the repository
git clone https://github.com/alimalikali/supreme-pup.git
cd supreme-pup
```

### **2️⃣ Install Dependencies**  
#### Frontend:
```bash
cd client
npm install  # or yarn install
```
#### Backend:
```bash
cd server
npm install  # or yarn install
```

### **3️⃣ Set Up Environment Variables**  
#### **Frontend (`.env.local`)**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
JWT_SECRET=your_jwt_secret_key
```

#### **Backend (`.env`)**
```env
# Database connection string
MONGO_URI="mongodb://localhost:27017/yourdb"

# Server Port
PORT=5000

# Frontend URL
ORIGIN="http://localhost:3000"

# Email credentials for sending password resets and OTPs
EMAIL=""
PASSWORD=""

# Token and cookie expiration settings
LOGIN_TOKEN_EXPIRATION="30d"
OTP_EXPIRATION_TIME="120000"
PASSWORD_RESET_TOKEN_EXPIRATION="2m"
COOKIE_EXPIRATION_DAYS="30"

# Secret key for JWT security
SECRET_KEY=""

# Environment mode
PRODUCTION="false"

# Cloudinary API for image uploads
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### **4️⃣ Run the Development Servers**  
#### **Start Backend**
```bash
cd server
npm run dev  # Runs on localhost:5000
```

#### **Start Frontend**
```bash
cd client
npm run dev  # Runs on localhost:3000
```

---

## 🚀 **Deployment**  

### **Frontend Deployment**  
#### **Vercel Deployment**
```bash
vercel
```

### **Backend Deployment**  
#### **Deploy on Render or DigitalOcean**  
1. Create a MongoDB database (MongoDB Atlas, DigitalOcean, etc.).  
2. Add your production `.env` variables.  
3. Use a process manager like PM2:  
```bash
pm install -g pm2
pm run build
pm start
pm2 start server.js --name pup-backend
```

### **Docker Deployment**  
```bash
docker build -t pup-ecommerce .
docker run -p 5000:5000 pup-ecommerce
```

---

## 💡 **Contributing**  
1️⃣ Fork the repo.  
2️⃣ Create a new branch: `git checkout -b feature-name`.  
3️⃣ Commit changes: `git commit -m "Add feature"`.  
4️⃣ Push & submit a PR: `git push origin feature-name`.  

---

## 📄 **License**  
This project is licensed under the **GNU GENERAL PUBLIC LICENSE**.  

---

## 📬 **Contact**  
👤 **Ali Zulfiqar Malik**  
🔗 [Portfolio](https://alizulfiqarmalik.vercel.app)  
🐙 [GitHub](https://github.com/alimalikali)  
💼 [LinkedIn](https://www.linkedin.com/in/alizulfiqarmalik)  

---


