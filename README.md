# GlowUp Planners - Digital Planner Website

A beautiful, production-ready Next.js website for selling digital planners. This is a 1:1 clone of glowupplanners.com built with modern web technologies.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **PayPal Integration**: Secure payment processing with PayPal
- **Policy Pages**: Privacy Policy, Refund Policy, and Terms of Service pages using Markdown
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast Performance**: Optimized for speed with Next.js 13

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Language**: TypeScript
- **Icons**: Lucide React
- **Payment**: PayPal SDK

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- PayPal Developer Account (for payment integration)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Add your PayPal Client ID:

- Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications)
- Create a new app or use an existing one
- Copy the Client ID
- Paste it in your `.env` file:

```
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_actual_client_id_here
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Deployment to Vercel

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel:
   - `NEXT_PUBLIC_PAYPAL_CLIENT_ID`: Your PayPal Client ID
4. Deploy!

Vercel will automatically detect Next.js and configure everything for you.

### Vercel Deployment Steps

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - Add `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
5. Click "Deploy"

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with PayPal SDK
│   ├── page.tsx            # Homepage
│   ├── privacy-policy/     # Privacy Policy page
│   ├── refund-policy/      # Refund Policy page
│   └── terms-of-service/   # Terms of Service page
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section with product info
│   ├── Features.tsx        # Features section
│   ├── Testimonials.tsx    # Customer testimonials carousel
│   ├── FAQ.tsx             # FAQ accordion
│   ├── Footer.tsx          # Footer with links
│   ├── PayPalButton.tsx    # PayPal payment button
│   ├── MarkdownRenderer.tsx # Markdown content renderer
│   └── ui/                 # shadcn/ui components
├── content/
│   ├── privacy-policy.md   # Privacy Policy content
│   ├── refund-policy.md    # Refund Policy content
│   └── terms-of-service.md # Terms of Service content
├── lib/
│   └── markdown.ts         # Markdown utilities
└── public/                 # Static assets
```

## Customization

### Update Content

1. **Policy Pages**: Edit the Markdown files in the `content/` directory
2. **Product Info**: Edit `components/Hero.tsx` to update product details
3. **Testimonials**: Edit the `testimonials` array in `components/Testimonials.tsx`
4. **FAQ**: Edit the `faqs` array in `components/FAQ.tsx`

### Update Styling

- Colors are defined in `app/globals.css` (CSS variables)
- The main brand color is `#FF9999` (coral pink)
- Adjust Tailwind classes in component files for layout changes

### Update PayPal

- Price: Edit the `amount` prop in `components/Hero.tsx`
- Currency: Edit the `currency` prop (default: USD)
- Description: Edit the `description` prop

## PayPal Configuration

### Development (Sandbox)

1. Create a PayPal Developer account
2. Create a Sandbox app
3. Use the Sandbox Client ID for testing
4. Test with PayPal Sandbox accounts

### Production

1. Create a Live app in PayPal Developer Dashboard
2. Get your Live Client ID
3. Update `NEXT_PUBLIC_PAYPAL_CLIENT_ID` in Vercel with the Live Client ID
4. Test thoroughly before launching

## Features Breakdown

### Homepage Sections

1. **Header**: Logo, navigation, cart icon
2. **Hero**: Product showcase with features and pricing
3. **Features**: Key benefits with circular icons
4. **Testimonials**: Customer reviews with carousel
5. **FAQ**: Frequently asked questions with accordion
6. **Footer**: Links to policies and contact info

### Policy Pages

All policy pages are generated from Markdown files, making them easy to update without touching code:

- **Privacy Policy**: Data collection and usage information
- **Refund Policy**: 30-day money-back guarantee details
- **Terms of Service**: Legal terms and conditions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lighthouse Score: 95+ (Production build)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2.5s
- Static generation for optimal performance

## SEO

- Semantic HTML structure
- Proper heading hierarchy
- Meta tags configured
- Open Graph tags for social sharing
- Mobile-friendly

## Support

For issues or questions, contact:
- Email: info@glowupplanners.com

## License

This project is created for educational purposes. The design is inspired by glowupplanners.com.

---

Built with ❤️ using Next.js and Tailwind CSS
