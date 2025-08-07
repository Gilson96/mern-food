# 🍔 MERN Food Ordering App (TypeScript + Redux + TailwindCSS + Stripe)

A **full‑stack food ordering platform** built with **React, Redux Toolkit Query, TypeScript, Node.js, Express, MongoDB**, and **Stripe** for secure payments.  
Users can browse restaurants, order food, leave reviews, and pay online.  
Admins can manage restaurants, foods, and view customer activity.

---

🚀 **Live Demo**: [https://gilson96.github.io/mern-foods](https://gilson96.github.io/mern-food)  
🔌 **Backend API**: [https://github.com/Gilson96/react-foods_api](https://github.com/Gilson96/react-foods_api)

---

## 🔑 Test Credentials
**User Account**  
Email: `user@user.com`  
Password: `user123`

**Admin Account**  
Email: `admin@admin.com`  
Password: `admin123`

**Stripe Test Card**  
Card Number: `4242 4242 4242 4242`  
Expiry: Any future date  
CVC: Any 3 digits

---

## 🔒 Features

### **User**
- Browse restaurants & menus
- Search for foods/restaurants
- Add items to cart
- Checkout with Stripe payment
- Leave reviews & ratings

### **Admin**
- Add, edit, and delete restaurants
- Add, edit, and delete foods
- View and manage customer orders
- Moderate reviews

---

## 🛠 Tech Stack

### **Frontend**
- React 18 + TypeScript
- Redux Toolkit Query for state & API management
- React Hook Form + Zod for form validation
- Tailwind CSS + Shadcn UI for styling
- Stripe integration for payments

### **Backend**
- Node.js + Express.js
- MongoDB + Mongoose ODM
- JWT Authentication + bcrypt password hashing
- Multer for image uploads
- Express Validator for request validation
- Stripe SDK for payment processing
- Hosted on **Heroku**

---

## 📷 Screenshots

### 🔐 Login Page  
![Login Page](https://github.com/Gilson96/mern-food/blob/master/src/assets/screenshots/loginPage.png?raw=true)

### 🏠 Homepage with Search & Filters  
![Homepage](https://github.com/Gilson96/mern-food/blob/master/src/assets/screenshots/homePage.png?raw=true)
![Search & Filters]([https://github.com/Gilson96/mern-foods/blob/master/src/screenshots/search.png?raw=true](https://github.com/Gilson96/mern-food/blob/master/src/assets/screenshots/navigator.png?raw=true))

### 🍕 Restaurant  
![Restaurant](https://github.com/Gilson96/mern-food/blob/master/src/assets/screenshots/restaurantPage.png?raw=true)
![Menu](https://github.com/Gilson96/mern-food/blob/master/src/assets/screenshots/restaurantMenu.png?raw=true)
![Food](https://github.com/Gilson96/mern-food/blob/master/src/assets/screenshots/food.png?raw=true)

### 💳 Stripe Checkout  
![Checkout](https://github.com/Gilson96/mern-food/blob/master/src/assets/screenshots/checkout.png?raw=true)

### ✅ Profile
![Profile](https://github.com/Gilson96/mern-food/blob/master/src/assets/screenshots/profilePage.png?raw=true)


---

## 🧭 How to Run Locally

### 1. Clone the Repositories

```bash
# Frontend
git clone https://github.com/Gilson96/mern-food.git
cd mern-food
npm install
npm run dev

# Backend
git clone https://github.com/Gilson96/react-foods_api.git
cd react-foods_api
npm install
npm run dev
```
### 2. Configure Backend .env
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
```

## 📌 Project Highlights

- Full authentication & role‑based access (user/admin)

- End‑to‑end ordering & checkout system

- Stripe payment integration with test mode

- Responsive & accessible design

- Production‑ready backend with image uploads & validation

- Optimised for performance with lazy loading and RTK Query caching

---

🤝 Contact

👤 GitHub: @Gilson96

💼 LinkedIn: www.linkedin.com/in/gilson-de-almeida

📧 Email: grafael99@gmail.com

Built with ❤️ using TypeScript, Redux, TailwindCSS and the MERN stack – by a developer passionate about crafting real-world apps for real users. 🇬🇧
