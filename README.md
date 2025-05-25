# GreenPoint

GreenPoint is a web-based application designed to encourage and reward environmentally friendly behavior by allowing users to deposit waste, earn points, and redeem rewards. The system supports both regular users and administrators, and features a responsive, modern UI.

## 🌱 Features
- User registration, login, and password reset (with email verification)
- Deposit waste at registered Bank Sampah locations
- Earn points for each deposit
- Redeem points for rewards
- View deposit and redemption history
- Admin dashboard for managing users, rewards, and Bank Sampah
- Interactive map for finding Bank Sampah locations

## 💻 Tech Stack

![Postgres](https://img.shields.io/badge/Postgres-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

## 📊 Database Structure
- Users
- Bank Sampahs
- Waste Types
- Waste Deposits
- Rewards
- Reward Redemptions

See `Kelengkapan/backup.sql` for full schema and sample data.

## 🗂️ Project Structure
```
GreenPoint/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── database/
│   ├── package.json
│   └── ...
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── assets/
│   │   └── contexts/
│   ├── package.json
│   └── ...
├── Kelengkapan/
│   └── backup.sql
└── README.md
```

## 🛠️ Installation Guide

### 1. Clone the Repository
```sh
git clone <repo-url>
cd GreenPoint
```

### 2. Setup the Backend
```sh
cd Backend
npm install
```
- Create a `.env` file in `Backend/` and add your variables (see `.env.example` if available):
  - `PORT=3000`
  - `PG_CONNECTION=...`
  - `JWT_SECRET=...`
  - `EMAIL_USER=...`
  - `EMAIL_PASS=...`
  - `FRONTEND_URL=https://greenpoint-fe.vercel.app`
- To start the backend:
```sh
npm start
```

### 3. Setup the Frontend
```sh
cd ../Frontend
npm install
```
- To start the frontend:
```sh
npm run dev
```

### 4. Database
## 🖼️ Diagrams
- UML

![UML](https://i.ibb.co/gZq2XPF6/Untitled-5.png)
- ERD
![ERD](https://i.ibb.co/Mxs69hH3/erd.png)
- Flowchart
![Flowchart](https://hackmd.io/_uploads/r11o6Xqbxg.jpg)

## 🚀 Deployment
- The project is ready for deployment on Vercel (Frontend) and any Node.js-compatible host (Backend).

## 👥 Contributors
- Nelson Laurensius
- Izzan Nawa Syarif
- Reyhan Ahnaf Deannova

---


