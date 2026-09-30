# Deployment Guide: Cloudflare Pages + Render + MongoDB Atlas

## Step 1: MongoDB Atlas Setup

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. Under **Network Access**, ensure IP `0.0.0.0/0` is allowed (Allow access from anywhere, so Render can connect).
3. Under **Database Access**, verify your user credentials.
4. Copy your connection string:
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/assignmentDB?retryWrites=true&w=majority`

---

## Step 2: Deploy Backend on Render

1. Push your project or `backend` folder to a GitHub repository.
2. Sign in to [Render](https://render.com/).
3. Click **New +** → **Web Service**.
4. Connect your GitHub repository.
5. Fill in the following details:
   - **Root Directory:** `backend` (if repo has both frontend and backend)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Scroll down to **Environment Variables** and add:
   - `MONGO_URI` = `Your MongoDB connection string`
   - `CLIENT_URL` = `*` (or your Cloudflare domain later)
7. Click **Deploy Web Service**.
8. Once deployed, copy your Render URL:
   `https://your-service-name.onrender.com`

---

## Step 3: Configure and Deploy Frontend on Cloudflare Pages

1. Open `frontend/script.js`.
2. Update the `BACKEND_URL` constant with your Render URL:
   ```javascript
   const BACKEND_URL =
     "[https://your-service-name.onrender.com](https://your-service-name.onrender.com)";
   ```
