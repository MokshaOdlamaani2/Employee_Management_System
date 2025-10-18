# 👨‍💼 Employee Management System (EMS)

**Employee Management System (EMS)** is a full-stack MERN application that allows admins to manage employee records with secure login, real-time updates, and data export features.

---

## 📽️ Demo

▶️ [Watch Demo on YouTube](https://youtu.be/T6ZhmAu9qc0?si=KqONBC3w3PYtN2nC)

---

## ✅ Features

* 🔐 **Admin Login** with JWT authentication and role-based access  
* 👥 **Add, View, Edit, and Delete** employee records  
* 🔍 **Search & Filter** employees by department and name  
* 📊 Interactive dashboard with key employee metrics  
* 📥 **Export employee data as CSV**  
* 💬 Toast notifications for user feedback  
* 🎨 Fully responsive and clean UI with custom CSS and icons  

---

## 🛠️ Tech Stack

| Layer       | Technology                         |
|-------------|------------------------------------|
| Frontend    | React.js, React Router, Toastify, React Icons |
| Backend     | Node.js, Express.js                |
| Database    | MongoDB with Mongoose ODM          |
| Auth        | JWT, bcryptjs                      |
| Export      | CSV export (objects-to-csv / similar lib) |

## 🧪 How to Run Locally

```bash
# Backend Setup
cd backend
npm install
node server.js

# Frontend Setup
cd ../frontend
npm install
npm start
