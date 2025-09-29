# 🏠 Home Automation System

A complete **Home Automation System** using **ESP8266, Node.js, MySQL, and a Web Dashboard**. This project allows you to control and monitor home appliances from anywhere through a simple and responsive web interface.

---

## 📖 Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [System Architecture](#system-architecture)
5. [Project Structure](#project-structure)
6. [Installation & Setup](#installation--setup)
7. [Usage](#usage)
8. [Future Enhancements](#future-enhancements)
9. [Contributing](#contributing)

---

## 🔎 Introduction

This project is designed to make homes smarter by allowing remote control of appliances through the internet. The **ESP8266 Wi-Fi module** acts as a bridge between physical devices and the server, while the **Node.js backend** and **MySQL database** handle requests, logging, and data storage. A web-based dashboard enables users to toggle appliances, view real-time status, and track usage history.

---

## ✨ Features

* 📡 **ESP8266 Integration** – Controls appliances via Wi-Fi.
* 🌐 **Web Dashboard** – User-friendly interface for device management.
* 📊 **Database Logging** – MySQL stores appliance activity with date & time.
* ⏱ **Real-Time Status** – Shows whether devices are ON or OFF.
* 👥 **User Management** – Supports multiple users.
* 🔒 **Authentication (JWT-ready)** – Protects dashboard with secure login.
* 📧 **Email Notifications** – Sends alerts for events (optional).

---

## 🛠 Tech Stack

* **Hardware:** ESP8266 Wi-Fi Module
* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js + Express
* **Database:** MySQL
* **Communication:** HTTP (ESP8266 ↔ Node.js Server)

---

## 🏗 System Architecture

```
[User Dashboard] ⇆ [Node.js + Express Server] ⇆ [MySQL Database]  
                                   ⇅  
                             [ESP8266 Module] ⇆ [Appliances]
```

---

## 📂 Project Structure

```
home-automation/
│
├── backend/        # Node.js + Express server files
├── frontend/       # HTML, CSS, JavaScript for dashboard
├── database/       # MySQL database scripts
├── esp8266/        # ESP8266 Arduino code
└── README.md       # Project documentation
```

---

## ⚙️ Installation & Setup

### 🔧 Prerequisites

* Node.js & npm installed
* MySQL installed and configured
* Arduino IDE for ESP8266

### 🖥️ Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/home-automation.git
   cd home-automation
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Database Setup**

   * Import the MySQL script from `database/` folder.
   * Update database credentials in `backend/config.js`.

4. **ESP8266 Setup**

   * Open the `esp8266/` code in Arduino IDE.
   * Update Wi-Fi credentials and server IP.
   * Upload code to ESP8266.

5. **Frontend Setup**

   * Open `frontend/index.html` in your browser.
   * The dashboard should now connect with your backend.

---

## 🚀 Usage

1. Access the web dashboard in your browser.
2. Toggle appliances ON/OFF with buttons.
3. View real-time device status.
4. Check logs for past activity.

---

## 🔮 Future Enhancements

* Add **mobile app** for easier control.
* Enable **WebSocket (real-time) communication**.
* Integrate **Google Assistant / Alexa voice control**.
* Add **energy monitoring** for appliances.

---

## 🤝 Contributing

Contributions are welcome! Fork the repo, create a branch, and submit a pull request.

---
