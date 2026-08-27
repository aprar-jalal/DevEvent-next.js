# 🚀 DevEvent

A modern web platform for discovering, exploring, and creating developer events.

DevEvent allows developers and students to browse upcoming events, view detailed event information, create new events, and reserve their spots through a simple and responsive interface.

## ✨ Features

* 📅 Browse upcoming developer events
* 🔍 View detailed information about each event
* 🎯 Automatically generated event slugs from event titles
* 🖼️ Upload event images using Cloudinary
* 📝 Create and publish new events
* 📋 Add dynamic agenda items
* 🏷️ Add multiple event tags
* 📍 Display event location, venue, date, and time
* 💻 Support online, offline, and hybrid events
* 👥 Book a spot for an event using an email address
* 🔗 Display similar events
* 📱 Responsive design for different screen sizes
* ⚡ Server-side data fetching with Next.js
* 🗄️ MongoDB database integration
* 🚀 API routes for events and bookings

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* React Icons

### Backend

* Next.js Route Handlers
* MongoDB
* Mongoose

### Services

* Cloudinary — Image storage and optimization

## 📂 Project Structure

```text
DevEvent/
├── app/
│   ├── api/
│   │   ├── events/
│   │   │   ├── [slug]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   └── bookings/
│   │       └── route.ts
│   │
│   ├── events/
│   │   ├── [slug]/
│   │   │   ├── page.tsx
│   │   │   └── EventDetails.tsx
│   │   ├── page.tsx
│   │   └── create/
│   │       └── page.tsx
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── Card/
│   │   └── eventCard.tsx
│   └── bookEvent/
│       └── bookEvent.tsx
│
├── lib/
│   ├── actions/
│   │   └── event.actions.ts
│   ├── mongodb.ts
│   └── utils.ts
│
├── models/
│   ├── Event.ts
│   └── Booking.ts
│
├── public/
│   └── assets/
│
├── .env.local
├── package.json
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/devevent.git
```

### 2. Navigate to the project

```bash
cd devevent
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Replace the values with your own MongoDB and Cloudinary credentials.

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🗄️ Database

DevEvent uses **MongoDB** with **Mongoose** for data persistence.

### Event

Each event contains information such as:

```text
title
slug
description
overview
image
venue
location
date
time
mode
audience
agenda
organizer
tags
createdAt
updatedAt
```

The `slug` is automatically generated from the event title.

For example:

```text
Title:
Backend Development Workshop

Slug:
backend-development-workshop
```

### Booking

Bookings are associated with an event and contain:

```text
eventId
email
createdAt
updatedAt
```

## 🔌 API Endpoints

### Get Events

```http
GET /api/events
```

Optional limit:

```http
GET /api/events?limit=6
```

### Get Event by Slug

```http
GET /api/events/:slug
```

Example:

```http
GET /api/events/backend-development-workshop
```

### Create Event

```http
POST /api/events
```

The endpoint accepts `multipart/form-data` because an event can contain an image.

The image is uploaded to Cloudinary and the returned URL is stored in MongoDB.

### Create Booking

```http
POST /api/bookings
```

Example request:

```json
{
  "eventId": "event_id",
  "email": "user@example.com"
}
```

## 🖼️ Image Upload

Event images are uploaded to **Cloudinary** instead of being stored directly in the application.

The upload flow is:

```text
User selects image
        ↓
Create Event Form
        ↓
POST /api/events
        ↓
Cloudinary Upload
        ↓
Cloudinary returns image URL
        ↓
Save URL in MongoDB
```

## 🔄 Event Creation Flow

```text
User fills out event form
        ↓
FormData is created
        ↓
Agenda & Tags are converted to JSON
        ↓
POST /api/events
        ↓
Backend validates the image
        ↓
Image uploaded to Cloudinary
        ↓
Slug generated from title
        ↓
Event saved in MongoDB
        ↓
Created event returned
        ↓
User redirected to /events/[slug]
```

## 📱 Responsive Design

The application is designed to work across:

* 📱 Mobile
* 📱 Tablet
* 💻 Desktop
* 🖥️ Large screens

Event cards use responsive grid layouts and the event details page adapts between a single-column mobile layout and a two-column desktop layout.

## 🚀 Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## 🔐 Environment Variables

Never commit `.env.local` or expose your database and Cloudinary credentials.

Make sure `.env.local` is included in `.gitignore`:

```text
.env*
```

## 🎯 Future Improvements

* 🔐 User authentication
* 👤 User profiles
* ❤️ Save events to favorites
* 🔎 Event search
* 🏷️ Filter events by tags
* 📅 Calendar integration
* 📧 Booking confirmation emails
* 📊 Event organizer dashboard
* ✏️ Edit and delete events
* 👥 Display the number of registered attendees
* 🔒 Authentication and authorization for event creation

## 👩‍💻 Author

**Aprar Ismail**

Software Engineering Student
An-Najah National University

## 📄 License

This project is created for educational and portfolio purposes.
