import { useState, useEffect, useRef, useCallback } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ServicesPage, PortfolioPage, AboutPage, BlogPage, ContactPage, SingleServicePage, CaseStudyPage } from './pages';
import { allServices } from './serviceData';
import { allCaseStudies } from './caseStudyData';

/* ═══════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════ */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } }, { threshold: 0.14 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useCounter(target: number, suffix: string) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let cur = 0; const step = Math.max(1, Math.ceil(target / 46));
      const tick = () => { cur += step; if (cur >= target) { el.textContent = `${target}${suffix}`; return; } el.textContent = `${cur}${suffix}`; requestAnimationFrame(tick); };
      tick(); obs.unobserve(el);
    }, { threshold: 0.45 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix]);
  return ref;
}

function R({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function getPageFromLocation() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/about') return 'about';
  if (path === '/services') return 'services';
  if (path === '/portfolio') return 'portfolio';
  if (path === '/blog') return 'blog';
  if (path === '/contact') return 'contact';
  if (path.startsWith('/services/')) return `service-${path.split('/').filter(Boolean)[1]}`;
  if (path.startsWith('/case-studies/')) return `case-${path.split('/').filter(Boolean)[1]}`;

  // Support old shared hash URLs and migrate them after the app mounts.
  const hash = window.location.hash.replace(/^#/, '');
  const staticPages = ['about', 'services', 'portfolio', 'blog', 'contact'];
  if (staticPages.includes(hash) || hash.startsWith('service-') || hash.startsWith('case-')) return hash;
  return 'home';
}

function pageToPath(page: string) {
  if (page === 'home') return '/';
  if (page.startsWith('service-')) return `/services/${page.replace('service-', '')}`;
  if (page.startsWith('case-')) return `/case-studies/${page.replace('case-', '')}`;
  return `/${page}`;
}

/* ═══════════════════════════════════════
   APP
   ═══════════════════════════════════════ */
export default function App() {
  const [loading, setLoading] = useState(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !reducedMotion && window.innerWidth > 720 && !window.sessionStorage.getItem('aemtech-loaded');
  });
  const [loadProgress, setLoadProgress] = useState(0);
  const [page, setPage] = useState(getPageFromLocation);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const [formError, setFormError] = useState(false);
  const [mobileDD, setMobileDD] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [pageTransition, setPageTransition] = useState(false);
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const heroTypedRef = useRef<HTMLSpanElement>(null);

  // Cursor glow effect
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const handleMouseMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        cursorRef.current?.style.setProperty('transform', `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`);
        frame = 0;
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Hero typed text effect
  useEffect(() => {
    const words = ['Attention.', 'Trust.', 'Demand.', 'Growth.'];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (heroTypedRef.current) heroTypedRef.current.textContent = words[0];
      return;
    }
    let wordIdx = 0, charIdx = 0, deleting = false;
    let timer = 0;
    const tick = () => {
      const word = words[wordIdx];
      if (!deleting) {
        if (heroTypedRef.current) heroTypedRef.current.textContent = word.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === word.length) {
          timer = window.setTimeout(() => { deleting = true; tick(); }, 2200);
          return;
        }
      } else {
        if (heroTypedRef.current) heroTypedRef.current.textContent = word.slice(0, charIdx);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
        }
      }
      timer = window.setTimeout(tick, deleting ? 40 : 80);
    };
    timer = window.setTimeout(tick, 900);
    return () => window.clearTimeout(timer);
  }, []);

  const goTo = (p: string) => {
    setPageTransition(true);
    setTimeout(() => {
      const nextUrl = pageToPath(p);
      if (`${window.location.pathname}${window.location.search}` !== nextUrl || window.location.hash) {
        window.history.pushState({ page: p }, '', nextUrl);
      }
      setPage(p);
      setMenuOpen(false);
      setMobileDD(false);
      window.scrollTo({ top: 0 });
      setTimeout(() => setPageTransition(false), 50);
    }, 300);
  };

  // Keep custom SPA navigation shareable and restore it with browser back/forward.
  useEffect(() => {
    const initialPage = getPageFromLocation();
    if (window.location.hash && (initialPage !== 'home' || /^(about|services|portfolio|blog|contact)$/.test(window.location.hash.slice(1)))) {
      window.history.replaceState({ page: initialPage }, '', pageToPath(initialPage));
    }
    const syncFromUrl = () => {
      setPage(getPageFromLocation());
      setMenuOpen(false);
      setMobileDD(false);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
    };
  }, []);

  // Give each SPA view a focused title and description for sharing and browser history.
  useEffect(() => {
    const service = page.startsWith('service-') ? allServices.find(item => `service-${item.slug}` === page) : undefined;
    const study = page.startsWith('case-') ? allCaseStudies.find(item => `case-${item.slug}` === page) : undefined;
    const titles: Record<string, string> = {
      home: 'AEMTECH | Premium Creative & Marketing Agency',
      about: 'About AEMTECH | Creative & Marketing Agency',
      services: 'Creative, Branding & Marketing Services | AEMTECH',
      portfolio: 'Creative & Marketing Portfolio | AEMTECH',
      blog: 'Creative & Marketing Insights | AEMTECH',
      contact: 'Start a Project | AEMTECH',
    };
    const descriptions: Record<string, string> = {
      home: 'AEMTECH is a premium creative and marketing agency for brand identity, graphic design, social media, digital campaigns, websites and ecommerce.',
      about: 'Meet AEMTECH, a Karachi-based creative and marketing agency helping ambitious brands build attention, trust and measurable growth.',
      services: 'Explore AEMTECH services across branding, logo and graphic design, social media, digital marketing, UI/UX, websites and ecommerce.',
      portfolio: 'Explore branding, marketing, website and ecommerce work created by AEMTECH for Pakistani and international clients.',
      contact: 'Contact AEMTECH for branding, design, social media, digital marketing, website or ecommerce projects.',
    };
    document.title = service
      ? `${service.title} | AEMTECH Creative & Marketing Agency`
      : study
        ? `${study.name} Case Study | AEMTECH`
        : titles[page] || titles.home;
    const description = service?.short || study?.tagline || descriptions[page] || descriptions.home;
    const canonicalUrl = `https://aemtechofficial.com${pageToPath(page)}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.setAttribute('href', canonicalUrl));

    const schemaId = 'aemtech-view-schema';
    document.getElementById(schemaId)?.remove();
    if (service || study) {
      const schema = document.createElement('script');
      schema.id = schemaId;
      schema.type = 'application/ld+json';
      const primaryEntity = service ? {
        '@type': 'Service',
        name: service.title,
        description: service.desc,
        provider: { '@type': 'Organization', name: 'AEMTECH', url: 'https://aemtechofficial.com' },
        areaServed: ['Pakistan', 'United Arab Emirates', 'United Kingdom', 'United States'],
        url: canonicalUrl,
      } : {
        '@type': 'CreativeWork',
        name: `${study?.name} Case Study`,
        description: study?.overview,
        creator: { '@type': 'Organization', name: 'AEMTECH', url: 'https://aemtechofficial.com' },
        url: canonicalUrl,
      };
      const parentName = service ? 'Services' : 'Portfolio';
      const parentUrl = service ? 'https://aemtechofficial.com/services' : 'https://aemtechofficial.com/portfolio';
      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          primaryEntity,
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aemtechofficial.com/' },
              { '@type': 'ListItem', position: 2, name: parentName, item: parentUrl },
              { '@type': 'ListItem', position: 3, name: service?.title || study?.name, item: canonicalUrl },
            ],
          },
        ],
      });
      document.head.appendChild(schema);
    }
  }, [page]);

  // Loader
  useEffect(() => {
    if (!loading) return;
    const iv = setInterval(() => setLoadProgress(p => p >= 100 ? 100 : p + 8), 45);
    const tm = setTimeout(() => {
      window.sessionStorage.setItem('aemtech-loaded', 'true');
      setLoading(false);
    }, 850);
    return () => { clearInterval(iv); clearTimeout(tm); };
  }, [loading]);

  // Scroll header
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    fn(); window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Scroll top + progress bar
  useEffect(() => {
    let frame = 0;
    const fn = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setShowScrollTop(window.scrollY > 600);
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
        frame = 0;
      });
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => {
      window.removeEventListener('scroll', fn);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Menu body lock
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  // Global form submit listener
  useEffect(() => {
    const fn = () => setFormSent(true);
    window.addEventListener('formSubmitted', fn);
    return () => window.removeEventListener('formSubmitted', fn);
  }, []);

  // Testimonial auto
  const testimonials = [
    { stars: '★★★★★', text: '"The website exceeded our expectations. The design feels premium, the animations are smooth, and the contact experience was a highlight."', ini: 'ZI', name: 'ZABS International', role: 'Houston, Texas' },
    { stars: '★★★★★', text: '"AEMTECH translated our ideas into a clear brand and a polished digital experience. The process felt thoughtful from start to finish."', ini: 'MS', name: 'MS Stationery', role: 'Branding + Ecommerce' },
    { stars: '★★★★★', text: '"Strong creative direction, clear communication, and work designed around the business rather than a generic template."', ini: 'AR', name: 'Ahsan R.', role: 'Founder, TechNova' },
  ];
  useEffect(() => { const t = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 5200); return () => clearInterval(t); }, []);

  // Parallax
  useEffect(() => {
    const el = heroVisualRef.current; if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches || window.innerWidth <= 920) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const fn = (e: MouseEvent) => {
      x = (e.clientX / window.innerWidth - 0.5) * 14;
      y = (e.clientY / window.innerHeight - 0.5) * 14;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        el.querySelectorAll<HTMLElement>('.floating-card').forEach((card, i) => {
          const d = (i + 1) * 0.12;
          card.style.translate = `${x * d}px ${y * d}px`;
        });
        frame = 0;
      });
    };
    window.addEventListener('mousemove', fn, { passive: true });
    return () => {
      window.removeEventListener('mousemove', fn);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Tilt
  const handleTilt = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget; const rect = card.getBoundingClientRect();
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -7;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 7;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  }, []);
  const resetTilt = useCallback((e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = ''; }, []);

  // Counter refs
  const c1 = useCounter(10, '+');
  const c2 = useCounter(8, '+');
  const c3 = useCounter(100, '%');
  const c4 = useCounter(2, '+');

  // Navigation
  const navLinks = [
    { label: 'Home', page: 'home', href: '/', matchPage: true },
    { label: 'About', page: 'about', href: '/about', matchPage: true },
    { label: 'Services', page: 'services', href: '/services', matchPage: true },
    { label: 'Portfolio', page: 'portfolio', href: '/portfolio', matchPage: true },
    { label: 'Team', page: 'home', href: '#team', matchPage: false },
    { label: 'Contact', page: 'contact', href: '/contact', matchPage: true },
  ];

  return (
    <>
      {/* ═══ LOADER ═══ */}
      <div className={`loader-screen${!loading ? ' done' : ''}`} role="status" aria-label="Loading AEMTECH">
        <div className="loader-glow" />
        <div className="loader-grid" />
        <div className="loader-orbit-1" />
        <div className="loader-orbit-2" />
        <div className="loader-content">
          <div className="loader-logo-glow">
            <span className="loader-logo-text-new" style={{ fontSize: '52px', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center' }}>
              <span className="loader-letter" style={{ color: '#fff' }}>A</span>
              <span className="loader-letter" style={{ color: '#fff' }}>E</span>
              <span className="loader-letter" style={{ color: '#fff' }}>M</span>
              <span className="loader-letter loader-letter-t glowing" style={{ color: 'var(--gold)' }}>T</span>
              <span className="loader-letter" style={{ color: '#fff' }}>E</span>
              <span className="loader-letter" style={{ color: '#fff' }}>C</span>
              <span className="loader-letter" style={{ color: '#fff' }}>H</span>
            </span>
          </div>
          <div className="loader-tagline">Design the Future with AEMTECH</div>
          <div className="loader-bar-wrap">
            <div className="loader-bar" style={{ width: `${loadProgress}%` }} />
            <div className="loader-percent">{loadProgress}%</div>
          </div>
          <div className="loader-status">Loading premium experience...</div>
        </div>
      </div>

      {/* ═══ SCROLL PROGRESS BAR ═══ */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Skip to content: Accessibility */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <div className="ambient" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      
      {/* Cursor Glow */}
      <div ref={cursorRef} className="cursor-glow" aria-hidden="true" />

      {/* ANNOUNCEMENT */}
      {announcementVisible && (
        <div className="announcement-premium">
          <div className="announcement-content">
            <span className="announcement-dot" />
            <span>We're Available for New Projects</span>
            <button className="announcement-cta" onClick={() => goTo('contact')}>Let's Build Something Amazing →</button>
          </div>
          <button className="announcement-close" onClick={() => setAnnouncementVisible(false)} aria-label="Close">✕</button>
        </div>
      )}

      {/* HEADER */}
      <header className={`site-header${scrolled ? ' scrolled' : ''}`} role="banner">
        <nav className="navbar" aria-label="Main navigation">
          <a href="/" className="logo logo-animated" aria-label="AEMTECH home" onClick={e => { e.preventDefault(); goTo('home'); }}>
            <span style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center' }}>
              <span className="logo-letter" style={{ color: 'var(--white)', animationDelay: '0s' }}>A</span>
              <span className="logo-letter" style={{ color: 'var(--white)', animationDelay: '.05s' }}>E</span>
              <span className="logo-letter" style={{ color: 'var(--white)', animationDelay: '.1s' }}>M</span>
              <span className="logo-t" style={{ color: 'var(--gold)', animationDelay: '.15s' }}>T</span>
              <span className="logo-letter" style={{ color: 'var(--white)', animationDelay: '.2s' }}>E</span>
              <span className="logo-letter" style={{ color: 'var(--white)', animationDelay: '.25s' }}>C</span>
              <span className="logo-letter" style={{ color: 'var(--white)', animationDelay: '.3s' }}>H</span>
            </span>
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation">
            <span /><span />
          </button>
          <div id="mobile-navigation" className={`nav-panel${menuOpen ? ' open' : ''}`}>
            <ul className="nav-links">
              {navLinks.map(l => {
                if (l.label === 'Services') {
                  return (
                    <li key="Services" className={mobileDD ? 'dd-open' : ''}>
                      <a
                        className={`dropdown-label${page === 'services' || page.startsWith('service-') ? ' active' : ''}`}
                        href="/services"
                        onClick={e => {
                          e.preventDefault();
                          if (window.innerWidth <= 920) {
                            setMobileDD(!mobileDD);
                          } else {
                            goTo('services');
                          }
                        }}
                      >
                        Services <span className="dropdown-arrow">▾</span>
                      </a>
                      <div className="nav-dropdown">
                        {allServices.map(s => (
                          <a key={s.slug} href={`/services/${s.slug}`} onClick={e => { e.preventDefault(); setMobileDD(false); goTo(`service-${s.slug}`); }}>
                            <span className="dd-icon">{s.icon}</span>
                            <div>
                              <div className="dd-title">{s.title}</div>
                              <div className="dd-desc">{s.short.slice(0, 50)}...</div>
                            </div>
                          </a>
                        ))}
                        <a href="/services" onClick={e => { e.preventDefault(); setMobileDD(false); goTo('services'); }} style={{ marginTop: 8, justifyContent: 'center', color: 'var(--gold)', fontWeight: 700, fontSize: 12 }}>
                          View All Services →
                        </a>
                      </div>
                    </li>
                  );
                }
                return (
                  <li key={l.label}><a className={l.matchPage && page === l.page ? 'active' : ''} href={l.href} onClick={e => {
                    e.preventDefault();
                    if (l.page === 'home' && l.href.startsWith('#')) {
                      goTo('home');
                      setTimeout(() => { document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }); }, 380);
                    } else if (l.page === 'home') {
                      goTo('home');
                    } else {
                      goTo(l.page);
                    }
                  }}>{l.label}</a></li>
                );
              })}
            </ul>
            <a className="btn btn-outline nav-cta" href="/contact" onClick={e => { e.preventDefault(); goTo('contact'); }}>Get Started <span>+</span></a>
          </div>
        </nav>
      </header>

      {/* INNER PAGES: smooth transition */}
      <div className={`page-wrapper${pageTransition ? ' transitioning' : ''}`} key={page} id={page !== 'home' ? 'main-content' : undefined}>
        {page === 'services' && <ServicesPage goTo={goTo} />}
        {page === 'portfolio' && <PortfolioPage goTo={goTo} />}
        {page === 'about' && <AboutPage goTo={goTo} />}
        {page === 'blog' && <BlogPage goTo={goTo} />}
        {page === 'contact' && <ContactPage goTo={goTo} />}
        {page.startsWith('service-') && <SingleServicePage goTo={goTo} slug={page.replace('service-', '')} />}
        {page.startsWith('case-') && <CaseStudyPage goTo={goTo} slug={page.replace('case-', '')} />}
      </div>

      {/* ═══ HOMEPAGE ═══ */}
      {page === 'home' && <main id="main-content" role="main">
        {/* ═══ HERO ═══ */}
        <section className="hero section-pad" id="home">
          {/* Hero Background Effects */}
          <div className="hero-bg-effects" aria-hidden="true">
            <div className="hero-gradient" />
            <div className="hero-grid-pattern" />
            {[...Array(5)].map((_, i) => <div key={i} className="hero-particle" style={{ animationDelay: `${i * 0.8}s` }} />)}
          </div>
          
          <div className="container hero-grid">
            <R className="hero-copy">
              <div className="hero-badge">
                <span className="badge-dot" />
                <span>Available for Projects</span>
                <span className="badge-arrow">→</span>
              </div>
              <p className="hero-brand">AEMTECH</p>
              <h1>Creative ideas and marketing systems built for <span className="typed-wrap"><span ref={heroTypedRef}>Attention.</span><span className="typed-cursor">|</span></span></h1>
              <p className="hero-lead">A premium creative and marketing agency shaping memorable brands, high-impact campaigns, social content, websites, and ecommerce experiences for Pakistani and international clients.</p>
              <div className="hero-actions">
                <a className="btn btn-gold btn-glow" href="/contact" onClick={e => { e.preventDefault(); goTo('contact'); }}>Start Your Project <span>→</span></a>
                <a className="btn btn-glass" href="/portfolio" onClick={e => { e.preventDefault(); goTo('portfolio'); }}>View Portfolio <span>▶</span></a>
              </div>
              
              {/* Quick Stats */}
              <div className="hero-stats">
                <div className="hero-stat">
                  <strong>10+</strong>
                  <span>Projects Delivered</span>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat">
                  <strong>100%</strong>
                  <span>Client Satisfaction</span>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat">
                  <strong>12hr</strong>
                  <span>Avg Reply Time</span>
                </div>
              </div>

              <div className="hero-trust">
                <small>Trusted tools & platforms</small>
                <div className="mini-logos">
                  <span>Adobe</span><span>Figma</span><span>Meta</span><span>Google</span><span>Klaviyo</span>
                </div>
              </div>
            </R>
            <R>
              <div className="hero-visual" ref={heroVisualRef}>
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="dashboard-card floating-card main-dashboard">
                  <div className="card-top">
                    <div><span>Campaign Reach</span><strong>2.4M</strong><em>+38.6%</em></div>
                    <b>↗</b>
                  </div>
                  <div className="chart-lines"><i /><i /><i /><i /><i /><i /></div>
                  <div className="channel-row"><div>Content</div><div>Meta</div><div>Google</div><div>Email</div></div>
                </div>
                <div className="metric-card floating-card metric-one"><span>Qualified Leads</span><strong>1,842</strong><em>+18.7%</em></div>
                <div className="metric-card floating-card metric-two"><span>Return on Ad Spend</span><strong>4.8x</strong><em>+1.4x</em></div>
                <div className="mockup-card floating-card mockup-one">
                  <span style={{ fontSize: 32, color: 'var(--gold)', opacity: 0.4 }}>♕</span>
                </div>
                <div className="mockup-card floating-card mockup-two">
                  <span style={{ fontSize: 32, color: 'var(--gold)', opacity: 0.4 }}>✦</span>
                </div>
                <div className="mockup-card floating-card mockup-three">
                  <span style={{ fontSize: 32, color: 'var(--gold)', opacity: 0.4 }}>◇</span>
                </div>
              </div>
            </R>
          </div>
          <R className="capability-strip">
            <span>Strategy</span><i /><span>Branding</span><i /><span>Content</span><i /><span>Marketing</span><i /><span>Digital</span>
          </R>
        </section>

        {/* ═══ MARQUEE ═══ */}
        <section className="trusted section-tight">
          <div className="container"><p className="section-kicker">Trusted tools and platforms</p></div>
          <div className="marquee">
            <div className="marquee-track">
              {['Adobe','Figma','Meta','Google','Klaviyo','Shopify','Canva','Webflow','Framer','Adobe','Figma','Meta','Google','Klaviyo','Shopify','Canva','Webflow','Framer'].map((b, i) => <span key={i}>{b}</span>)}
            </div>
          </div>
        </section>

        {/* ═══ TRUST STRIP 1 ═══ */}
        <div className="trust-strip">
          <div className="container">
            <div className="trust-strip-inner">
              {['Quality Projects Delivered','Growing Clientele','100% Client Satisfaction','Pakistan & International','Premium Quality Only'].map(t =>
                <div key={t}>{t}</div>
              )}
            </div>
          </div>
        </div>

        {/* ═══ WHY CHOOSE AEMTECH ═══ */}
        <section className="why-section section-pad" id="about">
          <div className="container">
            <R className="center-head">
              <p className="eyebrow">Why AEMTECH</p>
              <h2>Why Growing Brands Choose <span>AEMTECH</span></h2>
              <p>We connect brand strategy, creative execution, marketing, and technology so every touchpoint looks consistent and works toward growth.</p>
            </R>
            <div className="why-grid">
              {[
                { icon: '◇', n: '01', title: 'Brand-Led Creativity.', desc: 'Every identity, visual, campaign, and digital experience starts with your positioning, audience, and business objective.', badge: 'Strategy Before Design' },
                { icon: '↗', n: '02', title: 'Marketing With Commercial Intent.', desc: 'We create work designed to earn attention, build trust, and move the right audience toward action.', badge: 'Creative Meets Growth' },
                { icon: '♕', n: '03', title: 'One Partner Across Touchpoints.', desc: 'From logo and social content to campaigns, websites, and ecommerce, your brand stays consistent everywhere.', badge: 'Integrated Creative Team' },
              ].map((w, i) => (
                <R key={i}>
                  <div className="why-card-premium">
                    <div className="wcp-icon-wrap">
                      <span className="wcp-icon">{w.icon}</span>
                      <span className="wcp-num">{w.n}</span>
                    </div>
                    <h3>{w.title}</h3>
                    <p>{w.desc}</p>
                    <div className="wcp-badge"><span>★</span> {w.badge}</div>
                    <div className="wcp-glow" />
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SERVICES ═══ */}
        <section className="services section-pad" id="services">
          <div className="container">
            <R className="section-head">
              <div><p className="eyebrow">What we do</p><h2>Creative, Marketing & Digital Services</h2></div>
              <a className="btn btn-outline" href="/services" onClick={e => { e.preventDefault(); goTo('services'); }}>View All <span>→</span></a>
            </R>
            <div className="services-grid-premium">
              {allServices.slice(0, 8).map((s, i) => (
                <R key={i}>
                  <article className={`service-card-premium ${i === 0 ? 'featured' : ''}`}>
                    <a className="service-card-hit" href={`/services/${s.slug}`} onClick={e => { e.preventDefault(); goTo(`service-${s.slug}`); }}>
                      <div className="scp-header">
                        <span className="scp-icon">{s.icon}</span>
                        <span className="scp-arrow">→</span>
                      </div>
                      <h3>{s.title}</h3>
                      <p>{s.short}</p>
                      <div className="scp-footer">
                        <span className="scp-learn">Learn More</span>
                        <div className="scp-tags">
                          {s.categories?.slice(0, 2).map(c => <span key={c}>{c}</span>)}
                        </div>
                      </div>
                    </a>
                    <div className="scp-hover-glow" />
                  </article>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PORTFOLIO ═══ */}
        <section className="portfolio-section section-pad" id="portfolio">
          <div className="container">
            <R className="center-head">
              <p className="eyebrow">Our portfolio</p>
              <h2>Work That Speaks For <span>Itself</span></h2>
              <p>Selected projects showcasing premium design and real business results.</p>
            </R>
            {/* FEATURED CASE STUDY */}
            <R>
              <article className="portfolio-feature">
                <a className="pf-hit" href="/case-studies/zabs-international" onClick={e => { e.preventDefault(); goTo('case-zabs-international'); }}>
                  <div className="pf-visual" aria-hidden="true">
                    <span className="pf-mono">ZI</span>
                    <div className="pf-glow" />
                  </div>
                  <div className="pf-body">
                    <div className="pf-tags">
                      <span className="pf-tag pf-tag-live">First International Project</span>
                      <span className="pf-tag">Website Redesign</span>
                      <span className="pf-tag">Houston, TX</span>
                    </div>
                    <h3>ZABS International</h3>
                    <p>A complete rebuild of a textile recycling company's WordPress site into a custom React and Vite experience with technical SEO and accessibility.</p>
                    <ul className="pf-metrics">
                      <li><strong>90+</strong><span>Lighthouse Performance</span></li>
                      <li><strong>15+</strong><span>Custom Sections</span></li>
                      <li><strong>1st</strong><span>Client Approval</span></li>
                    </ul>
                    <span className="pf-cta">Read Full Case Study <span className="pf-cta-arrow">→</span></span>
                  </div>
                </a>
              </article>
            </R>

            {/* SECONDARY WORK */}
            <div className="portfolio-grid-premium">
              {[
                { cat: 'Brand Identity', name: 'MS Stationery', sub: 'Stationery & Office Supplies', stat: '4', statLabel: 'Creative Stages', color: '#f5c542', cs: 'ms-stationery' },
                { cat: 'Ecommerce', name: 'Glamouria', sub: 'Fashion & Apparel', stat: '+120%', statLabel: 'Sales Growth', color: '#6b8afd', cs: 'glamouria' },
                { cat: 'Brand + Digital', name: 'PureGlow', sub: 'Skincare', stat: '360°', statLabel: 'Brand System', color: '#a78bfa', cs: '' },
                { cat: 'Marketing System', name: 'FitFuel', sub: 'Fitness Supplements', stat: 'Full', statLabel: 'Growth Funnel', color: '#ff6b9d', cs: '' },
              ].map((p, i) => (
                <R key={i}>
                  <article className="portfolio-card-premium" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
                    <div className="pcp-image">
                      <span className="pcp-letter" style={{ color: p.color }}>{p.name[0]}</span>
                      <div className="pcp-overlay">
                        {p.cs ? (
                          <a className="btn btn-gold" href={`/case-studies/${p.cs}`} onClick={e => { e.preventDefault(); goTo(`case-${p.cs}`); }}>Case Study <span>→</span></a>
                        ) : (
                          <a className="btn btn-gold" href="/contact" onClick={e => { e.preventDefault(); goTo('contact'); }}>Get Similar <span>→</span></a>
                        )}
                      </div>
                    </div>
                    <div className="pcp-content">
                      <div className="pcp-cat">{p.cat}</div>
                      <h3>{p.name}</h3>
                      <p>{p.sub}</p>
                      <div className="pcp-stat">
                        <strong style={{ color: p.color }}>{p.stat}</strong>
                        <span>{p.statLabel}</span>
                      </div>
                    </div>
                  </article>
                </R>
              ))}
            </div>
            <R>
              <div style={{ textAlign: 'center', marginTop: 48 }}>
                <a className="btn btn-outline" href="/portfolio" onClick={e => { e.preventDefault(); goTo('portfolio'); }}>View All Projects <span>→</span></a>
              </div>
            </R>
          </div>
        </section>

        {/* ═══ TRUST STRIP 2 ═══ */}
        <div className="trust-strip">
          <div className="container">
            <div className="trust-strip-inner">
              {['Brand Strategy First','Original Creative Work','Marketing Focused','Channel Consistent','Mobile Optimized','Growth Ready'].map(t =>
                <div key={t}>{t}</div>
              )}
            </div>
          </div>
        </div>

        {/* PROCESS: PREMIUM */}
        <section className="process-section section-pad">
          <div className="container">
            <R className="center-head">
              <p className="eyebrow">Our process</p>
              <h2>A Simple Process. <span>Powerful Results.</span></h2>
              <p>From the first call to final launch, this is how we bring your vision to life.</p>
            </R>
            <div className="process-timeline">
              {[
                { n: '01', icon: '🎯', t: 'Discovery', d: 'We understand your goals, audience, brand, and current challenges through a focused discovery call.' },
                { n: '02', icon: '📋', t: 'Strategy', d: 'We create the complete roadmap for design direction, technology, content, and growth.' },
                { n: '03', icon: '🎨', t: 'Design', d: 'We craft premium Figma mockups with clear hierarchy, brand alignment, and conversion intent.' },
                { n: '04', icon: '⚡', t: 'Development', d: 'We build fast, secure, responsive, and scalable solutions with clean, modern code.' },
                { n: '05', icon: '🚀', t: 'Launch', d: 'We test on real devices, optimize performance, and launch your project with confidence.' },
                { n: '06', icon: '📈', t: 'Growth', d: 'We keep improving with data-driven optimization, A/B testing, and ongoing strategy.' },
              ].map((s, i) => (
                <R key={s.n}>
                  <div className={`process-step ${i % 2 === 0 ? 'left' : 'right'}`}>
                    <div className="ps-number"><span>{s.icon}</span></div>
                    <div className="ps-connector" />
                    <div className="ps-card">
                      <div className="ps-step-badge">{s.n}</div>
                      <h3>{s.t}</h3>
                      <p>{s.d}</p>
                    </div>
                  </div>
                </R>
              ))}
              <div className="process-line" />
            </div>
          </div>
        </section>

        {/* Packages removed. Pricing is specific to each service page. */}

        {/* ═══ STATS + TESTIMONIALS ═══ */}
        <section className="social-proof section-pad">
          <div className="container">
            {/* Stats Row */}
            <R>
              <div className="stats-row">
                <div className="stat-item">
                  <strong ref={c1}>0</strong>
                  <span>Projects<br/>Completed</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <strong ref={c2}>0</strong>
                  <span>Happy<br/>Clients</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <strong ref={c3}>0</strong>
                  <span>Client<br/>Satisfaction</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <strong ref={c4}>0</strong>
                  <span>Countries<br/>Served</span>
                </div>
              </div>
            </R>

            {/* Testimonials */}
            <R className="testimonials-section">
              <div className="testimonials-header">
                <div>
                  <p className="eyebrow">Client Reviews</p>
                  <h2>What Our Clients <span>Say</span></h2>
                </div>
                <div className="testimonial-controls">
                  <button onClick={() => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial">←</button>
                  <span>{testimonialIdx + 1} / {testimonials.length}</span>
                  <button onClick={() => setTestimonialIdx(i => (i + 1) % testimonials.length)} aria-label="Next testimonial">→</button>
                </div>
              </div>
              <div className="testimonials-slider">
                {testimonials.map((t, i) => (
                  <article key={i} className={`testimonial-card${i === testimonialIdx ? ' active' : ''}`}>
                    <div className="tc-rating">
                      <span className="tc-stars">{t.stars}</span>
                      <span className="tc-score">5.0</span>
                    </div>
                    <p className="tc-text">{t.text}</p>
                    <div className="tc-author">
                      <div className="tc-avatar">{t.ini}</div>
                      <div className="tc-info">
                        <strong>{t.name}</strong>
                        <span>{t.role}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="testimonials-dots">
                {testimonials.map((_, i) => (
                  <button key={i} className={i === testimonialIdx ? 'active' : ''} onClick={() => setTestimonialIdx(i)} aria-label={`Show testimonial ${i + 1}`} aria-current={i === testimonialIdx ? 'true' : undefined} />
                ))}
              </div>
            </R>
          </div>
        </section>

        {/* MEET THE FOUNDER: PREMIUM WITH PHOTO */}
        <section className="founder-section" id="team">
          <div className="founder-bg">
            <div className="founder-glow" />
            <div className="founder-glow-2" />
          </div>
          <div className="container">
            <R className="center-head">
              <p className="eyebrow">The person behind AEMTECH</p>
              <h2>Meet the <span>Founder</span></h2>
            </R>
            <div className="founder-layout">
              {/* LEFT: Photo */}
              <R>
                <div className="founder-photo-side">
                  <div className="fp-frame">
                    <div className="fp-corner fp-tl" />
                    <div className="fp-corner fp-br" />
                    <img 
                      src="/images/founder.webp" 
                      alt="Fawaz Faisal, Founder and Creative Director at AEMTECH" 
                      className="fp-image"
                      loading="lazy"
                      onError={event => {
                        const image = event.currentTarget;
                        if (image.dataset.fallback) return;
                        image.dataset.fallback = 'true';
                        image.src = '/images/founder.jpg';
                      }}
                    />
                    <div className="fp-overlay" />
                  </div>
                  {/* Floating Badge */}
                  <div className="fp-badge">
                    <span className="fp-badge-dot" />
                    Available for Projects
                  </div>
                  {/* Experience Badge */}
                  <div className="fp-exp-badge">
                    <strong>3+</strong>
                    <span>Years<br/>Experience</span>
                  </div>
                </div>
              </R>

              {/* RIGHT: Content */}
              <R>
                <div className="founder-content">
                  <div className="fc-name-tag">
                    <p className="eyebrow" style={{ marginBottom: 8 }}>Founder & Creative Director</p>
                    <h3>Fawaz Faisal</h3>
                    <div className="fc-location">📍 Karachi, Pakistan</div>
                  </div>
                  
                  <div className="fc-quote">
                    <span className="fc-quote-mark">"</span>
                    <p>I believe every business deserves a premium digital presence, not only established brands. AEMTECH makes that quality accessible without compromising the work.</p>
                  </div>

                  <div className="fc-story">
                    <p>AEMTECH started as AEMTECH Institute, where I taught digital skills. That experience showed me how many businesses struggle to present and market themselves effectively, so I built the agency to solve that problem.</p>
                    <p>I lead every project personally from strategy through final delivery. Your project receives direct attention and clear creative direction.</p>
                  </div>

                  {/* Values Grid */}
                  <div className="fc-values-mini">
                    {[
                      { icon: '♕', title: 'Premium Only' },
                      { icon: '⚡', title: 'Direct Access' },
                      { icon: '↗', title: 'Growth Focus' },
                      { icon: '✦', title: 'Long-Term' },
                    ].map(v => (
                      <div key={v.title} className="fcv-item">
                        <span>{v.icon}</span>
                        <strong>{v.title}</strong>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="fc-actions-new">
                    <a className="btn btn-gold" href="/contact" onClick={e => { e.preventDefault(); goTo('contact'); }}>Work With Me <span>→</span></a>
                    <a className="btn btn-outline" href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer">WhatsApp <span>💬</span></a>
                  </div>

                  {/* Social Proof */}
                  <div className="fc-proof">
                    <div className="fcp-stars">★★★★★ <span>5.0 Rating</span></div>
                    <div className="fcp-clients">10+ Projects Delivered</div>
                  </div>
                </div>
              </R>
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="faq section-pad">
          <div className="container narrow">
            <R className="center-head"><p className="eyebrow">FAQ</p><h2>Questions Before We Start?</h2></R>
            <R>
              <div className="accordion">
                {[
                  { q: 'Do you work with international clients?', a: 'Yes. AEMTECH works with Pakistani and international brands across consumer, ecommerce, professional service, and B2B markets.' },
                  { q: 'Can you manage both creative and marketing?', a: 'Yes. We can develop the brand direction, create campaign visuals and content, manage social channels, and build the digital experience as one connected system.' },
                  { q: 'Do you provide complete branding?', a: 'Yes. We create logos, visual identity systems, brand guidelines, messaging direction, social templates, campaign assets, and digital applications.' },
                  { q: 'How fast can we launch?', a: 'Branding and campaign timelines depend on scope and revision rounds. Smaller creative projects can move quickly, while full brand, marketing, and web engagements follow a phased roadmap.' },
                  { q: 'What is your payment process?', a: '50% upfront to start, 50% on completion. For larger projects, we offer milestone-based payments. We accept bank transfer, JazzCash, Easypaisa, PayPal, and Wise.' },
                  { q: 'Do you offer ongoing support after launch?', a: 'Yes. Every project includes post-launch support. We also offer monthly retainer packages for continuous optimization, updates, and growth strategy.' },
                  { q: 'What makes your pricing worth it?', a: 'We combine strategy, original creative work, marketing thinking, and technical execution. You are investing in a consistent brand system rather than disconnected deliverables.' },
                ].map((f, i) => (
                  <button key={i} className={`accordion-item${activeFaq === i ? ' active' : ''}`} onClick={() => setActiveFaq(activeFaq === i ? -1 : i)} aria-expanded={activeFaq === i} aria-controls={`home-faq-answer-${i}`}>
                    <span className="q">{f.q}</span><em>{activeFaq === i ? '−' : '+'}</em>
                    <p className="answer" id={`home-faq-answer-${i}`}>{f.a}</p>
                  </button>
                ))}
              </div>
            </R>
          </div>
        </section>

        {/* ═══ HOW TO START ═══ */}
        <section className="section-pad" style={{ borderTop: '1px solid var(--line-soft)', background: 'var(--ink)' }}>
          <div className="container">
            <R className="center-head">
              <p className="eyebrow">Getting started</p>
              <h2>Start Your Project in <span>3 Simple Steps</span></h2>
              <p>No long forms. No complicated processes. Just a quick conversation.</p>
            </R>
            <div className="timeline" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <R><article><span>01</span><h3>Book a Free Call</h3><p>15-minute discovery call. We discuss your brand, goals, and timeline. Zero pressure.</p></article></R>
              <R><article><span>02</span><h3>Get Your Proposal</h3><p>Within 48 hours, you receive a clear plan with scope, timeline, and investment details.</p></article></R>
              <R><article><span>03</span><h3>We Build & Launch</h3><p>We design, you review, we refine. Regular updates until your project goes live.</p></article></R>
            </div>
            <R>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 42, flexWrap: 'wrap' }}>
                {['🛡️ NDA Protected', '💬 Direct Communication', '⚡ Same Day Reply', '✓ On-Time Delivery'].map(b =>
                  <span key={b} style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{b}</span>
                )}
              </div>
            </R>
          </div>
        </section>

        {/* FINAL CTA: PREMIUM */}
        <section className="final-cta-premium">
          <div className="fcp-bg">
            <div className="fcp-gradient" />
            <div className="fcp-grid" />
            <div className="fcp-orbs">
              <div className="fcp-orb fcp-orb-1" />
              <div className="fcp-orb fcp-orb-2" />
            </div>
          </div>
          <R className="container fcp-content">
            <p className="eyebrow">Ready for premium growth?</p>
            <h2>Let's Build Something <span className="text-gradient">Amazing</span> Together</h2>
            <p>Turn your ideas into a distinctive brand, compelling creative, and a marketing system built to grow.</p>
            <div className="fcp-actions">
              <a className="btn btn-gold btn-glow" href="/contact" onClick={e => { e.preventDefault(); goTo('contact'); }}>Start Your Project <span>→</span></a>
              <a className="btn btn-outline" href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer">WhatsApp Chat <span>💬</span></a>
            </div>
            <div className="fcp-trust">
              <span>🛡️ NDA Protected</span>
              <span>⚡ Same Day Reply</span>
              <span>💯 Clear Scope</span>
            </div>
          </R>
        </section>

        {/* CONTACT: PREMIUM */}
        <section className="contact-section" id="contact">
          {/* Background Effects */}
          <div className="cs-bg" aria-hidden="true">
            <div className="cs-glow" />
            <div className="cs-glow-2" />
            <div className="cs-grid" />
          </div>

          <div className="container">
            {/* Section Header */}
            <R className="center-head">
              <p className="eyebrow">Get in touch</p>
              <h2>Let's Start Your <span>Project</span></h2>
              <p>Send us a message, email, or chat on WhatsApp. We respond within 24 hours and often much sooner.</p>
            </R>

            <div className="cs-layout">
              {/* LEFT: Contact Info Cards */}
              <R>
                <div className="cs-info">
                  {/* Quick Contact Cards */}
                  <div className="cs-cards">
                    <a href="mailto:aemtechofficial@gmail.com" className="cs-card">
                      <div className="cs-card-icon">✉</div>
                      <div className="cs-card-body">
                        <small>Email Us</small>
                        <strong>aemtechofficial@gmail.com</strong>
                      </div>
                      <span className="cs-card-arrow">→</span>
                    </a>
                    <a href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer" className="cs-card cs-card-wa">
                      <div className="cs-card-icon">💬</div>
                      <div className="cs-card-body">
                        <small>WhatsApp (Fastest)</small>
                        <strong>0331-0009519</strong>
                      </div>
                      <span className="cs-card-arrow">→</span>
                    </a>
                    <a href="tel:+923310009519" className="cs-card">
                      <div className="cs-card-icon">📞</div>
                      <div className="cs-card-body">
                        <small>Call Us</small>
                        <strong>0331-0009519</strong>
                      </div>
                      <span className="cs-card-arrow">→</span>
                    </a>
                    <div className="cs-card">
                      <div className="cs-card-icon">📍</div>
                      <div className="cs-card-body">
                        <small>Location</small>
                        <strong>Karachi, Pakistan</strong>
                      </div>
                    </div>
                  </div>

                  {/* Availability Badge */}
                  <div className="cs-available">
                    <div className="cs-avail-dot" />
                    <div>
                      <strong>Currently Available</strong>
                      <span>Accepting new creative and marketing projects</span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="cs-trust-badges">
                    <div><span>🛡️</span> NDA Protected</div>
                    <div><span>⚡</span> Same Day Reply</div>
                    <div><span>💯</span> Free Consultation</div>
                    <div><span>🎯</span> Custom Proposal</div>
                  </div>
                </div>
              </R>

              {/* RIGHT: Contact Form */}
              <R>
                <div className="cs-form-wrap">
                  <div className="cs-form-header">
                    <h3>Send us a message</h3>
                    <p>Fill out the form below and we'll get back to you within 24 hours.</p>
                  </div>
                  <form className="cs-form" onSubmit={async e => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    setFormSending(true);
                    setFormError(false);
                    try {
                      const formData = new FormData(form);
                      formData.append('access_key', '177ca1fb-b6d4-42f2-a8cb-7bd817aae68b');
                      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
                      const data = await res.json();
                      if (data.success) { setFormSent(true); form.reset(); }
                      else { setFormError(true); }
                    } catch { setFormError(true); }
                    finally { setFormSending(false); }
                  }}>
                    <input type="hidden" name="subject" value="New Project Inquiry | AEMTECH Website" />
                    <input className="form-botcheck" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                    <div className="cs-form-row">
                      <div className="cs-field">
                        <label htmlFor="contact-name">Your Name *</label>
                        <input type="text" id="contact-name" name="name" placeholder="e.g. Fawaz Faisal" required aria-label="Your name" autoComplete="name" />
                      </div>
                      <div className="cs-field">
                        <label htmlFor="contact-email">Email Address *</label>
                        <input type="email" id="contact-email" name="email" placeholder="you@company.com" required aria-label="Email address" autoComplete="email" />
                      </div>
                    </div>
                    <div className="cs-form-row">
                      <div className="cs-field">
                        <label htmlFor="contact-project-type">Project Type</label>
                        <input type="text" id="contact-project-type" name="project_type" placeholder="e.g. Brand Identity, Social Media, Campaign" aria-label="Project type" />
                      </div>
                      <div className="cs-field">
                        <label htmlFor="contact-budget">Budget Range</label>
                        <input type="text" id="contact-budget" name="budget" placeholder="e.g. $500 - $2,000" aria-label="Budget range" />
                      </div>
                    </div>
                    <div className="cs-field">
                      <label htmlFor="contact-details">Project Details *</label>
                      <textarea id="contact-details" name="message" placeholder="Tell us about your goals, timeline, and specific requirements..." required aria-label="Project details" />
                    </div>
                    <button className="btn btn-gold btn-glow" type="submit" disabled={formSending} aria-busy={formSending} style={{ width: '100%' }}>
                      {formSending ? 'Sending...' : <>Send Message <span>→</span></>}
                    </button>
                    {formError && <p className="form-error" role="alert">Message could not be sent. Please try again or contact us on WhatsApp.</p>}
                    <p className="cs-form-note">🔒 Your information is secure and will never be shared.</p>
                  </form>
                </div>
              </R>
            </div>
          </div>
        </section>
      </main>}

      {/* FOOTER: PREMIUM */}
      <footer className="footer" role="contentinfo">
        {/* Footer Top Glow */}
        <div className="footer-glow" />
        <div className="container footer-grid">
          <div>
            <a href="/" className="logo footer-logo logo-animated" aria-label="AEMTECH home" onClick={e => { e.preventDefault(); goTo('home'); }}>
              <span style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center' }}>
                <span className="logo-letter" style={{ color: 'var(--white)' }}>A</span>
                <span className="logo-letter" style={{ color: 'var(--white)' }}>E</span>
                <span className="logo-letter" style={{ color: 'var(--white)' }}>M</span>
                <span className="logo-t" style={{ color: 'var(--gold)' }}>T</span>
                <span className="logo-letter" style={{ color: 'var(--white)' }}>E</span>
                <span className="logo-letter" style={{ color: 'var(--white)' }}>C</span>
                <span className="logo-letter" style={{ color: 'var(--white)' }}>H</span>
              </span>
            </a>
            <p>A premium creative and marketing agency helping ambitious brands grow through strategy, identity, content, campaigns, and digital experiences.</p>
            <div className="socials">
              <a href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer" aria-label="AEMTECH on WhatsApp"><span>wa</span></a>
              <a href="mailto:aemtechofficial@gmail.com" aria-label="Email AEMTECH"><span>mail</span></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="AEMTECH on Instagram"><span>ig</span></a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="AEMTECH on LinkedIn"><span>in</span></a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="AEMTECH on Facebook"><span>f</span></a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="AEMTECH on X"><span>x</span></a>
            </div>
          </div>
          <div>
            <h3>Quick Links</h3>
            <a href="/" onClick={e => { e.preventDefault(); goTo('home'); }}>Home</a>
            <a href="/about" onClick={e => { e.preventDefault(); goTo('about'); }}>About Us</a>
            <a href="/services" onClick={e => { e.preventDefault(); goTo('services'); }}>Services</a>
            <a href="/portfolio" onClick={e => { e.preventDefault(); goTo('portfolio'); }}>Portfolio</a>
            <a href="/contact" onClick={e => { e.preventDefault(); goTo('contact'); }}>Contact</a>
          </div>
          <div>
            <h3>Services</h3>
            <a href="/services/brand-identity" onClick={e => { e.preventDefault(); goTo('service-brand-identity'); }}>Brand Identity</a>
            <a href="/services/logo-design" onClick={e => { e.preventDefault(); goTo('service-logo-design'); }}>Logo Design</a>
            <a href="/services/graphic-design" onClick={e => { e.preventDefault(); goTo('service-graphic-design'); }}>Graphic Design</a>
            <a href="/services/social-media-management" onClick={e => { e.preventDefault(); goTo('service-social-media-management'); }}>Social Media</a>
            <a href="/services/digital-marketing" onClick={e => { e.preventDefault(); goTo('service-digital-marketing'); }}>Digital Marketing</a>
            <a href="/services/website-development" onClick={e => { e.preventDefault(); goTo('service-website-development'); }}>Web & Ecommerce</a>
          </div>
          <div>
            <h3>Get In Touch</h3>
            <a href="mailto:aemtechofficial@gmail.com">aemtechofficial@gmail.com</a>
            <a href="tel:+923310009519">0331-0009519</a>
            <a href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer">WhatsApp Chat</a>
            <a href="/contact" onClick={e => { e.preventDefault(); goTo('contact'); }}>Karachi, Pakistan</a>
            <form className="newsletter" onSubmit={async e => {
              e.preventDefault();
              const form = e.currentTarget;
              const button = form.querySelector('button');
              if (button) button.textContent = '...';
              try {
                const data = new FormData(form);
                data.append('access_key', '177ca1fb-b6d4-42f2-a8cb-7bd817aae68b');
                data.append('subject', 'New AEMTECH Newsletter Subscription');
                const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
                const result = await response.json();
                if (button) button.textContent = result.success ? '✓' : '!';
                if (result.success) form.reset();
              } catch {
                if (button) button.textContent = '!';
              }
              setTimeout(() => { if (button) button.textContent = '→'; }, 2500);
            }}>
              <input type="email" name="email" placeholder="Email for updates" required aria-label="Email for newsletter" autoComplete="email" />
              <button type="submit" aria-label="Subscribe to AEMTECH newsletter">→</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AEMTECH. All Rights Reserved.</span>
          <span>Crafted with ♥ by AEMTECH</span>
        </div>
      </footer>

      {/* ═══ WHATSAPP FLOAT ═══ */}
      <a href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Chat on WhatsApp">
        <span className="wa-icon">💬</span>
        <span>Chat with us</span>
        <span className="wa-pulse" />
      </a>

      {/* ═══ SUCCESS POPUP ═══ */}
      {formSent && (
        <div className="popup-overlay" onClick={() => setFormSent(false)}>
          <div className="popup-box" role="dialog" aria-modal="true" aria-labelledby="success-popup-title" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setFormSent(false)} aria-label="Close success message">✕</button>
            <div className="popup-check" />
            <h3 className="popup-title" id="success-popup-title">Message Sent!</h3>
            <p className="popup-desc">
              Thank you for reaching out. We'll get back to you within <strong style={{ color: '#fff' }}>24 hours</strong> and often much faster.
              <br /><br />
              In the meantime, feel free to <a href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', fontWeight: 700 }}>chat on WhatsApp</a> for a quicker response.
            </p>
            <button className="btn btn-gold popup-btn" onClick={() => setFormSent(false)}>Got It <span>✓</span></button>
          </div>
        </div>
      )}

      {/* ═══ SCROLL TO TOP WITH PROGRESS ═══ */}
      <button
        className={`scroll-top-premium${showScrollTop ? ' show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <svg className="stp-ring" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(245,197,66,0.15)" strokeWidth="2" />
          <circle cx="22" cy="22" r="20" fill="none" stroke="var(--gold)" strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset .1s', transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
        </svg>
        <span className="stp-arrow">↑</span>
      </button>

      {/* ═══ VERCEL SPEED INSIGHTS ═══ */}
      <SpeedInsights />
    </>
  );
}
