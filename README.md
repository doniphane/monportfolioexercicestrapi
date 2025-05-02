
![Contact form screenshot](https://github.com/doniphane/monportfolioexercicestrapi/public/1.png)

# 🌐 My Portfolio – Contact Form Integration (Strapi + EmailJS)

This project is a personal portfolio built with **React**, styled using **Tailwind CSS**, and powered by a **Strapi CMS** backend.  
It includes a fully functional **contact form** that:

- Sends an email using **EmailJS**
- Stores the message in the **Strapi API database**

This combination allows for both instant communication and persistent data storage in your CMS.

---

## 📁 1. Project Description

The goal of this project is to demonstrate a complete frontend + backend contact workflow:

- Visitors can submit a message via the contact form
- The message is sent to your email via EmailJS
- A copy is stored in your Strapi backend (for archive, analytics, or future reference)

The project is modular and suitable for deployment on Netlify/Vercel (frontend) and Render/Heroku (Strapi backend).

---

## 🧱 2. Technical Architecture

📁 src/
└── 📁 components/
└── ContactForm.jsx # React component for the contact form
📁 public/
📁 docs/ # Auto-generated documentation (JSDoc)
📄 jsdoc.json # JSDoc configuration
📄 .env # Environment variables for EmailJS
📁 strapi/ # Strapi backend project (optional)


**Data flow:**

1. User submits the contact form
2. `ContactForm.jsx`:
   - Sends form data to Strapi: `POST /api/contacts`
   - Sends an email using `emailjs.sendForm(...)`
3. Displays success/error feedback to the user

---

## ⚙️ 3. Technologies Used

| Layer             | Technology                 |
|-------------------|----------------------------|
| Frontend UI       | React + Tailwind CSS       |
| Contact Workflow  | EmailJS                    |
| Backend CMS       | Strapi (Node.js + SQLite)  |
| Documentation     | JSDoc                      |
| Build Tool        | Vite                       |

---

## 🚀 4. Installation Guide

### ✅ Prerequisites

- Node.js ≥ 18.x
- npm ≥ 9.x
- EmailJS account → [https://www.emailjs.com](https://www.emailjs.com)
- (Optional) Strapi CLI: `npm install -g create-strapi-app`

---

### 🧪 Frontend setup

```bash
# Clone the repository
git clone https://github.com/doniphane/monportfolioexercicestrapi

# Move into the folder
cd your-portfolio

# Install dependencies
npm install

🔐 EmailJS environment variables
Create a .env file at the root:

VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=

.

🗂️ Strapi setup (optional backend)
If using Strapi for data storage:

# Create your Strapi backend (if not already done)
cd strapi/
npm install
npm run develop

🚀 5. Deployment
🔹 Frontend
Use Vercel or Netlify to deploy your frontend (vite build)

Set environment variables (EmailJS keys) in the platform settings

🔸 Backend (Strapi)
Deploy to Render, DigitalOcean App Platform, or Heroku

Ensure permissions for contacts collection type are enabled

Configure CORS to allow requests from your frontend domain

🧩 6. Strapi Data Structure
Inside your Strapi admin panel, create a collection type named contact with the following fields:

Field name	Type	Required	Notes
name	Text	✅	formData.user_name
email	Email	✅	formData.user_email
subject	Text	✅	formData.subject
message	Rich Text	✅	formData.message
date	DateTime	✅	Generated via JavaScript

Make sure to allow the create permission for the Public role in Strapi → Settings → Users & Permissions → Roles.