# 🔒 Private Deployment Guide - ToyBox Egypt

## Options for Private/Password-Protected Deployment

### Option 1: Vercel with Password Protection (Easiest)

Vercel Pro plan offers password protection, but here's a FREE alternative:

#### Using Vercel Free + Basic Auth

1. **Create a middleware file:**

```bash
# Create the file
touch src/middleware.ts
```

Add this code to `src/middleware.ts`:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization');
  const url = request.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Change these credentials
    if (user === 'admin' && pwd === 'toybox2024') {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
```

2. **Deploy to Vercel** as normal

**Pros:** Simple, free
**Cons:** Basic security only

---

### Option 2: Netlify with Password Protection

Netlify offers password protection on paid plans, but here's a workaround:

#### Create a simple auth page

1. **Create `public/_headers` file:**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
```

2. **Use Netlify Identity (Free tier available)**
   - Enable Netlify Identity in your site settings
   - Invite specific users via email
   - They'll need to sign up to access

**Pros:** More secure, user management
**Cons:** Requires Netlify account

---

### Option 3: Deploy Locally on Your Network (Completely Private)

Perfect for testing or internal use only.

#### Using your local machine:

```bash
# Build the project
npm run build

# Serve it locally
npm run preview
```

Access at: `http://localhost:4173`

#### Make it accessible on your local network:

1. **Find your local IP:**
```bash
# On Mac/Linux
ifconfig | grep "inet "

# On Windows
ipconfig
```

2. **Update vite.config.ts:**
```typescript
export default defineConfig({
  preview: {
    host: '0.0.0.0',
    port: 4173
  }
})
```

3. **Run preview:**
```bash
npm run preview
```

4. **Access from other devices on your network:**
```
http://YOUR_LOCAL_IP:4173
```

**Pros:** Completely private, no internet exposure
**Cons:** Only accessible on your network, computer must be running

---

### Option 4: Password-Protected with Cloudflare Pages (Free)

1. **Deploy to Cloudflare Pages:**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Connect your GitHub repo
   - Deploy

2. **Add Cloudflare Access (Free for up to 50 users):**
   - Go to Cloudflare Zero Trust
   - Set up Access policy
   - Add email-based authentication
   - Protect your Pages domain

**Pros:** Free, secure, email-based auth
**Cons:** Requires Cloudflare account

---

### Option 5: Simple HTML Password Protection

Add a simple password page before accessing the site:

1. **Create `public/auth.html`:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>ToyBox Egypt - Private Access</title>
  <style>
    body {
      font-family: system-ui;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      margin: 0;
    }
    .login-box {
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      text-align: center;
      max-width: 400px;
    }
    h1 { color: #333; margin-bottom: 10px; }
    p { color: #666; margin-bottom: 30px; }
    input {
      width: 100%;
      padding: 15px;
      border: 2px solid #ddd;
      border-radius: 10px;
      font-size: 16px;
      margin-bottom: 20px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }
    button:hover { opacity: 0.9; }
    .error { color: red; margin-top: 10px; display: none; }
  </style>
</head>
<body>
  <div class="login-box">
    <h1>🧸 ToyBox Egypt</h1>
    <p>Private Access - Enter Password</p>
    <input type="password" id="password" placeholder="Enter password" />
    <button onclick="checkPassword()">Access Site</button>
    <p class="error" id="error">Incorrect password</p>
  </div>

  <script>
    function checkPassword() {
      const password = document.getElementById('password').value;
      // Change this password
      if (password === 'toybox2024') {
        sessionStorage.setItem('authenticated', 'true');
        window.location.href = '/';
      } else {
        document.getElementById('error').style.display = 'block';
      }
    }
    
    document.getElementById('password').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') checkPassword();
    });
  </script>
</body>
</html>
```

2. **Update `src/App.tsx` to check authentication:**
```typescript
import { useEffect, useState } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      window.location.href = '/auth.html';
    }
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    // Your existing App component
  );
};
```

**Pros:** Simple, works anywhere
**Cons:** Basic security (client-side only)

---

### Option 6: Docker Container (Most Secure for Private Use)

Run in a Docker container with authentication:

1. **Create `Dockerfile`:**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Create `nginx.conf` with basic auth:**
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    
    server {
        listen 80;
        root /usr/share/nginx/html;
        index index.html;
        
        auth_basic "Restricted Access";
        auth_basic_user_file /etc/nginx/.htpasswd;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

3. **Create password file:**
```bash
# Install htpasswd
sudo apt-get install apache2-utils

# Create password (username: admin, password: toybox2024)
htpasswd -c .htpasswd admin
```

4. **Build and run:**
```bash
docker build -t toybox-egypt .
docker run -p 8080:80 toybox-egypt
```

**Pros:** Most secure, portable
**Cons:** Requires Docker knowledge

---

## Recommended for Private Use

### For Quick Testing:
✅ **Option 3** - Local network deployment

### For Sharing with Specific People:
✅ **Option 4** - Cloudflare Pages with Access (free, secure)

### For Simple Password Protection:
✅ **Option 5** - HTML password page (easiest)

### For Maximum Security:
✅ **Option 6** - Docker with Nginx auth

---

## Quick Setup - Simple Password Protection

1. **Copy the `auth.html` code above to `public/auth.html`**

2. **Change the password in auth.html:**
```javascript
if (password === 'YOUR_PASSWORD_HERE') {
```

3. **Deploy normally to Vercel/Netlify**

4. **Share the URL and password with authorized users**

---

## Security Notes

⚠️ **Important:**
- Client-side password protection (Option 5) is NOT secure for sensitive data
- For real security, use server-side authentication (Options 1, 4, or 6)
- Always use HTTPS in production
- Change default passwords immediately
- Don't commit passwords to Git

---

## Need Help?

Choose the option that best fits your needs:
- **Just for you**: Option 3 (local)
- **Share with friends/family**: Option 5 (simple password)
- **Share with team**: Option 4 (Cloudflare Access)
- **Maximum security**: Option 6 (Docker)
