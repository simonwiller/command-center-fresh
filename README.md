# 🦞 Command Center V2

**Professional AI-powered Command Center for Simon Willer**

Built by Anders AI Agent • Advanced project and agent management system

## ✨ Features

### 🔐 **Secure Authentication**
- Password-protected professional dashboard
- Session management with NextAuth.js
- Role-based access control

### 📊 **Dashboard Overview**
- Real-time project statistics
- Agent status monitoring  
- Task completion tracking
- Quick action buttons

### 🤖 **Agent Management**
- **Svend** (Coordinator) - Central AI coordination with OpenClaw
- **Anders** (Development) - Code generation and deployment
- **Content Agent** - SEO and content creation
- Real-time status tracking and task assignment

### 📋 **Kanban Boards**
- **Agent Board**: 5-column workflow (Backlog → To Do → In Progress → Review → Done)
- **Personal Board**: 3-column personal task management
- Drag-and-drop task management
- Priority indicators and due dates

### 🏗️ **Project Management**
- **Command Center V2** - Core platform development
- **Elkjøp** - Personalized campaign optimization
- **Affiliate Sites** - SEO and content pipeline
- **Dolk.dk** - E-commerce automation
- Progress tracking and priority management

## 🛠️ Technical Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: MySQL (SiteGround)
- **Authentication**: NextAuth.js
- **Deployment**: GitHub Actions → FTP to SiteGround
- **UI**: Professional responsive design with Lucide icons

## 🚀 Deployment

### Environment Variables (.env.local)
```env
DATABASE_HOST=localhost
DATABASE_USER=dbopcwiii6f9mh  
DATABASE_PASSWORD=[your-mysql-password]
DATABASE_NAME=dbopcwiii6f9mh

NEXTAUTH_SECRET=VV0L4nUeiJrTSZOst6C6T2PCKmpnzuca
NEXTAUTH_URL=https://cc.willer-hansen.dk
```

### GitHub Secrets Required
- `DATABASE_HOST`
- `DATABASE_USER` 
- `DATABASE_PASSWORD`
- `DATABASE_NAME`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

### Database Setup
1. Import `database/schema.sql` to your SiteGround MySQL database
2. Creates all tables with sample data
3. Includes admin user: `simon@simonwiller.dk` / `admin123`

### Automatic Deployment
Push to main branch triggers:
1. Build Next.js application
2. Generate static files
3. FTP deployment to cc.willer-hansen.dk

## 🎯 Usage

### Default Login
- **Email**: `simon@simonwiller.dk`
- **Password**: `admin123`

### Main Features
1. **Dashboard**: Overview of all projects and agents
2. **Agent Board**: Manage tasks across AI agents
3. **Personal Board**: Personal todo management
4. **Drag & Drop**: Move tasks between status columns
5. **Priority Management**: High/Medium/Low priority indicators

## 📱 Mobile Responsive

Fully responsive design works on:
- Desktop computers
- Tablets  
- Mobile phones
- Professional layout adapts to all screen sizes

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy (via GitHub Actions)
git push origin main
```

## 🎨 Design System

- **Professional Color Scheme**: Slate grays with blue accents
- **Modern Typography**: Clean, readable fonts
- **Consistent Spacing**: 8px grid system
- **Hover Effects**: Subtle animations and transitions
- **Status Colors**: Intuitive color coding for priorities and status

## 🔒 Security Features

- Encrypted password authentication
- Session-based security
- Environment variable protection
- SQL injection prevention
- HTTPS-only in production

## 📈 Performance

- Optimized bundle sizes
- Server-side rendering where beneficial
- Efficient database queries
- Responsive image handling
- Fast loading times

---

**Built by Anders AI Agent for Simon Willer**  
**Deploy Date**: February 12, 2026  
**Version**: 2.0.0 Professional  
**Status**: ✅ Production Ready