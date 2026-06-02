# SnapVault ( Cloud Photo Storage & Sharing Platform )

- SnapVault is a full-stack cloud-based photo storage & album sharing application that allows users to securely upload, organize, manage, and share their images.
- It provides album management, secure authentication, and collaborative photo sharing features.
- Built with React, Node.js, Express, MongoDB, Cloudinary, and modern authentication technologies.

---

## Demo Link

[Live Demo](https://kavios-pix-frontend-xi.vercel.app/)

## Quick Start

```bash
git clone https://github.com/CyberMehul135/SnapVault_Frontend.git
cd <your-repo>
npm install
npm run dev
```

## Technologies

#### Frontend :

* React JS
* Shadcn
* Tailwind CSS
* Redux
* Reqact Query
* React Router
* Axios
* React Hot Toast

#### Backend :

* Node.js
* Express.js
* JWT Authentication
* Google OAuth 2.0
* Multer
* Nodemailer

#### Database :

* MongoDB
* Mongoose

#### Cloud Services :

* Cloudinary

---

## Demo Video

Watch a walkthrough (5-6 minutes) of all major features of this app :

[Video Link](YOUR_VIDEO_LINK)

---

## Features

### Authentication & Security

* JWT-based Authentication using HTTP-only Cookies
* Google OAuth Login
* Protected Routes
* Session Persistence

### Image Management

* Upload images to cloud storage
* Preview uploaded images
* Delete images
* Filter images by tags
* View image details

### Album Management

* Create albums
* Delete albums
* Add images to albums
* Remove images from albums
* View album-specific images

### Shared Albums

* Share albums with other users
* View albums shared by other users

### Cloud Storage

* Images stored securely on Cloudinary
* Optimized image delivery
* Reduced server storage usage
* Fast image loading experience


---


## API Reference

### Authentication

### **GET /api/v1/auth/google**<br>

Redirect user to Google OAuth authentication page<br>
Sample Response:<br>
`Redirects user to Google Sign-In`

### **GET /api/v1/auth/google/callback**<br>

Handle Google OAuth callback, create/login user, generate JWT token, and set secure cookie<br>
Sample Response:<br>
`Redirects authenticated user to frontend application`

### **GET /api/v1/auth/me**<br>

Get details of the currently authenticated user<br>
Sample Response:<br>
`{message, user}`

### **GET /api/v1/auth/session**<br>

Verify current user session and authentication status<br>
Sample Response:<br>
`{message, user}`

### **POST /api/v1/auth/logout**<br>

Logout the current user and clear authentication cookie<br>
Sample Response:<br>
`{message}`


---

### Albums

### **POST /api/v1/albums**<br>

Create a new album with cover image<br>
Sample Response:<br>
`{message, album}`

### **GET /api/v1/albums**<br>

List all albums owned by the authenticated user with image count<br>
Sample Response:<br>
`{albums: [{_id, name, description, coverImage, imageCount, createdAt}, ...]}`

### **GET /api/v1/albums/shared**<br>

List all albums that have been shared with other users<br>
Sample Response:<br>
`{albums: [{_id, name, description, sharedUsers, imageCount}, ...]}`

### **PUT /api/v1/albums/share**<br>

Share an album with one or more users via email invitation<br>
Sample Response:<br>
`{message, album}`

### **DELETE /api/v1/albums/**<br>

Delete an album and all associated images<br>
Sample Response:<br>
`{message}`

---

### Album Images

### **POST /api/v1/albums/:albumId/images**

Upload a new image to an album<br>
Sample Response:<br>
`{message, image}`

### **GET /api/v1/albums/:albumId/images**

Get all images from an album (supports tag filtering)<br>
Sample Response:<br>
`{_id, name, description, images:[...]}`

### **GET /api/v1/albums/:albumId/images/favourite**

Get all favourite images from an album<br>
Sample Response:<br>
`{albumImages:[{_id, name, imageUrl, isFavourite}, ...]}`

### **GET /api/v1/albums/:albumId/images/tags**

Get all unique tags used in an album<br>
Sample Response:<br>
`{tags:["Nature","Travel","Family"]}`

### **PUT /api/v1/albums/:albumId/images/:imageId/favourite**

Toggle favourite status of an image<br>
Sample Response:<br>
`{message, image}`

### **PUT /api/v1/albums/:albumId/images/:imageId/comments**

Add a comment to an image<br>
Sample Response:<br>
`{message, image}`

### **PUT /api/v1/albums/:albumId/images/:imageId/comments/:commentsId**

Remove a comment from an image<br>
Sample Response:<br>
`{message, image}`

### **PUT /api/v1/albums/:albumId/images/:imageId/tags**

Add a tag to an image<br>
Sample Response:<br>
`{message, image}`

### **PUT /api/v1/albums/:albumId/images/:imageId/tags/:tag**

Remove a tag from an image<br>
Sample Response:<br>
`{message, image}`

### **PUT /api/v1/albums/:albumId/images/:imageId/person**

Update person information associated with an image<br>
Sample Response:<br>
`{message, image}`

### **DELETE /api/v1/albums/:albumId/images/:imageId**

Delete an image from an album<br>
Sample Response:<br>
`{message}`

---

### Images

### **GET /api/v1/images/all**

Get all images across all albums owned by the authenticated user<br>
Sample Response:<br>
`{images:[{_id, name, imageUrl, albumId, isFavourite}, ...]}`

### **GET /api/v1/images/favourite**

Get all favourite images across all albums owned by the authenticated user<br>
Sample Response:<br>
`{images:[{_id, name, imageUrl, albumId, isFavourite:true}, ...]}`

---


## Contact

For bugs or feature requests, please reach out to:

**Mehul Rathod**

Email: [mehulrathod9254@gmail.com](mailto:mehulrathod9254@gmail.com)
