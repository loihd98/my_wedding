# 📚 Documentation Index

Complete guide to the Loi & Hang Wedding Website project.

---

## 🚀 Getting Started

### For First-Time Setup
1. **[QUICK_START.md](QUICK_START.md)** - Get up and running in 3 steps
2. **[start.sh](start.sh)** - Automated setup script (run this first!)

### For Understanding the Project
3. **[README.md](README.md)** - Complete project documentation
4. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Feature list and overview
5. **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture and data flow

---

## 🎨 Customization

### Making It Your Own
6. **[CUSTOMIZATION.md](CUSTOMIZATION.md)** - Step-by-step customization guide
   - Update couple names
   - Change wedding date
   - Modify event details
   - Customize colors and fonts
   - Add your photos

### Image Guidelines
7. **[public/images/README.md](public/images/README.md)** - Image requirements
   - Required sizes
   - Optimization tips
   - Format recommendations

---

## 🐳 Deployment

### Server Setup
8. **[setup-server.sh](setup-server.sh)** - Initialize Ubuntu server
   - Install Docker
   - Install Nginx
   - Configure firewall
   - Install Certbot

### Deployment Process
9. **[deploy.sh](deploy.sh)** - Automated deployment script
10. **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment checklist
    - Pre-deployment checks
    - Step-by-step guide
    - Post-deployment verification
    - Troubleshooting

---

## 🔧 Configuration Files

### Application Config
- **[package.json](package.json)** - Dependencies and scripts
- **[tsconfig.json](tsconfig.json)** - TypeScript configuration
- **[next.config.js](next.config.js)** - Next.js settings
- **[tailwind.config.ts](tailwind.config.ts)** - TailwindCSS theme
- **[.env.example](.env.example)** - Environment variables template

### Docker & Server
- **[Dockerfile](Dockerfile)** - Multi-stage Docker build
- **[docker-compose.yml](docker-compose.yml)** - Docker Compose setup
- **[nginx.conf](nginx.conf)** - Nginx reverse proxy config

### Code Quality
- **[.eslintrc.json](.eslintrc.json)** - ESLint rules
- **[.gitignore](.gitignore)** - Git ignore patterns

---

## 📁 Project Structure

### Application Code
```
app/
├── layout.tsx              - Root layout with metadata
├── page.tsx                - Main landing page
├── globals.css             - Global styles
├── sitemap.ts              - SEO sitemap
├── robots.ts               - Robots.txt config
└── fonts/                  - Font files

components/
├── Hero.tsx                - Hero section with countdown
├── Timeline.tsx            - Love story timeline
├── EventDetails.tsx        - Wedding event details
├── Gallery.tsx             - Photo gallery with lightbox
├── RSVP.tsx                - RSVP form with validation
└── Footer.tsx              - Footer with social links

lib/
├── animations.ts           - Animation utilities
└── utils.ts                - Helper functions

public/
└── images/                 - Image assets
    └── gallery/            - Gallery photos

middleware.ts               - Security middleware
```

---

## 📖 Quick Reference

### Common Tasks

| Task | Documentation | File to Edit |
|------|---------------|--------------|
| **Change couple names** | [CUSTOMIZATION.md](CUSTOMIZATION.md) | `components/Hero.tsx` |
| **Update wedding date** | [CUSTOMIZATION.md](CUSTOMIZATION.md) | `components/Hero.tsx` |
| **Add photos** | [public/images/README.md](public/images/README.md) | `public/images/` |
| **Change colors** | [CUSTOMIZATION.md](CUSTOMIZATION.md) | `tailwind.config.ts` |
| **Update events** | [CUSTOMIZATION.md](CUSTOMIZATION.md) | `components/EventDetails.tsx` |
| **Modify timeline** | [CUSTOMIZATION.md](CUSTOMIZATION.md) | `components/Timeline.tsx` |
| **Deploy to server** | [DEPLOYMENT.md](DEPLOYMENT.md) | Run `deploy.sh` |
| **Setup server** | [DEPLOYMENT.md](DEPLOYMENT.md) | Run `setup-server.sh` |

---

## 🎯 By Role

### For Developers
**Getting Started:**
1. [QUICK_START.md](QUICK_START.md) - Setup development environment
2. [ARCHITECTURE.md](ARCHITECTURE.md) - Understand the codebase
3. [README.md](README.md) - Complete technical docs

**Development:**
- Package.json - Run scripts
- TypeScript files - Component code
- TailwindCSS - Styling system

**Deployment:**
1. [Dockerfile](Dockerfile) - Container config
2. [docker-compose.yml](docker-compose.yml) - Service orchestration
3. [deploy.sh](deploy.sh) - Deployment automation

### For Designers
**Customization:**
1. [CUSTOMIZATION.md](CUSTOMIZATION.md) - Change colors, fonts, text
2. [public/images/README.md](public/images/README.md) - Image specs
3. [tailwind.config.ts](tailwind.config.ts) - Theme configuration

**Components:**
- `components/Hero.tsx` - Hero section design
- `components/Timeline.tsx` - Timeline layout
- `components/Gallery.tsx` - Gallery grid

### For Content Creators
**Content Updates:**
1. [CUSTOMIZATION.md](CUSTOMIZATION.md) - Text content guide
2. `components/Hero.tsx` - Main heading and date
3. `components/Timeline.tsx` - Love story content
4. `components/EventDetails.tsx` - Event information
5. `public/images/` - Upload wedding photos

### For DevOps
**Server Setup:**
1. [setup-server.sh](setup-server.sh) - Initial server config
2. [deploy.sh](deploy.sh) - Deployment automation
3. [DEPLOYMENT.md](DEPLOYMENT.md) - Step-by-step guide

**Configuration:**
- [nginx.conf](nginx.conf) - Web server config
- [Dockerfile](Dockerfile) - Container build
- [docker-compose.yml](docker-compose.yml) - Service definitions

---

## 🔍 Find Information By Topic

### Performance
- [README.md](README.md) - Performance optimization section
- [ARCHITECTURE.md](ARCHITECTURE.md) - Code splitting and loading
- [next.config.js](next.config.js) - Image optimization
- [nginx.conf](nginx.conf) - Caching strategy

### Security
- [README.md](README.md) - Security best practices
- [middleware.ts](middleware.ts) - Security headers
- [nginx.conf](nginx.conf) - SSL/TLS configuration
- [DEPLOYMENT.md](DEPLOYMENT.md) - Security checklist

### SEO
- [app/layout.tsx](app/layout.tsx) - Metadata configuration
- [app/page.tsx](app/page.tsx) - JSON-LD schema
- [app/sitemap.ts](app/sitemap.ts) - Sitemap generation
- [app/robots.ts](app/robots.ts) - Robots.txt config
- [README.md](README.md) - SEO section

### Animations
- [lib/animations.ts](lib/animations.ts) - Animation utilities
- [ARCHITECTURE.md](ARCHITECTURE.md) - Animation flow
- Component files - Implementation examples

### Forms & Validation
- [components/RSVP.tsx](components/RSVP.tsx) - Form implementation
- [lib/utils.ts](lib/utils.ts) - Validation helpers
- [ARCHITECTURE.md](ARCHITECTURE.md) - Data flow

---

## 🛠️ Troubleshooting

### Build Issues
- [README.md](README.md) - Troubleshooting section
- [QUICK_START.md](QUICK_START.md) - Quick fixes
- Check [package.json](package.json) for dependencies

### Deployment Issues
- [DEPLOYMENT.md](DEPLOYMENT.md) - Troubleshooting guide
- [README.md](README.md) - Server commands
- Check [deploy.sh](deploy.sh) for script errors

### Style Issues
- [tailwind.config.ts](tailwind.config.ts) - Theme config
- [app/globals.css](app/globals.css) - Global styles
- Clear browser cache

---

## 📊 Documentation Stats

| Document | Lines | Purpose | Audience |
|----------|-------|---------|----------|
| README.md | 600+ | Complete guide | Everyone |
| CUSTOMIZATION.md | 500+ | How to customize | Content creators |
| DEPLOYMENT.md | 300+ | Deploy guide | DevOps |
| ARCHITECTURE.md | 400+ | Technical details | Developers |
| PROJECT_SUMMARY.md | 500+ | Feature overview | Everyone |
| QUICK_START.md | 100+ | Quick setup | New users |

**Total Documentation:** 2,400+ lines
**Code Files:** 30+
**Components:** 6 main sections
**Scripts:** 3 automation scripts

---

## 🎓 Learning Path

### Beginner
1. **[QUICK_START.md](QUICK_START.md)** - Get started
2. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Understand features
3. **[CUSTOMIZATION.md](CUSTOMIZATION.md)** - Make it yours

### Intermediate
4. **[README.md](README.md)** - Deep dive into project
5. **[ARCHITECTURE.md](ARCHITECTURE.md)** - Understand structure
6. **Component files** - Study implementation

### Advanced
7. **[middleware.ts](middleware.ts)** - Security implementation
8. **[lib/animations.ts](lib/animations.ts)** - Animation system
9. **[Dockerfile](Dockerfile)** - Container optimization
10. **[nginx.conf](nginx.conf)** - Server configuration

---

## 🔗 External Resources

### Technologies Used
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Framer Motion API](https://www.framer.com/motion/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)

### Tools & Testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance audit
- [PageSpeed Insights](https://pagespeed.web.dev/) - Speed testing
- [SSL Labs](https://www.ssllabs.com/ssltest/) - SSL testing
- [SecurityHeaders.com](https://securityheaders.com/) - Security audit

---

## 📞 Support

### Getting Help
1. Check relevant documentation file
2. Review [README.md](README.md) troubleshooting
3. Check component comments in code
4. Review error logs

### Common Questions
- **Q: How do I change the wedding date?**
  A: See [CUSTOMIZATION.md](CUSTOMIZATION.md) - Section 1

- **Q: How do I add photos?**
  A: See [public/images/README.md](public/images/README.md)

- **Q: How do I deploy?**
  A: See [DEPLOYMENT.md](DEPLOYMENT.md)

- **Q: How do I customize colors?**
  A: See [CUSTOMIZATION.md](CUSTOMIZATION.md) - Section 5

---

## ✅ Project Checklist

### Pre-Development
- [ ] Read [QUICK_START.md](QUICK_START.md)
- [ ] Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- [ ] Run [start.sh](start.sh)

### Development
- [ ] Customize content ([CUSTOMIZATION.md](CUSTOMIZATION.md))
- [ ] Add photos ([public/images/README.md](public/images/README.md))
- [ ] Test locally
- [ ] Review [ARCHITECTURE.md](ARCHITECTURE.md)

### Deployment
- [ ] Follow [DEPLOYMENT.md](DEPLOYMENT.md)
- [ ] Run [setup-server.sh](setup-server.sh) on server
- [ ] Run [deploy.sh](deploy.sh)
- [ ] Verify deployment

### Post-Launch
- [ ] Test all features
- [ ] Run Lighthouse audit
- [ ] Setup monitoring
- [ ] Document custom changes

---

## 🎉 Quick Links

**Start Here:**
- 🚀 [QUICK_START.md](QUICK_START.md)

**Most Used:**
- 📖 [README.md](README.md)
- 🎨 [CUSTOMIZATION.md](CUSTOMIZATION.md)
- 🐳 [DEPLOYMENT.md](DEPLOYMENT.md)

**Reference:**
- 📋 [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- 🏗️ [ARCHITECTURE.md](ARCHITECTURE.md)

**Scripts:**
- ⚡ [start.sh](start.sh)
- 🔧 [setup-server.sh](setup-server.sh)
- 🚀 [deploy.sh](deploy.sh)

---

**Last Updated:** November 2025
**Version:** 1.0.0
**Status:** Production Ready ✅

---

Made with ❤️ for Loi & Hang's special day 💒
