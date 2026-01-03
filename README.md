# 🌍 TourBuddy | Frontend

![License](https://img.shields.io/badge/License-MIT-blue.svg) ![Next.js](https://img.shields.io/badge/Next.js-16.x-000000) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6) ![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

> **A secure, community-driven travel platform connecting travelers with verified local hosts.**
> Built with the latest Next.js 15 ecosystem to ensure speed, SEO, and a seamless booking experience.

---

## 🚀 Project Overview

**TourBuddy** is a modern Single Page Application (SPA) designed to solve the trust deficit in community travel. It enables **Travelers** to find unique trips, **Hosts** to manage expeditions, and **Moderators** to ensure platform safety through rigorous identity checks.

It integrates seamlessly with a robust backend to deliver:
- 🔐 **Rigorous Identity Verification:** "Gatekeeper" system requiring Live Selfie + NID Card matching.
- 👥 **Role-Based Dashboards:** Distinct experiences for Travelers, Hosts, and Moderators.
- ⚡ **Real-Time Updates:** Instant status changes for trip requests and bookings.
- 🎨 **Adaptive UI:** Beautifully designed using `shadcn/ui` and `Tailwind CSS`.
- 💳 **Secure Payments:** Integrated payment gateway for hassle-free booking.

---

## 🛠️ Tech Stack

### **Frontend**

| Category                      | Technologies                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Framework & Core** | ![Next.js](https://img.shields.io/badge/Next.js%2015-000000?style=flat&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)                                                                                                                                                                                                                                                                                                                      |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **State Management** | ![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=flat&logo=redux&logoColor=white) ![RTK Query](https://img.shields.io/badge/RTK%20Query-593D88?style=flat&logo=redux&logoColor=white)                                                                                                                                                                                                                                                                                                                |
| **Styling & UI** | ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) ![Shadcn UI](https://img.shields.io/badge/shadcn%2Fui-000000?style=flat&logo=shadcnui&logoColor=white) ![Lucide Icons](https://img.shields.io/badge/Lucide%20Icons-18181B?style=flat&logo=lucide&logoColor=white)                                                                                                                                                                                                  |
| **Notifications** | ![Sonner](https://img.shields.io/badge/Sonner-121212?style=flat&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **API Integration** | ![REST API](https://img.shields.io/badge/REST%20API-009688?style=flat&logo=fastapi&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)                                                                                                                                                                                                                                                                                                                                  |
| **Authentication** | ![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=flat&logo=nextdotjs&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)                                                                                                                                                                                                                                                                                                                           |
| **Version Control** | ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)                                                                                                                                                                                                                                                                                                                                               |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                   |

---

## 🧩 Features by Role

### 🎒 **Traveler**
- **Discover Trips:** Filter by destination, budget, and dates.
- **Trip Buddy Request:** Send join requests to secure a spot.
- **Booking History:** Track past and upcoming journeys.
- **Profile:** Manage personal details and KYC submission.

### 🎤 **Host**
- **Create Trips:** Detailed forms with itinerary, photos, and pricing.
- **Manage Bookings:** Accept or reject traveler requests.
- **Trip Analytics:** View participant lists and payment status.

### 🛡️ **Moderator & Admin**
- **Rigorous Verification:** Compare **Live Selfie Camera** captures against uploaded **NID Cards** to ensure real user identity.
- **Content Moderation:** Review and approve/reject trip listings before they go live.
- **User Management:** Suspend suspicious accounts or promote trusted users.
- **Platform Oversight:** Monitor all activity via a comprehensive admin dashboard.

---

## ⚙️ Setup Instructions

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/jakir-md/tourbuddy-client
cd tourbuddy-frontend
npm install

### **2️⃣ Configure Environment Variables**
NEXT_PUBLIC_BASE_API_URL=https://tourbuddy-server.onrender.com/api/v1

### **3️⃣ Run The Development Server**
```bash
npm run dev
```

## 🌐 Deployment URLs

| Service   | Live URL |
|------------|-----------|
| 🧩 **Backend API** | [https://tourbuddy-server.onrender.com/api/v1](https://tourbuddy-server.onrender.com/api/v1) |
| 💻 **Frontend App** | [https://tourbuddy-client.vercel.app](https://tourbuddy-client.vercel.app/) |