# 🌟 Muneeb Azhar - Portfolio

A stunning, cinematic portfolio website built with Next.js 16, featuring dark neon aesthetics, smooth animations, and a modern tech vibe.

## ✨ Features

- 🎨 **Dark Neon Theme** - Jet black background with neon blue, mint green, and purple accents
- 🎬 **Cinematic Animations** - Powered by Framer Motion for smooth, professional transitions
- 🎯 **Custom Glowing Cursor** - Interactive cursor with neon trail effect
- 📱 **Fully Responsive** - Optimized for all devices including iPhone 16 Pro Max (430×932)
- 🚀 **Performance Optimized** - Built with Next.js 16 and Turbopack
- 🎭 **Glassmorphism UI** - Modern glass effects with backdrop blur
- 🔍 **SEO Ready** - Complete metadata and Open Graph configuration

## 🛠️ Tech Stack

- **Framework:** Next.js 16.0.1 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Fonts:** Geist Sans & Geist Mono
- **SEO:** next-seo

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/muneebazhar/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## 🚀 Deploy on Vercel

The easiest way to deploy this portfolio is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy" and your site will be live!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/muneebazhar/portfolio)

## 📂 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with SEO metadata
│   │   ├── page.tsx         # Main page with all sections
│   │   └── globals.css      # Global styles and custom animations
│   └── components/
│       ├── Navbar.tsx       # Glassmorphic navigation bar
│       ├── Hero.tsx         # Hero section with animated text
│       ├── About.tsx        # About section with bio
│       ├── Skills.tsx       # Tech stack with icons
│       ├── Experience.tsx   # Timeline of experience
│       ├── Contact.tsx      # Contact form and social links
│       ├── Footer.tsx       # Footer with copyright
│       └── CustomCursor.tsx # Custom glowing cursor
├── public/                  # Static assets
└── package.json
```

## 🎨 Customization

### Colors
Edit the CSS variables in `src/app/globals.css`:
```css
:root {
  --background: #0F0F10;
  --neon-blue: #38BDF8;
  --neon-mint: #14F195;
  --neon-purple: #A78BFA;
  --neon-cyan: #22D3EE;
}
```

### Content
Update your personal information in the component files:
- **Hero.tsx** - Name, title, tagline
- **About.tsx** - Bio and background
- **Skills.tsx** - Technologies and tools
- **Experience.tsx** - Timeline and achievements
- **Contact.tsx** - Email and social links

### SEO
Update metadata in `src/app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: "Your Name — Your Title",
  description: "Your description",
  // ... other metadata
};
```

## 📧 Contact Form Integration

The contact form is ready for integration with:
- [Formspree](https://formspree.io/)
- [EmailJS](https://www.emailjs.com/)
- [Web3Forms](https://web3forms.com/)

Simply update the `handleSubmit` function in `src/components/Contact.tsx`.

## 📱 Responsive Design

The portfolio is fully responsive and tested on:
- Desktop (1920×1080 and above)
- Laptop (1366×768)
- Tablet (768×1024)
- Mobile (iPhone 16 Pro Max: 430×932)

## 🎯 Performance

- ✅ Static Site Generation (SSG)
- ✅ Optimized images with next/image
- ✅ Code splitting and lazy loading
- ✅ Minimal JavaScript bundle
- ✅ Fast page loads with Turbopack

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Muneeb Azhar**
- Email: mahassan@cuilahore.edu.pk
- GitHub: [@muneebazhar](https://github.com/muneebazhar)
- LinkedIn: [muneebazhar](https://linkedin.com/in/muneebazhar)

---

Built with ❤️ using Next.js | © 2025 Muneeb Azhar
