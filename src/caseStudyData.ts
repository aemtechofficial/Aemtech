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
  gallery?: { src: string; caption: string }[];
  liveUrl?: string;
  international?: boolean;
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
      logoImage: '/images/portfolio/ms-stationery/logo-badge.png',
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
        { step: '01', title: 'Concept Sketch', desc: 'We started with hand-drawn sketches exploring circular badges, monograms, illustrative elements, and creative stationery motifs. More than 20 concepts were reviewed before narrowing the work to three strong directions.', image: '/images/portfolio/ms-stationery/concept-sketch.png' },
        { step: '02', title: 'Typography Exploration', desc: 'We explored decorative serifs for the monogram, elegant scripts for the wordmark, and clean sans-serif styles for supporting text. Readability was tested across digital and print applications at different sizes.', image: '/images/portfolio/ms-stationery/typography.png' },
        { step: '03', title: 'Color Palette & Brand Refinement', desc: 'We developed a complete color system with Deep Teal for trust, Orange for energy, and Coral, Pink, Sky Blue, and Golden Yellow as accents. Each color was tested across packaging, digital, and print applications.', image: '/images/portfolio/ms-stationery/color-palette.png' },
        { step: '04', title: 'Final Hero 3D Logo', desc: 'The final logo uses an illustrative badge with pencils, brushes, and paper arranged around the MS monogram. A 3D treatment with gold foil accents was created for the final presentation.', image: '/images/portfolio/ms-stationery/hero-3d-logo.png' },
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
    gallery: [
      { src: '/images/portfolio/ms-stationery/design-journey.png', caption: 'Full design journey, from sketch to final logo' },
      { src: '/images/portfolio/ms-stationery/logo-badge.png', caption: 'Final logo badge' },
      { src: '/images/portfolio/ms-stationery/hero-3d-logo.png', caption: '3D hero logo treatment' },
      { src: '/images/portfolio/ms-stationery/color-palette.png', caption: 'Color palette and brand refinement' },
      { src: '/images/portfolio/ms-stationery/concept-sketch.png', caption: 'Concept sketch stage' },
      { src: '/images/portfolio/ms-stationery/typography.png', caption: 'Typography exploration' },
    ],
    nextProject: 'byh-world',
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
    nextProject: 'byh-world',
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
    gallery: [
      { src: '/images/portfolio/zabs/hero.png', caption: 'Homepage hero' },
      { src: '/images/portfolio/zabs/mission.png', caption: 'Mission section' },
      { src: '/images/portfolio/zabs/services.png', caption: 'Services overview' },
      { src: '/images/portfolio/zabs/process.png', caption: 'Process timeline' },
      { src: '/images/portfolio/zabs/impact.png', caption: 'Impact statistics' },
      { src: '/images/portfolio/zabs/global-reach.png', caption: 'Global reach' },
      { src: '/images/portfolio/zabs/testimonial.png', caption: 'Testimonials' },
      { src: '/images/portfolio/zabs/contact.png', caption: 'Contact section' },
    ],
    liveUrl: 'https://zabsinternational.netlify.app/',
    international: true,
    nextProject: 'ms-stationery',
  },
  {
    slug: 'byh-world',
    name: 'B.Y.H World',
    tagline: 'Complete Luxury Brand Identity for Build Your Home World',
    category: 'Brand Identity',
    services: ['Logo Design', 'Business Card Design', 'Tri-Fold Brochure', 'Letterhead Design', 'Envelope Design'],
    industry: 'Furniture & Interiors',
    duration: '3 Weeks',
    year: '2024',
    overview: 'B.Y.H (Build Your Home) World is a Karachi-based furniture and interiors brand offering premium solutions across wood, metal, fibreglass, and glass divisions. They needed a complete luxury brand identity that could represent their high-end positioning across every customer touchpoint, from the logo to the brochure handed to clients.',
    challenge: 'B.Y.H World had no cohesive brand identity. Their materials looked disconnected, with no consistent logo usage, no professional stationery, and no premium sales collateral. For a brand selling luxury interiors, the branding itself needed to feel luxurious before a single word was read.',
    solution: 'We built a complete black and gold luxury identity system. A bold B.Y.H monogram with a house icon, matching business cards for the team, a detailed tri-fold brochure covering all four material divisions, branded letterheads, and envelope design. Every piece uses the same gold-on-black language so the brand feels premium everywhere it appears.',
    brandColors: ['#0a0a0a', '#c9a227', '#ffffff', '#1a1a1a'],
    results: [
      { value: '16', label: 'Brand Assets' },
      { value: '5', label: 'Deliverable Types' },
      { value: '4', label: 'Material Divisions' },
      { value: '100%', label: 'Brand Consistency' },
    ],
    process: [
      { step: '01', title: 'Brand Discovery', desc: 'Studied the furniture and interiors market in Karachi. Defined the luxury positioning: black and gold, bold typography, architectural motifs.' },
      { step: '02', title: 'Logo Design', desc: 'Designed the B.Y.H monogram with an integrated house icon. Created black and white versions for different backgrounds.' },
      { step: '03', title: 'Stationery System', desc: 'Business cards for the team, two letterhead designs, and matching envelopes, all in the same luxury language.' },
      { step: '04', title: 'Tri-Fold Brochure', desc: 'A premium brochure covering the brand story, premium solutions, building materials, and all four divisions: wood and MDF, metal, fibreglass, and glass.' },
    ],
    features: [
      'Luxury B.Y.H monogram logo',
      'Black and white logo versions',
      'Team business cards',
      'Tri-fold sales brochure',
      'Two letterhead designs',
      'Branded envelope design',
      'Gold-on-black identity system',
    ],
    gallery: [
      { src: '/images/portfolio/byh-world/logo-black.png', caption: 'Primary logo, black version' },
      { src: '/images/portfolio/byh-world/logo-white.png', caption: 'Logo, white version' },
      { src: '/images/portfolio/byh-world/card-rehan.png', caption: 'Business card design' },
      { src: '/images/portfolio/byh-world/brochure-3.jpg', caption: 'Tri-fold brochure, hero panel' },
      { src: '/images/portfolio/byh-world/brochure-4.jpg', caption: 'Brochure, premium solutions' },
      { src: '/images/portfolio/byh-world/brochure-5.jpg', caption: 'Brochure, building materials' },
      { src: '/images/portfolio/byh-world/letterhead-1.png', caption: 'Letterhead design' },
      { src: '/images/portfolio/byh-world/letterhead-2.png', caption: 'Letterhead, alternate design' },
    ],
    nextProject: 'ms-enterprise',
  },
  {
    slug: 'ms-enterprise',
    name: 'M.S Enterprise',
    tagline: 'Minimal Brand Identity for a Furniture & Interior Company',
    category: 'Brand Identity',
    services: ['Logo Design', 'Letterhead Design', 'Brand Stationery'],
    industry: 'Furniture & Interior',
    duration: '2 Weeks',
    year: '2024',
    overview: 'M.S Enterprise is a Karachi-based furniture and interior company that needed a clean, minimal brand identity. The brief was simple: professional, trustworthy, and modern, with no unnecessary decoration.',
    challenge: 'The company had no professional identity. They needed a logo and stationery that would look credible on quotations, invoices, and client communications without feeling overdesigned.',
    solution: 'A minimal M.S monogram with a subtle chair icon integrated into the letterforms, using deep navy and cyan. The letterhead carries the same restrained language: clean layout, clear contact blocks, and a faint watermark of the mark.',
    brandColors: ['#1a2a3a', '#0ea5c9', '#ffffff', '#f4f4f4'],
    results: [
      { value: '3', label: 'Brand Assets' },
      { value: '2', label: 'Deliverable Types' },
      { value: '100%', label: 'Minimal Brief Met' },
    ],
    process: [
      { step: '01', title: 'Brief & Direction', desc: 'The client wanted minimal and professional. We locked the direction early: navy and cyan, clean geometry, no clutter.' },
      { step: '02', title: 'Logo Design', desc: 'Built the M.S monogram with an integrated chair silhouette. Tested at small sizes for stationery use.' },
      { step: '03', title: 'Stationery', desc: 'Designed the letterhead and document templates with consistent typography and contact blocks.' },
    ],
    features: [
      'Minimal M.S monogram logo',
      'Integrated chair icon',
      'Navy and cyan palette',
      'Branded letterhead',
      'Document templates',
    ],
    gallery: [
      { src: '/images/portfolio/ms-enterprise/logo.png', caption: 'M.S Enterprise logo' },
      { src: '/images/portfolio/ms-enterprise/letterhead.png', caption: 'Branded letterhead' },
    ],
    nextProject: 'sr-global',
  },
  {
    slug: 'sr-global',
    name: 'S.R Global',
    tagline: 'Gold Luxury Identity for a Furniture Brand',
    category: 'Brand Identity',
    services: ['Logo Design', 'Letterhead Design', 'Brand Stationery'],
    industry: 'Furniture & Interior',
    duration: '2 Weeks',
    year: '2024',
    overview: 'S.R Global is a furniture brand with the tagline "Crafting Comfort, Defining Spaces." They wanted a gold luxury identity that would position them as a premium maker, not a commodity seller.',
    challenge: 'In a crowded furniture market, S.R Global needed to look like the premium option. Their existing materials did not communicate quality or craftsmanship.',
    solution: 'An elegant gold S.R monogram with a chair woven into the letterforms, set in a refined serif. The letterhead extends the luxury feel with gold accents, warm neutrals, and generous whitespace.',
    brandColors: ['#0a0a0a', '#c9a227', '#ffffff', '#f5f0e6'],
    results: [
      { value: '3', label: 'Brand Assets' },
      { value: '2', label: 'Deliverable Types' },
      { value: '100%', label: 'Luxury Brief Met' },
    ],
    process: [
      { step: '01', title: 'Positioning', desc: 'Defined the premium angle: gold, serif typography, craftsmanship cues. The tagline "Crafting Comfort, Defining Spaces" led the tone.' },
      { step: '02', title: 'Logo Design', desc: 'Drew the S.R monogram with an integrated armchair. Refined the gold gradient for print and digital use.' },
      { step: '03', title: 'Stationery', desc: 'Letterhead and documents in the same gold and black system, with the tagline set as a footer signature.' },
    ],
    features: [
      'Gold S.R monogram logo',
      'Integrated armchair motif',
      'Luxury serif typography',
      'Branded letterhead',
      'Tagline lockup system',
    ],
    gallery: [
      { src: '/images/portfolio/sr-global/logo.png', caption: 'S.R Global gold logo' },
      { src: '/images/portfolio/sr-global/letterhead.png', caption: 'Branded letterhead' },
    ],
    nextProject: 'us-global-star-trading',
  },
  {
    slug: 'us-global-star-trading',
    name: 'US Global Star Trading',
    tagline: 'Full Fintech Trading Platform Website',
    category: 'Website Development',
    services: ['Website Design', 'Frontend Development', 'UI/UX Design', 'SEO Optimization'],
    industry: 'Fintech & Trading',
    duration: '4 Weeks',
    year: '2025',
    overview: 'US Global Star Trading LLC needed a complete fintech website that could stand next to established trading platforms. A dark, premium trading experience with live market data, investment products, and a full education center.',
    challenge: 'Fintech websites live or die on trust. The site needed to feel institutional-grade: real market data visualization, clear product offerings across asset classes, transparent pricing, and strong security messaging, all in a polished dark interface.',
    solution: 'We built a dark navy and gold trading platform experience with a live market ticker, dashboard-style demo charts, investment products across stocks, ETFs, options, fixed income, and mutual funds, plus a research hub, education center, and security section. The design language is calm, precise, and confident.',
    brandColors: ['#0a1628', '#c9a227', '#ffffff', '#1a2a4a'],
    results: [
      { value: '8', label: 'Page Sections' },
      { value: '5', label: 'Asset Classes' },
      { value: '100%', label: 'Custom Design' },
    ],
    process: [
      { step: '01', title: 'Fintech Research', desc: 'Studied leading trading platforms to understand trust patterns: data density, security signals, and clear CTAs.' },
      { step: '02', title: 'UI/UX Design', desc: 'Designed the dark trading interface with dashboard mockups, chart components, and a clear information hierarchy.' },
      { step: '03', title: 'Development', desc: 'Built the full site with live ticker, interactive charts, product sections, and the education center.' },
      { step: '04', title: 'Trust & Compliance', desc: 'Added risk disclaimers, security messaging, and transparent footer structure required for financial services.' },
    ],
    features: [
      'Live market ticker',
      'Dashboard-style demo charts',
      'Five asset class sections',
      'Trading technology showcase',
      'Research and insights hub',
      'Education center',
      'Security section',
      'Risk disclaimer compliance',
    ],
    gallery: [
      { src: '/images/portfolio/usgst/hero.png', caption: 'Homepage hero' },
      { src: '/images/portfolio/usgst/trading-tech.png', caption: 'Trading technology' },
      { src: '/images/portfolio/usgst/dashboard.png', caption: 'Dashboard preview' },
      { src: '/images/portfolio/usgst/products.png', caption: 'Investment products' },
      { src: '/images/portfolio/usgst/features.png', caption: 'Platform features' },
      { src: '/images/portfolio/usgst/why-us.png', caption: 'Why US Global Star' },
      { src: '/images/portfolio/usgst/education-security.png', caption: 'Education and security' },
      { src: '/images/portfolio/usgst/cta-footer.png', caption: 'CTA and footer' },
    ],
    liveUrl: 'https://usgst.com/',
    international: true,
    nextProject: 'aemtech-website',
  },
  {
    slug: 'aemtech-website',
    name: 'AEMTECH Website',
    tagline: 'Our Own Digital Flagship, Designed to Sell',
    category: 'Website Development',
    services: ['Website Design', 'Frontend Development', 'Brand Identity', 'SEO Optimization', 'Content Strategy'],
    industry: 'Digital Agency',
    duration: 'Ongoing',
    year: '2025',
    overview: 'This website. AEMTECH\'s own digital flagship, built to do what we promise clients: attract attention, build trust, and convert visitors into conversations. React, Vite, and Tailwind with rich motion design, full case studies, and technical SEO.',
    challenge: 'An agency website has to prove the agency\'s craft on every scroll. It needed to feel premium and alive, load fast, rank on Google, and turn visitors into leads without feeling like a template.',
    solution: 'We built it like a product: animated hero, interactive portfolio with real case studies, service pages with depth, honest stats, and full SEO with sitemap and structured data. It ranks number one on Google for "Aemtech" in Pakistan.',
    brandColors: ['#050505', '#f5c542', '#ffffff', '#1a1a1a'],
    results: [
      { value: '#1', label: 'Google Rank (Aemtech)' },
      { value: '20+', label: 'Pages Indexed' },
      { value: '8', label: 'Case Studies' },
      { value: '100%', label: 'Custom Built' },
    ],
    process: [
      { step: '01', title: 'Positioning', desc: 'Defined AEMTECH as a premium digital ecosystem: agency plus institute, black and gold, motion-rich.' },
      { step: '02', title: 'Design System', desc: 'Built the visual language: dark surfaces, gold accents, generous whitespace, purposeful animation.' },
      { step: '03', title: 'Development', desc: 'React 19, Vite 7, Tailwind 4. SPA with deep links, SEO meta, sitemap, and structured data.' },
      { step: '04', title: 'Growth', desc: 'Search Console, sitemap submission, and continuous iteration. Ranking number one for the brand term.' },
    ],
    features: [
      'Custom React + Vite build',
      'Animated rich design',
      'Interactive portfolio',
      'Full case study system',
      'Technical SEO + sitemap',
      'Number one Google ranking',
    ],
    gallery: [
      { src: '/images/portfolio/aemtech/shot-01.png', caption: 'Homepage hero' },
      { src: '/images/portfolio/aemtech/shot-03.png', caption: 'Homepage services' },
      { src: '/images/portfolio/aemtech/shot-06.png', caption: 'Portfolio page' },
      { src: '/images/portfolio/aemtech/shot-11.png', caption: 'About page' },
      { src: '/images/portfolio/aemtech/shot-16.png', caption: 'Contact page' },
      { src: '/images/portfolio/aemtech/shot-18.png', caption: 'Contact form' },
    ],
    liveUrl: 'https://www.aemtechofficial.com/',
    nextProject: 'zabs-international',
  },
];
