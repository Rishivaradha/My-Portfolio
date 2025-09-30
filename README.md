# V A Rishivaradha - Portfolio

An Apple-inspired single-page portfolio with maroon (#550000) and cream (#D1B399) theme, featuring smooth scroll-snap sections, fade-up animations, and accessible design.

## 🎨 Design Features

- **Full-screen hero section** with placeholder for Steve Jobs quote image (LCP)
- **Scroll-snap navigation** between sections for smooth Apple-like experience
- **Cream cards on maroon background** with rounded corners and elegant shadows
- **Intersection Observer animations** with staggered fade-up effects
- **Accessible contact form** with client-side validation
- **Responsive design** optimized for all screen sizes
- **Reduced motion support** for accessibility

## 📸 Image Placeholders - Replace These!

### 1. Hero Image (LCP - Most Important)
**Location:** Hero section  
**Current state:** Placeholder with dashed border  
**Recommended size:** 1920x1080px (landscape) or adjust to your aspect ratio  
**Format:** WebP with JPEG fallback for best performance  
**Instructions:**
1. Prepare your Steve Jobs quote image
2. Upload to `/src/assets/` folder in Lovable
3. Import in `Index.tsx`: `import heroImage from "@/assets/hero-image.jpg"`
4. Replace the placeholder div with: `<img src={heroImage} alt="Steve Jobs quote" className="w-full h-full object-cover rounded-3xl" />`

### 2. MessX Project Preview
**Location:** Projects section, first card  
**Current state:** Placeholder with 🖼️ emoji  
**Recommended size:** 1600x1000px (3:2 aspect ratio)  
**Instructions:**
1. Upload MessX screenshot to `/src/assets/`
2. Import: `import messxImage from "@/assets/messx-preview.jpg"`
3. Replace placeholder div with: `<img src={messxImage} alt="MessX real-time chat application preview" loading="lazy" />`

### 3. E-Store Project Preview
**Location:** Projects section, second card  
**Current state:** Placeholder with 🖼️ emoji  
**Recommended size:** 1600x1000px (3:2 aspect ratio)  
**Instructions:**
1. Upload E-Store screenshot to `/src/assets/`
2. Import: `import estoreImage from "@/assets/estore-preview.jpg"`
3. Replace placeholder div with: `<img src={estoreImage} alt="E-Store e-commerce platform preview" loading="lazy" />`

## 📧 Contact Information - Update These!

In `src/pages/Index.tsx`, find and replace the following placeholders:

### Email
```tsx
// Line ~277 - REPLACE:
href="mailto:your.email@example.com"
// WITH:
href="mailto:YOUR_ACTUAL_EMAIL@example.com"
```

### Phone
```tsx
// Line ~288 - REPLACE:
href="tel:+1234567890"
// WITH:
href="tel:+YOURCOUNTRYCODE_YOURPHONENUMBER"
```

### LinkedIn
```tsx
// Line ~299 - REPLACE:
href="https://linkedin.com/in/yourprofile"
// WITH:
href="https://linkedin.com/in/YOUR_LINKEDIN_USERNAME"
```

## 📮 Contact Form Setup

The contact form currently has client-side validation but needs a backend to actually send emails.

### Option 1: EmailJS (Recommended - Free tier available)
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Install EmailJS: `npm install @emailjs/browser`
4. Update the `handleSubmit` function in `Index.tsx`:

```tsx
import emailjs from '@emailjs/browser';

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (formData.honeypot) return;

  emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    },
    'YOUR_PUBLIC_KEY'
  )
  .then(() => {
    toast.success("Message sent successfully!");
    // Reset form...
  })
  .catch(() => {
    toast.error("Failed to send message. Please try again.");
  });
};
```

### Option 2: Netlify Forms
1. Deploy to Netlify
2. Add `netlify` attribute to form tag:
```tsx
<form onSubmit={handleSubmit} name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  {/* rest of form */}
</form>
```
3. Forms will appear in Netlify dashboard

### Option 3: Custom Backend
Connect to your own backend API endpoint by updating the `handleSubmit` function to POST to your server.

## 🎨 Customizing Colors

All colors are defined using CSS custom properties in `src/index.css`:

```css
:root {
  --bg: 0 100% 17%;        /* Maroon #550000 */
  --cream: 30 37% 71%;     /* Cream #D1B399 */
}
```

To change the theme:
1. Convert your hex colors to HSL format
2. Update the HSL values in `src/index.css`
3. All components will automatically use the new colors

## 🚀 Performance Optimization

- **Lazy load** non-LCP images with `loading="lazy"` attribute
- **WebP format** with JPEG fallback for better compression
- **Retina displays**: Provide @2x versions for high-DPI screens
- **Preload critical assets** in `index.html`:
```html
<link rel="preload" as="image" href="/src/assets/hero-image.jpg" />
```

## ♿ Accessibility Features

- ✅ Semantic HTML5 elements (`<section>`, `<article>`, `<nav>`)
- ✅ ARIA labels for screen readers
- ✅ Keyboard navigation support with visible focus states
- ✅ `prefers-reduced-motion` media query support
- ✅ Form labels and validation messages
- ✅ Color contrast meets WCAG AA standards

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

The design is fully responsive and adapts to all screen sizes.

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** with custom design system
- **Shadcn/ui** components
- **Vite** for fast development
- **Lucide React** for icons
- **Sonner** for toast notifications

## 📄 Project Structure

```
src/
├── pages/
│   └── Index.tsx          # Main portfolio page
├── components/
│   └── ui/                # Shadcn components
├── index.css              # Design system & animations
└── assets/                # Upload your images here!
```

## 🎯 Next Steps

1. **Replace all image placeholders** with your actual images
2. **Update contact information** (email, phone, LinkedIn)
3. **Connect contact form** to EmailJS or Netlify Forms
4. **Test on multiple devices** and browsers
5. **Deploy** to Netlify, Vercel, or your preferred platform

## 📞 GitHub Repositories

- MessX: [https://github.com/Rishivaradha/MessX.git](https://github.com/Rishivaradha/MessX.git)
- E-Store: [https://github.com/Rishivaradha/E-STORE.git](https://github.com/Rishivaradha/E-STORE.git)

---

Built with attention to detail and Apple-inspired design principles.
