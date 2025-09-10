---

# 🚀 URL Shortener

A simple **URL Shortener** built with **Node.js, Express, MongoDB, and EJS**.
It allows users to shorten long URLs and track analytics like visit count.

---

## 📌 Features

* 🔗 Shorten any long URL into a unique short ID
* 📊 Track visit history (clicks and timestamps)
* 🎨 Basic styled frontend using **EJS templates**
* 💾 MongoDB database for storing URLs
* ⚡ Express.js backend for routing

---

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose ODM)
* **Templating Engine**: EJS
* **Styling**: Basic CSS

---

## 📂 Project Structure

```
Short-Url/
│-- controller/
│   └── url.js         # URL business logic
│-- models/
│   └── url.js         # URL schema & model
│-- routes/
│   ├── url.js         # URL routes (shorten, analytics)
│   └── staticRouter.js # Static pages
│-- views/
│   └── Home.ejs       # Frontend view
│-- connect.js         # MongoDB connection
│-- index.js           # Main server file
│-- package.json
│-- README.md
```

---

## ⚙️ Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/short-url.git
   cd short-url
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start MongoDB locally (make sure it's running on `mongodb://localhost:27017`):

   ```bash
   mongod
   ```

4. Run the server:

   ```bash
   npm start
   ```

   or

   ```bash
   node index.js
   ```

---

## 🌐 Usage

* Open in browser:

  ```
  http://localhost:8001
  ```

* Create a new short URL.

* You’ll see a list of all generated URLs.

* Click the **shortId** to visit the original site.

* Analytics can be checked at:

  ```
  /url/analytics/:shortId
  ```

---

## 📊 Example

* Input:

  ```
  https://www.google.com/search?q=nodejs
  ```
* Output:

  ```
  Short URL: http://localhost:8001/url/xSwNncWOq
  ```

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---
