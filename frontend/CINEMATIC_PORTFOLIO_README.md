# Cinematic Dark Portfolio - Darshan K S

A modern, minimal, cinematic portfolio website with dark aesthetics and deep red accents.

## 🎨 Design Philosophy

- **Near-black background** (#0b0b0b) for premium cinematic feel
- **Deep red/crimson accents** (#dc2626) for emphasis and CTAs
- **High contrast typography** for maximum readability
- **Large negative space** for clean, minimal aesthetic
- **Left-right split layout** for hero section
- **Professional, recruiter-ready** design

## 🚀 Tech Stack

- **React** - UI framework
- **Framer Motion** - Subtle, controlled animations
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Vite** - Build tool (configured for CRA)

## 📐 Layout Structure

### Hero Section
- **Left Side**: Circular red glow backdrop with professional portrait placeholder
- **Right Side**: 
  - Name and professional title
  - Concise bio (2-3 lines)
  - Social media icons (GitHub, LinkedIn, Twitter)
  - Primary CTA button

### Navbar
- Minimal text-based logo
- Right-aligned navigation links
- Active link underline animation
- Transparent → solid background on scroll

### Sections
1. **Hero** - Left-right split with circular visual
2. **Skills** - Grid layout with category cards
3. **Projects** - Three-column grid with tech stacks
4. **Contact** - Clean form with focus states
5. **Footer** - Social links and copyright

## 🎯 Animation System

All animations use Framer Motion with strict guidelines:

### Motion Variants (`utils/motionVariants.js`)
```javascript
fadeInUp      // Fade + upward motion (y: 20 → 0)
staggerContainer  // Stagger children animations
fadeIn        // Simple fade in
scaleOnHover  // Slight scale on hover
glowOnHover   // Red glow + scale on hover
```

### Animation Rules
- **Duration**: 0.5s - 0.7s (no longer)
- **Easing**: easeOut / easeInOut
- **NO looping animations**
- **NO parallax effects**
- **Subtle hover effects only**

## 🎨 Color System

```css
/* Background */
--bg-primary: #0b0b0b;      /* Near-black */
--bg-card: #1a1a1a;         /* Zinc-900 */

/* Accent */
--red-primary: #dc2626;     /* Red-600 */
--red-dark: #991b1b;        /* Red-800 */
--red-hover: #ef4444;       /* Red-500 */

/* Text */
--text-primary: #ffffff;    /* White */
--text-secondary: #9ca3af;  /* Gray-400 */
--text-muted: #6b7280;      /* Gray-500 */

/* Borders */
--border-subtle: rgba(220, 38, 38, 0.2);  /* Red/20 */
```

## 📦 Component Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Minimal navbar with active states
│   ├── Button.jsx          # Reusable button component
│   └── Footer.jsx          # Footer with social links
├── sections/
│   ├── Hero.jsx            # Split hero layout
│   ├── Skills.jsx          # Skills grid
│   ├── Projects.jsx        # Projects showcase
│   └── Contact.jsx         # Contact form
├── utils/
│   └── motionVariants.js   # Reusable animation variants
├── App.js
└── App.css
```

## 🔧 Key Features

### Button Component
Three variants:
- `primary` - Solid red background
- `outline` - Red border, transparent background
- `ghost` - Minimal hover effect

### Responsive Grid
- **Desktop**: Multi-column layouts
- **Tablet**: Adjusted grids
- **Mobile**: Single column, stacked layout

### Typography Scale
- **Hero**: 7xl (60-72px)
- **Headings**: 5xl (48px)
- **Subheadings**: 2-3xl (24-30px)
- **Body**: lg (18px)

## 📱 Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

## ⚡ Performance

- Controlled animations (0.5-0.7s)
- No infinite loops
- Viewport-based triggers (`whileInView`)
- Once-only animations (`viewport: { once: true }`)

## 🎨 Design Comparisons

| Aspect | Neon Cyber (Previous) | Cinematic Dark (Current) |
|--------|----------------------|--------------------------|
| Background | Dark blue gradient | Pure black (#0b0b0b) |
| Accent | Cyan/Blue | Deep Red/Crimson |
| Layout | Centered | Left-right split |
| Animation | Glowing, dynamic | Subtle, minimal |
| Typography | Gradient text | High contrast white |
| Aesthetic | Techy, vibrant | Professional, minimal |

## 🚀 Getting Started

```bash
# Install dependencies
yarn install

# Start dev server
yarn start

# Build for production
yarn build
```

## 📝 Customization Guide

1. **Personal Info**: Update Hero.jsx with your details
2. **Skills**: Modify skillCategories array in Skills.jsx
3. **Projects**: Update projects array in Projects.jsx
4. **Colors**: Adjust red accent in tailwind.config.js
5. **Social Links**: Update Footer.jsx and Hero.jsx

## 🎯 Design Principles

1. **Minimalism** - Less is more, focus on content
2. **High Contrast** - White on black for readability
3. **Subtle Motion** - Animations enhance, don't distract
4. **Professional** - Clean, modern, recruiter-ready
5. **Focused** - Single strong visual element per section

## 📄 License

Personal portfolio - Feel free to use as inspiration!

---

**Built by Darshan K S**  
Senior Frontend Engineer with Motion Design Expertise
