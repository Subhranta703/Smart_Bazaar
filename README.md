# 🛒 MERN Grocery Shop Project

Welcome to the MERN Grocery Shop Project! This project is built using the MERN (MongoDB, Express, React, Node.js) stack and incorporates various features like user authentication, product listings, reviews, and more.

## 📋 Features

- 🚀 **Login/Sign Up**: Users can create accounts or log in to existing ones.
- 🔐 **Forgot Password**: Forgot your password? No problem! Users can reset their passwords via email.
- 🔒 **Update Password**: Users can change their passwords for added security.
- 📝 **Customer Reviews**: Customers can leave reviews for products.
- ✏️ **Update Reviews**: Customers can edit or delete their reviews.
- 📦 **Product Lists**: Browse and view product listings.
- 🔍 **Filter Products**: Filter products by category, price, or other attributes.
- 🔎 **Search Products**: Search for specific products by name or keywords.
- 🛒 **Cart Items**: Add products to the cart for purchase.
- 🛍️ **Order Summary**: Review and confirm orders before checkout.
- 📄 **Order Details**: View order history and details.
- 👨‍💼 **Admin Functionality**: Special features for administrators to manage products and users.

## Installation

1. Clone the repository:

   ```bash
  
   ```

2. Change into the project directory:

   ```bash
   cd grocery-shop
   ```

3. Install backend dependencies:

   ```bash
   npm install
   ```

4. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

## Configuration

1. Create a `.env` file in the `root` directory with the following environment variables:

   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET_KEY = jwt_secret_key
   JWT_RESET_PASSWORD_SECRET_KEY = jwt_reset_password_secret_key
   COOKIE_EXPIRE = 5
   SMPT_MAIL = smpt_mail
   SMPT_PASSWORD = smpt_password
   CLOUD_NAME = your_cloudinary_cloud_name
   CLOUD_API_KEY =  your_cloudinary_api_key
   CLOUD_API_SECRET_KEY =  your_cloudinary_api_secret
   ```

## Usage

1. Start the backend:

   ```bash
   npm run dev
   ```

2. Start the frontend:

   ```bash
   cd frontend
   npm start
   ```

3. Access the application in your web browser at `http://localhost:3000`.

## Technologies

- 📦 **MongoDB**: A NoSQL database for storing data.
- ⚙️ **Express.js**: A web application framework for Node.js.
- ⚛️ **React**: A JavaScript library for building user interfaces.
- 🚀 **Node.js**: A JavaScript runtime for server-side development.
- 🔑 **JWT**: JSON Web Tokens for user authentication.
- 🔒 **bcrypt**: A library for hashing user passwords.
- 💌 **Nodemailer**: A library for sending email.
- ☁️ **Cloudinary**: A cloud-based image and video management service.

Happy coding! 👩‍💻👨‍💻
