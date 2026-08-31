export interface BrandProcessStep {
  step: string;
  title: string;
  desc: string;
  image: string; // path to image
}

export interface BrandDetail {
  logo: string;
  logoImage?: string;
  tagline: string;
  altTaglines: string[];
  personality: string;
  traits: string[];
  mission: string;
  vision: string;
  promise: string;
  voiceTone: string[];
  colors: { name: string; hex: string; meaning: string }[];
  neutrals: { name: string; hex: string }[];
  fonts: { name: string; usage: string }[];
  processSteps: BrandProcessStep[];
  desc: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  services: string[];
  industry: string;
  duration: string;
  year: string;
  overview: string;
  challenge: string;
  solution: string;
  brandColors: string[];
  results: { value: string; label: string }[];
  process: { step: string; title: string; desc: string }[];
  testimonial?: { text: string; name: string; role: string };
  brandIdentity?: BrandDetail;
  features: string[];
  nextProject?: string;
}

export const allCaseStudies: CaseStudy[] = [
  {
    slug: 'ms-stationery',
    name: 'MS Stationery',
    tagline: 'Premium Branding + Shopify E-commerce Store',
    category: 'Branding + E-commerce',
    services: ['Brand Identity', 'Logo Design', 'Shopify Development', 'UI/UX Design'],
    industry: 'Stationery & Office Supplies',
    duration: '4 Weeks',
    year: '2024',
    overview: 'MS Stationery needed a complete digital transformation from a generic local stationery shop into a premium online brand that could compete with established players. We delivered a complete brand identity system and a high-converting Shopify store that positioned the business as a premium stationery destination in Pakistan.',
    challenge: 'MS Stationery had zero online presence, no brand identity, and was competing solely on price in a crowded market. They needed to stand out visually, build trust online, and create a seamless shopping experience for bulk orders, individual purchases, and corporate clients.',
    solution: 'We started from the ground up by crafting a complete brand identity that communicates quality, reliability, and professionalism. We then built a custom Shopify store with smart product organization, bulk pricing tiers, quick-order functionality, and mobile-first design optimized for Pakistani internet conditions.',
    brandColors: ['#1a3a5c', '#f5c542', '#ffffff', '#0a0a0a'],
    results: [
      { value: '+180%', label: 'Online Revenue' },
      { value: '2.1s', label: 'Load Time' },
      { value: '+95%', label: 'Mobile Score' },
      { value: '+300%', label: 'Organic Traffic' },
    ],
    process: [
      { step: '01', title: 'Brand Discovery', desc: 'Deep dive into MS Stationery\'s values, audience, and competitors. Identified positioning as "Premium Quality, Trusted Service" in the stationery market.' },
      { step: '02', title: 'Brand Identity Design', desc: 'Created 3 logo concepts, refined the chosen direction, built complete brand guidelines with colors, typography, patterns, and social media templates.' },
      { step: '03', title: 'UI/UX & Wireframing', desc: 'Designed the complete store layout in Figma, including the homepage, collection pages, product pages, cart, and checkout. The structure focused on easy navigation and bulk ordering.' },
      { step: '04', title: 'Shopify Development', desc: 'Built a custom Shopify theme with clean Liquid code. Integrated product filtering, bulk pricing, WhatsApp ordering, and mobile-optimized checkout.' },
      { step: '05', title: 'Content & SEO', desc: 'Wrote product descriptions, set up collection hierarchy, implemented schema markup, and optimized all images for speed.' },
      { step: '06', title: 'Launch & Growth', desc: 'Launched with a social media campaign, set up Google Analytics, and provided 30-day post-launch optimization and support.' },
    ],
    testimonial: {
      text: 'AEMTECH completely transformed our business. The logo, brand system, and online store gave our local shop a much more premium digital presence.',
      name: 'Muhammad S.',
      role: 'Owner, MS Stationery',
    },
    brandIdentity: {
      logo: 'MS',
      logoImage: '/images/case-studies/ms-logo.webp',
      tagline: 'Creativity Begins Here',
      altTaglines: ['Inspire Every Page', 'Write. Create. Imagine.', 'Designed for Creative Minds.', 'Where Ideas Take Shape.'],
      personality: 'MS Stationery is a vibrant, modern, and creative stationery brand that combines premium quality with playful imagination. The identity feels welcoming, artistic, and energetic while maintaining trust and professionalism.',
      traits: ['Creative', 'Friendly', 'Premium', 'Modern', 'Playful', 'Inspiring', 'Reliable', 'Expressive'],
      mission: 'To inspire creativity through beautifully designed stationery products that encourage learning, productivity, and artistic expression.',
      vision: 'To become one of the most recognizable premium stationery brands by delivering innovative, high-quality products that inspire millions of creative people worldwide.',
      promise: 'MS Stationery empowers students, professionals, artists, and creators with premium stationery products that transform everyday writing, drawing, and planning into a joyful creative experience.',
      voiceTone: ['Warm', 'Creative', 'Positive', 'Friendly', 'Confident', 'Professional', 'Encouraging'],
      colors: [
        { name: 'Deep Teal', hex: '#0F4C5C', meaning: 'Trust, Creativity, Reliability' },
        { name: 'Orange', hex: '#F59E0B', meaning: 'Energy, Excitement, Warmth' },
        { name: 'Coral', hex: '#E63946', meaning: 'Passion, Action, Attention' },
        { name: 'Pink', hex: '#FF4D8D', meaning: 'Playfulness, Youth, Creativity' },
        { name: 'Sky Blue', hex: '#2CA6B6', meaning: 'Innovation, Fresh Ideas' },
        { name: 'Golden Yellow', hex: '#FFD166', meaning: 'Happiness, Success' },
      ],
      neutrals: [
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Light Gray', hex: '#F6F6F6' },
        { name: 'Medium Gray', hex: '#B5B5B5' },
        { name: 'Dark Charcoal', hex: '#2B2B2B' },
      ],
      fonts: [
        { name: 'Decorative Serif', usage: 'Logo, Headlines, Brand Assets, Packaging' },
        { name: 'Poppins', usage: 'Headings (weights 300 to 700)' },
        { name: 'Inter', usage: 'Body Text, Website, Documentation' },
      ],
      processSteps: [
        { step: '01', title: 'Concept Sketch', desc: 'We started with hand-drawn sketches exploring circular badges, monograms, illustrative elements, and creative stationery motifs. More than 20 concepts were reviewed before narrowing the work to three strong directions.', image: '/images/case-studies/ms-step1.webp' },
        { step: '02', title: 'Typography Exploration', desc: 'We explored decorative serifs for the monogram, elegant scripts for the wordmark, and clean sans-serif styles for supporting text. Readability was tested across digital and print applications at different sizes.', image: '/images/case-studies/ms-step2.webp' },
        { step: '03', title: 'Color Palette & Brand Refinement', desc: 'We developed a complete color system with Deep Teal for trust, Orange for energy, and Coral, Pink, Sky Blue, and Golden Yellow as accents. Each color was tested across packaging, digital, and print applications.', image: '/images/case-studies/ms-step3.webp' },
        { step: '04', title: 'Final Hero 3D Logo', desc: 'The final logo uses an illustrative badge with pencils, brushes, and paper arranged around the MS monogram. A 3D treatment with gold foil accents was created for the final presentation.', image: '/images/case-studies/ms-step4.webp' },
      ],
      desc: 'The MS Stationery brand identity combines Deep Teal for trust and professionalism with vibrant Orange for creative energy. The illustrative badge logo communicates that creativity begins with simple tools, while the circular composition creates unity and trust.',
    },
    features: [
      'Custom Shopify theme from scratch',
      'Smart product categorization system',
      'Bulk pricing & corporate ordering',
      'WhatsApp quick-order integration',
      'Mobile-optimized checkout flow',
      'Product search with filters',
      'SEO-optimized product pages',
      'Social media template kit',
      'Business card & letterhead design',
      'Brand guidelines document',
    ],
    nextProject: 'zabs-international',
  },
  {
    slug: 'glamouria',
    name: 'Glamouria',
    tagline: 'Premium Fashion Shopify Store',
    category: 'Shopify Development',
    services: ['Shopify Development', 'UI/UX Design', 'Speed Optimization'],
    industry: 'Fashion & Apparel',
    duration: '3 Weeks',
    year: '2024',
    overview: 'Glamouria is a premium fashion brand that needed a Shopify store reflecting their luxury positioning. We built a visually stunning, fast-loading store with lookbook sections, size guides, and optimized checkout that boosted their sales by 120%.',
    challenge: 'Their existing store used a generic theme that felt slow, cluttered, and difficult on mobile. The presentation did not match the premium product positioning, and the checkout journey created unnecessary friction.',
    solution: 'Complete Shopify rebuild with custom Liquid theme, premium product photography layouts, lookbook sections, AI-powered size recommendations, and a streamlined checkout that reduced steps from 5 to 2.',
    brandColors: ['#0a0a0a', '#f5c542', '#ffffff', '#8b6914'],
    results: [
      { value: '+120%', label: 'Sales Growth' },
      { value: '1.8s', label: 'Load Time' },
      { value: '-45%', label: 'Cart Abandonment' },
      { value: '+85%', label: 'Mobile Conversion' },
    ],
    process: [
      { step: '01', title: 'Store Audit', desc: 'Analyzed existing store performance, identified bottlenecks in speed, UX, and conversion flow.' },
      { step: '02', title: 'Custom Design', desc: 'Designed a luxury UI in Figma with editorial-style product layouts and immersive lookbook sections.' },
      { step: '03', title: 'Shopify Build', desc: 'Built a clean custom Liquid theme with an admin-editable section system and a performance-focused architecture.' },
      { step: '04', title: 'Optimization', desc: 'Speed optimization, SEO setup, analytics integration, and A/B testing on checkout.' },
    ],
    testimonial: {
      text: 'Our Shopify store looks amazing and sales improved quickly after launch. AEMTECH understood our brand perfectly.',
      name: 'Fatima M.',
      role: 'Owner, Glamouria',
    },
    features: [
      'Custom Liquid theme',
      'Lookbook & editorial sections',
      'Quick-view product modals',
      'Size guide integration',
      'Optimized mobile checkout',
      'Speed: 95+ PageSpeed score',
    ],
    nextProject: 'zabs-international',
  },
  {
    slug: 'zabs-international',
    name: 'ZABS International',
    tagline: 'Complete Website Redesign for USA-Based Textile Recycling Company',
    category: 'Website Redesign',
    services: ['Website Audit & Analysis', 'Competitor Research', 'UI/UX Design', 'Frontend Development', 'SEO Optimization', 'Mobile Optimization', 'Contact Form Integration', 'WhatsApp Integration', 'Accessibility Optimization'],
    industry: 'Textile Recycling & Used Clothing Export',
    duration: '3 Weeks',
    year: '2024',
    overview: 'ZABS International is a Houston, Texas-based textile recycling and used clothing export and import company operating across six continents. The existing WordPress and Elementor site was generic, slow, and did not represent the company\'s global scale. We built a custom React and Vite website with more than 15 sections, purposeful motion, and professional integrations. This was AEMTECH\'s first international project and an important milestone for the agency.',
    challenge: 'ZABS International had a basic WordPress and Elementor website with only a few generic sections. It lacked WhatsApp integration, testimonials, process visualization, animated statistics, FAQs, and clear trust signals. The contact page also contained an unrelated "AI Specialists" label from the old template. Mobile performance and technical SEO were weak, and the site did not communicate the company\'s reach across more than 30 countries and six continents.',
    solution: 'We built a fully custom React + Vite website from scratch with 15+ premium sections including animated gradient hero with floating cards, auto-scrolling partner marquee, glass-morphism value cards, 4-step timeline process flow, multi-color animated stats counters (70M+ lbs processed, 30+ countries, etc.), global reach section, auto-rotating testimonials, interactive FAQ accordion, premium CTA with animated blobs, professional contact form with Web3Forms + success popup with animated checkmark, floating WhatsApp button, sticky header, full SEO with Schema.org, and complete accessibility support.',
    brandColors: ['#0a0a0a', '#f5c542', '#ffffff', '#1a5c3a'],
    results: [
      { value: '90+', label: 'Performance Score' },
      { value: '95+', label: 'SEO Score' },
      { value: '95+', label: 'Accessibility' },
      { value: '1st', label: 'Demo Approved' },
    ],
    process: [
      { step: '01', title: 'Audit & Research', desc: 'Complete audit of existing WordPress site. Analyzed 6 competitors in textile recycling industry. Identified all UX failures, SEO gaps, and missing features. Prepared a professional audit report and proposal document.' },
      { step: '02', title: 'UI/UX Design', desc: 'Designed more than 15 sections from scratch, including a hero with floating cards, value propositions, a process timeline, animated statistics, testimonials, and a contact experience with a success state.' },
      { step: '03', title: 'Development', desc: 'Built entirely in React + Vite with Tailwind CSS v4. Custom animations, parallax effects, auto-scrolling marquees, animated counters, interactive FAQ accordion, Web3Forms integration with live email delivery, and floating WhatsApp button.' },
      { step: '04', title: 'SEO & Optimization', desc: 'Completed the technical SEO setup with metadata, social cards, and structured data for Organization, LocalBusiness, FAQ, and WebSite. We also added non-blocking fonts, accessibility features, reduced-motion support, and Netlify deployment.' },
      { step: '05', title: 'Delivery & Approval', desc: 'The live demo was delivered in person and approved during the first presentation. The contact form and polished success experience were highlights for the client.' },
    ],
    testimonial: {
      text: 'The website exceeded our expectations. The design is premium, the animations are smooth, and the contact form with popup was the highlight. Truly professional work.',
      name: 'ZABS International',
      role: 'Houston, Texas, USA',
    },
    features: [
      'Fully custom React + Vite build',
      '15+ premium animated sections',
      'Animated gradient hero with parallax',
      'Auto-scrolling partner marquee strip',
      'Glass-morphism value proposition cards',
      '4-step timeline process with connectors',
      'Multi-color animated stats counters',
      'Global reach section (6 continents)',
      'Auto-rotating testimonials slider',
      'Interactive FAQ accordion',
      'Premium CTA with animated blobs',
      'Web3Forms contact + success popup',
      'Floating WhatsApp with pre-filled message',
      'Sticky header with scroll effect',
      'Mobile hamburger menu',
      'Full SEO + Schema.org markup',
      'Accessibility (WCAG compliant)',
      'Deployed on Netlify',
    ],
    nextProject: 'ms-stationery',
  },
];
