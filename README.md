# Aeri Labs - Studio Website

A high-end, minimalist, single-page studio website built with Next.js, React, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Premium Design**: Minimalist, tech-focused aesthetic with custom color palette
- 🚀 **Smooth Animations**: Framer Motion scroll-based reveal animations
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ⚡ **Performance**: Built with Next.js 14 App Router for optimal performance
- 🎯 **Modern Stack**: React, TypeScript, Tailwind CSS, and Framer Motion

## Color Palette

- **Primary Background**: `#07070B` (Void Black)
- **Alternative Background**: `#0E1A2B` (Deep Space Blue)
- **Primary Accent**: `#27E0E6` (Neon Cyan)
- **Secondary Accent**: `#8B5CF6` (Electric Purple)
- **Text**: `#EDEDED` (Soft White)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles
├── components/
│   ├── Header.tsx      # Sticky navigation header
│   ├── Hero.tsx        # Hero section
│   ├── Services.tsx    # Services section
│   ├── Projects.tsx    # Projects showcase
│   ├── Collaboration.tsx # Collaboration CTA
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer with social links
└── tailwind.config.ts  # Tailwind configuration
```

## Customization

### Update Colors

Edit `tailwind.config.ts` to modify the color palette.

### Update Content

Edit the respective component files in `components/` to update content.

### Add Projects

Edit the `projects` array in `components/Projects.tsx`.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## License

All rights reserved © Aeri Labs






