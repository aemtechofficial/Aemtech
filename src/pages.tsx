/* ═══════════════════════════════════════
   INNER PAGES: Services, Portfolio, About, Blog, Contact, Single Service
   ═══════════════════════════════════════ */
import { useState, useEffect, useRef } from 'react';
import { allServices } from './serviceData';
import { allCaseStudies } from './caseStudyData';

function useAnimatedNumber(target: number, decimals: number, inView: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    const duration = 900;
    const startedAt = performance.now();
    let frame = 0;
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return value.toFixed(decimals);
}

function parseServiceResult(result: string) {
  const [headline, ...labelParts] = result.trim().split(/\s+/);
  const numeric = headline.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!numeric) {
    return { headline, label: labelParts.join(' '), target: 0, decimals: 0, prefix: '', suffix: '', isNumeric: false };
  }

  const numericValue = numeric[2];
  return {
    headline,
    label: labelParts.join(' '),
    target: Number(numericValue),
    decimals: numericValue.includes('.') ? numericValue.split('.')[1].length : 0,
    prefix: numeric[1],
    suffix: numeric[3],
    isNumeric: true,
  };
}

function ServiceResultStat({ result, inView }: { result: string; inView: boolean }) {
  const parsed = parseServiceResult(result);
  const animatedValue = useAnimatedNumber(parsed.target, parsed.decimals, inView);
  const headline = parsed.isNumeric ? `${parsed.prefix}${animatedValue}${parsed.suffix}` : parsed.headline;

  return (
    <div className="animated-stat">
      <strong aria-label={parsed.headline}>{headline}</strong>
      <span>{parsed.label}</span>
    </div>
  );
}

export interface PageProps {
  goTo: (page: string) => void;
}

function R({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal visible ${className}`}>{children}</div>;
}

function PageHero({ eyebrow, title, desc, goTo, breadcrumb }: { eyebrow: string; title: React.ReactNode; desc: string; goTo: (p: string) => void; breadcrumb?: string }) {
  return (
    <section className="cs-cinematic-hero">
      <div className="cch-bg">
        <div className="cch-gradient" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(245,197,66,0.12) 0%, transparent 60%)' }} />
        <div className="cch-grid" />
        <div className="cch-orb cch-orb-1" style={{ background: 'var(--gold)' }} />
        <div className="cch-orb cch-orb-2" style={{ background: '#1a3a5c' }} />
      </div>
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="page-hero-breadcrumb">
          <a href="/" onClick={e => { e.preventDefault(); goTo('home'); }}>Home</a>
          <span>›</span>
          <span style={{ color: 'var(--gold)' }}>{breadcrumb || eyebrow}</span>
        </div>
        <div className="cch-content">
          <div className="cch-category">{eyebrow}</div>
          <h1 className="cch-title">{title}</h1>
          <p className="cch-tagline">{desc}</p>
        </div>
      </div>
    </section>
  );
}

/* ═══ SERVICES PAGE ═══ */
export function ServicesPage({ goTo }: PageProps) {
  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover:none)').matches) {
      e.currentTarget.classList.toggle('flipped');
    }
  };

  return (
    <main>
      <PageHero goTo={goTo} eyebrow="Services" title={<>Strategy, creative, and marketing designed to make brands <span>matter.</span></>} desc="From brand identity and campaign design to social media, digital marketing, websites, and ecommerce, AEMTECH connects every touchpoint with one clear direction." />
      {/* Stats Impact */}
      <div className="cs-impact-bar">
        <div className="container">
          <div className="cib-grid">
            {[{ v: '12+', l: 'Services' }, { v: '100%', l: 'Custom Work' }, { v: '12hr', l: 'Avg Reply' }, { v: '5.0', l: 'Rating' }].map(s => (
              <div key={s.l} className="cib-item"><strong style={{ color: 'var(--gold)' }}>{s.v}</strong><span>{s.l}</span></div>
            ))}
          </div>
        </div>
      </div>

      <section className="services section-pad"><div className="container">
        <R className="center-head">
          <p className="eyebrow">All Services</p>
          <h2>Hover to explore. Click to <span>learn more.</span></h2>
        </R>
        <div className="flip-grid">
          {allServices.map((s, i) => (
            <R key={i}>
              <div className="flip-wrap" onClick={handleTap}>
                <div className="flip-inner">
                  <div className="flip-front">
                    <span className="icon">{s.icon}</span>
                    <h3>{s.title}</h3>
                    <p>{s.short}</p>
                    <div className="flip-hint"><span>↻</span> Hover to see details</div>
                  </div>
                  <div className="flip-back">
                    <h3>{s.icon} {s.title}</h3>
                    <ul>
                      {s.features.slice(0, 8).map(f => <li key={f}>{f}</li>)}
                    </ul>
                    <a href={`/services/${s.slug}`} className="flip-cta" onClick={e => { e.preventDefault(); e.stopPropagation(); goTo(`service-${s.slug}`); }}>View Full Details →</a>
                  </div>
                </div>
              </div>
            </R>
          ))}
        </div>
      </div></section>

      {/* Premium CTA */}
      <section className="final-cta-premium">
        <div className="fcp-bg"><div className="fcp-gradient" /><div className="fcp-grid" /></div>
        <div className="container fcp-content reveal visible">
          <p className="eyebrow">Need a custom solution?</p>
          <h2>Let's Talk About Your <span>Project</span></h2>
          <p>Every brand is different. Tell us your goals and we'll create a custom plan.</p>
          <div className="fcp-actions">
            <button className="btn btn-gold btn-glow" onClick={() => goTo('contact')}>Get In Touch <span>→</span></button>
            <a className="btn btn-outline" href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer">WhatsApp <span>💬</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* PORTFOLIO PAGE: PREMIUM */
export function PortfolioPage({ goTo }: PageProps) {
  const [filter, setFilter] = useState('All');
  const projects = [
    { cat: 'Website', name: 'ZABS International', sub: 'Textile Recycling, Houston, TX, USA', stat: '90+', statLabel: 'Lighthouse', desc: 'Complete website redesign for a USA-based textile recycling company. The work included 15+ sections, React and Vite development, technical SEO, and accessibility.', color: '#43d17b', caseStudy: 'zabs-international', badge: 'International' },
    { cat: 'Branding', name: 'MS Stationery', sub: 'Stationery & Office Supplies', stat: '4', statLabel: 'Creative Stages', desc: 'Complete brand strategy, visual identity, logo system, and ecommerce experience for a premium stationery brand.', color: '#f5c542', caseStudy: 'ms-stationery', badge: '' },
    { cat: 'Ecommerce', name: 'Glamouria', sub: 'Fashion & Apparel', stat: '+120%', statLabel: 'Sales Growth', desc: 'Brand-led ecommerce experience with premium product storytelling, lookbook sections, and optimized mobile checkout.', color: '#6b8afd', caseStudy: 'glamouria', badge: '' },
    { cat: 'Website', name: 'TechNova', sub: 'IT Solutions', stat: '+64%', statLabel: 'Lead Quality', desc: 'Modern corporate website with service pages, case studies, and lead capture system.', color: '#ff6b9d', caseStudy: '', badge: '' },
    { cat: 'Branding', name: 'PureGlow', sub: 'Skincare', stat: '+85%', statLabel: 'Conversion', desc: 'A complete identity and brand-led ecommerce experience with guided product discovery.', color: '#a78bfa', caseStudy: '', badge: '' },
    { cat: 'Growth', name: 'FitFuel', sub: 'Fitness Supplements', stat: '+200%', statLabel: 'Revenue', desc: 'Performance-focused growth system with subscription model and email marketing.', color: '#f97316', caseStudy: '', badge: '' },
  ];
  const categories = ['All', ...new Set(projects.map(p => p.cat))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.cat === filter);

  return (
    <main>
      <PageHero goTo={goTo} eyebrow="Portfolio" title={<>Brands, campaigns, and digital experiences built for meaningful <span>growth.</span></>} desc="Selected creative and marketing work across identity, content, websites, ecommerce, and international brand transformation." />
      
      {/* Stats Bar */}
      <div className="trust-strip" style={{ background: 'var(--ink)' }}>
        <div className="container">
          <div className="trust-strip-inner">
            {['10+ Projects Delivered', '100% Client Satisfaction', 'Pakistan & International', '5.0 Average Rating'].map(t => <div key={t}>{t}</div>)}
          </div>
        </div>
      </div>

      <section className="section-pad"><div className="container">
        {/* Filter Tabs */}
        <R>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40, justifyContent: 'center' }}>
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} aria-pressed={filter === c} style={{
                padding: '10px 22px', borderRadius: 999, border: `1px solid ${filter === c ? 'var(--gold)' : 'var(--line-soft)'}`,
                background: filter === c ? 'rgba(245,197,66,0.12)' : 'rgba(255,255,255,0.03)', color: filter === c ? 'var(--gold)' : 'var(--muted)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all .2s'
              }}>{c}</button>
            ))}
          </div>
        </R>

        {/* Project Grid */}
        <div className="portfolio-grid-premium">
          {filtered.map((p, i) => (
            <R key={p.name + i}>
              <article className="portfolio-card-premium">
                <div className="pcp-image">
                  <span className="pcp-letter" style={{ color: p.color }}>{p.name[0]}</span>
                  {p.badge && <div className="pcp-project-badge">{p.badge}</div>}
                  <div className="pcp-overlay">
                    {p.caseStudy ? (
                      <a className="btn btn-gold" href={`/case-studies/${p.caseStudy}`} onClick={e => { e.preventDefault(); goTo(`case-${p.caseStudy}`); }} style={{ fontSize: 12 }}>View Case Study <span>→</span></a>
                    ) : (
                      <a className="btn btn-gold" href="/contact" onClick={e => { e.preventDefault(); goTo('contact'); }} style={{ fontSize: 12 }}>Get Similar <span>→</span></a>
                    )}
                  </div>
                </div>
                <div className="pcp-content">
                  <div className="pcp-cat">{p.cat}</div>
                  <h3>{p.name}</h3>
                  <p>{p.sub}</p>
                  <p style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</p>
                  <div className="pcp-stat">
                    <strong style={{ color: p.color }}>{p.stat}</strong>
                    <span>{p.statLabel}</span>
                  </div>
                </div>
              </article>
            </R>
          ))}
        </div>
      </div></section>

      {/* CTA */}
      <section className="final-cta-premium">
        <div className="fcp-bg"><div className="fcp-gradient" /><div className="fcp-grid" /></div>
        <div className="container fcp-content reveal visible">
          <p className="eyebrow">Like what you see?</p>
          <h2>Let's Build Something <span>Premium</span> Together</h2>
          <p>Your brand deserves the same level of design, strategy, and attention to detail.</p>
          <div className="fcp-actions">
            <button className="btn btn-gold btn-glow" onClick={() => goTo('contact')}>Start Your Project <span>→</span></button>
            <a className="btn btn-outline" href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer">WhatsApp <span>💬</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ABOUT PAGE: PREMIUM */
export function AboutPage({ goTo }: PageProps) {
  return (
    <main>
      <PageHero goTo={goTo} eyebrow="About AEMTECH" breadcrumb="About" title={<>A creative and marketing partner for brands ready to look <span>serious.</span></>} desc="We combine brand strategy, visual identity, content, campaigns, and digital execution to help Pakistani and international businesses compete with confidence." />

      {/* Impact Bar */}
      <div className="cs-impact-bar">
        <div className="container">
          <div className="cib-grid">
            {[{ v: '10+', l: 'Projects' }, { v: '100%', l: 'Satisfaction' }, { v: '2+', l: 'Countries' }, { v: '5.0', l: 'Rating' }].map(s => (
              <div key={s.l} className="cib-item"><strong style={{ color: 'var(--gold)' }}>{s.v}</strong><span>{s.l}</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission: Story Block Style */}
      <section className="section-pad"><div className="container" style={{ maxWidth: 900 }}>
        <R><div className="cs-story-block">
          <div className="csb-icon">🎯</div>
          <p className="eyebrow">Our Mission</p>
          <h2>Design should feel beautiful and <span>perform hard.</span></h2>
          <p className="csb-text">AEMTECH is built for founders who want more than disconnected design or generic marketing. Every identity, campaign, piece of content, and digital experience is shaped around clarity, attention, trust, and growth. Today, we support Pakistani and international brands with one connected creative and marketing direction.</p>
        </div></R>
      </div></section>

      {/* Values: Dramatic Cards */}
      <section className="cs-drama-section"><div className="container">
        <R className="center-head">
          <p className="eyebrow">Our Values</p>
          <h2>What Drives <span>Everything</span> We Do</h2>
        </R>
        <div className="about-values-grid">
          {[
            { icon: '♕', n: '01', title: 'Premium Only', desc: 'We focus on considered, original work. No shortcuts, recycled templates, or careless execution.' },
            { icon: '⚡', n: '02', title: 'Speed Matters', desc: 'Fast websites, fast communication, fast delivery. We respect your time because we value ours.' },
            { icon: '↗', n: '03', title: 'Growth Intent', desc: 'Every design decision is made to increase conversions, build trust, and drive revenue for your business.' },
            { icon: '✦', n: '04', title: 'Long-Term Partner', desc: 'We build partnerships, not one-off transactions. Your continued success is our reputation.' },
            { icon: '◇', n: '05', title: 'Transparent Process', desc: 'No hidden fees, no vague timelines. You know exactly what you\'re getting, when, and at what cost.' },
            { icon: '🎯', n: '06', title: 'Results First', desc: 'Strong aesthetics matter, but the work must also support attention, trust, conversion, and growth.' },
          ].map(v => (
            <R key={v.title}>
              <div className="cds-card cds-solution" style={{ marginBottom: 0 }}>
                <div className="cds-stripe" style={{ background: 'var(--gold)' }} />
                <div className="cds-number">{v.n}</div>
                <div className="cds-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            </R>
          ))}
        </div>
      </div></section>

      {/* Journey Timeline */}
      <section className="section-pad"><div className="container">
        <R className="center-head"><p className="eyebrow">Our journey</p><h2>From Teaching to <span>Building</span></h2><p>How AEMTECH evolved from a digital skills institute to a premium agency.</p></R>
        <div className="about-timeline">
          {[
            { year: '2021', icon: '📚', title: 'AEMTECH Institute', desc: 'Started as a digital skills training institute in Karachi, teaching web development, design, and digital marketing.' },
            { year: '2022', icon: '🚀', title: 'Agency Launch', desc: 'Transitioned into a creative agency delivering brand identity, campaign design, websites, and ecommerce experiences.' },
            { year: '2023', icon: '🌍', title: 'International Reach', desc: 'Expanded to support clients in UAE, UK, and US markets with premium creative and digital work.' },
            { year: '2024', icon: '📈', title: 'Marketing Expansion', desc: 'Added social media, content systems, digital campaigns, and growth-focused marketing services.' },
            { year: '2025', icon: '💎', title: 'Creative + Marketing', desc: 'Unified strategy, branding, content, marketing, and technology into one premium agency model.' },
          ].map((s, i) => (
            <R key={s.year}>
              <div className={`at-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="at-marker"><span>{s.icon}</span></div>
                <div className="at-card">
                  <div className="at-year">{s.year}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            </R>
          ))}
          <div className="at-line" />
        </div>
      </div></section>

      {/* AEMTECH vs Others: Before/After Style */}
      <section className="section-pad"><div className="container" style={{ maxWidth: 900 }}>
        <R className="center-head">
          <p className="eyebrow">The AEMTECH Difference</p>
          <h2>Why Clients Choose <span>Us</span></h2>
        </R>
        <R><div className="cs-ba-grid">
          <div className="cs-ba-card cs-ba-before">
            <div className="cs-ba-label">✗ OTHER AGENCIES</div>
            <h4>The Usual Experience</h4>
            {['Generic templates & themes', 'Account manager middleman', '2-3 revision limit', 'Post-launch? Extra charge', '3-5 days response time', 'Source files? Pay extra'].map(item => (
              <div key={item} className="cs-ba-item bad"><span>✗</span>{item}</div>
            ))}
          </div>
          <div className="cs-ba-vs">VS</div>
          <div className="cs-ba-card cs-ba-after">
            <div className="cs-ba-label">✓ AEMTECH</div>
            <h4>The Premium Standard</h4>
            {['100% custom design always', 'Direct founder communication', 'Defined revision stages', 'Post-launch support options', 'Under 24hr response', 'Source files defined in scope'].map(item => (
              <div key={item} className="cs-ba-item good"><span>✓</span>{item}</div>
            ))}
          </div>
        </div></R>
      </div></section>

      {/* CTA */}
      <section className="final-cta-premium">
        <div className="fcp-bg"><div className="fcp-gradient" /><div className="fcp-grid" /></div>
        <div className="container fcp-content reveal visible">
          <p className="eyebrow">Ready to work together?</p>
          <h2>Let's Build Something <span>Remarkable</span></h2>
          <p>Your brand deserves a partner who cares about results as much as aesthetics.</p>
          <div className="fcp-actions">
            <button className="btn btn-gold btn-glow" onClick={() => goTo('contact')}>Start Your Project <span>→</span></button>
            <a className="btn btn-outline" href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer">WhatsApp <span>💬</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* BLOG PAGE: PREMIUM */
export function BlogPage({ goTo }: PageProps) {
  return (
    <main>
      <PageHero goTo={goTo} eyebrow="Blog" title={<>Creative thinking and marketing ideas for ambitious <span>brands.</span></>} desc="Insights on branding, campaign strategy, graphic design, social media, performance marketing, websites, and ecommerce." />
      <section className="section-pad"><div className="container" style={{ maxWidth: 700 }}>
        <R><div className="cs-story-block">
          <div className="csb-icon" style={{ fontSize: 56 }}>📝</div>
          <h2>Coming <span>Soon</span></h2>
          <p className="csb-text">We're preparing practical articles on brand strategy, visual identity, content, social media, digital campaigns, web design, and ecommerce. Real insights from real projects.</p>
          <div className="csb-services">
            {['Brand Strategy', 'Creative Direction', 'Social Media', 'Marketing Insights', 'Case Studies'].map(t => <span key={t}>{t}</span>)}
          </div>
          <div style={{ marginTop: 28 }}>
            <button className="btn btn-gold btn-glow" onClick={() => goTo('contact')}>Get Notified When We Launch <span>→</span></button>
          </div>
        </div></R>
      </div></section>
    </main>
  );
}

/* CONTACT PAGE: PREMIUM (Same as homepage contact) */
export function ContactPage({ goTo }: PageProps) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState(false);

  return (
    <main>
      <PageHero goTo={goTo} eyebrow="Contact" title={<>Let's start your <span>project.</span></>} desc="Send us a message, email, or chat on WhatsApp. We respond within 24 hours and often much sooner." />

      <section className="contact-section">
        <div className="cs-bg" aria-hidden="true">
          <div className="cs-glow" />
          <div className="cs-glow-2" />
          <div className="cs-grid" />
        </div>
        <div className="container">
          <div className="cs-layout">
            {/* Contact Info */}
            <R>
              <div className="cs-info">
                <div className="cs-cards">
                  <a href="mailto:aemtechofficial@gmail.com" className="cs-card">
                    <div className="cs-card-icon">✉</div>
                    <div className="cs-card-body"><small>Email Us</small><strong>aemtechofficial@gmail.com</strong></div>
                    <span className="cs-card-arrow">→</span>
                  </a>
                  <a href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer" className="cs-card cs-card-wa">
                    <div className="cs-card-icon">💬</div>
                    <div className="cs-card-body"><small>WhatsApp (Fastest)</small><strong>0331-0009519</strong></div>
                    <span className="cs-card-arrow">→</span>
                  </a>
                  <a href="tel:+923310009519" className="cs-card">
                    <div className="cs-card-icon">📞</div>
                    <div className="cs-card-body"><small>Call Us</small><strong>0331-0009519</strong></div>
                    <span className="cs-card-arrow">→</span>
                  </a>
                  <div className="cs-card">
                    <div className="cs-card-icon">📍</div>
                    <div className="cs-card-body"><small>Location</small><strong>Karachi, Pakistan</strong></div>
                  </div>
                </div>
                <div className="cs-available">
                  <div className="cs-avail-dot" />
                  <div><strong>Currently Available</strong><span>Accepting new projects</span></div>
                </div>
                <div className="cs-trust-badges">
                  <div><span>🛡️</span> NDA Protected</div>
                  <div><span>⚡</span> Same Day Reply</div>
                  <div><span>💯</span> Free Consultation</div>
                  <div><span>🎯</span> Custom Proposal</div>
                </div>
              </div>
            </R>
            {/* Form */}
            <R>
              {sent ? (
                <div className="cs-form-wrap" style={{ textAlign: 'center', padding: 48 }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>✓</div>
                  <h3 style={{ fontSize: 22 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--muted)', marginTop: 12, lineHeight: 1.7 }}>We'll get back to you within <strong style={{ color: '#fff' }}>24 hours</strong>.</p>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 24 }}>
                    <button className="btn btn-outline" onClick={() => setSent(false)}>Send Another <span>→</span></button>
                    <a className="btn btn-gold" href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer">WhatsApp <span>💬</span></a>
                  </div>
                </div>
              ) : (
                <div className="cs-form-wrap">
                  <div className="cs-form-header"><h3>Send us a message</h3><p>Fill out the form and we'll get back to you within 24 hours.</p></div>
                  <form className="cs-form" onSubmit={async e => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    setSending(true);
                    setFormError(false);
                    try {
                      const formData = new FormData(form);
                      formData.append('access_key', '177ca1fb-b6d4-42f2-a8cb-7bd817aae68b');
                      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
                      const data = await res.json();
                      if (data.success) { setSent(true); form.reset(); }
                      else { setFormError(true); }
                    } catch { setFormError(true); }
                    finally { setSending(false); }
                  }}>
                    <input type="hidden" name="subject" value="New Project Inquiry | AEMTECH Website" />
                    <input className="form-botcheck" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                    <div className="cs-form-row">
                      <div className="cs-field"><label htmlFor="page-contact-name">Your Name *</label><input id="page-contact-name" type="text" name="name" placeholder="e.g. Fawaz Faisal" autoComplete="name" required /></div>
                      <div className="cs-field"><label htmlFor="page-contact-email">Email Address *</label><input id="page-contact-email" type="email" name="email" placeholder="you@company.com" autoComplete="email" required /></div>
                    </div>
                    <div className="cs-form-row">
                      <div className="cs-field"><label htmlFor="page-project-type">Project Type</label><input id="page-project-type" type="text" name="project_type" placeholder="e.g. Branding, Social Media, Campaign" /></div>
                      <div className="cs-field"><label htmlFor="page-project-budget">Budget Range</label><input id="page-project-budget" type="text" name="budget" placeholder="e.g. $500 - $2,000" /></div>
                    </div>
                    <div className="cs-field"><label htmlFor="page-project-details">Project Details *</label><textarea id="page-project-details" name="message" placeholder="Tell us about your goals, timeline, and specific requirements..." required /></div>
                    <button className="btn btn-gold btn-glow" type="submit" disabled={sending} aria-busy={sending} style={{ width: '100%' }}>
                      {sending ? 'Sending...' : <>Send Message <span>→</span></>}
                    </button>
                    {formError && <p className="form-error" role="alert">Message could not be sent. Please try again or contact us on WhatsApp.</p>}
                    <p className="cs-form-note">🔒 Your information is secure and will never be shared.</p>
                  </form>
                </div>
              )}
            </R>
          </div>
        </div>
      </section>
    </main>
  );
}

/* SINGLE SERVICE PAGE: PREMIUM 15+ SECTIONS */
export function SingleServicePage({ goTo, slug }: PageProps & { slug: string }) {
  const service = allServices.find(s => s.slug === slug);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Stats intersection observer
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setStatsInView(true);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!service) return (
    <main>
      <PageHero goTo={goTo} eyebrow="Service Not Found" title={<>This service is not <span>available.</span></>} desc="The service you're looking for could not be found." />
      <section className="section-pad"><div className="container" style={{ textAlign: 'center' }}>
        <button className="btn btn-gold" onClick={() => goTo('services')}>View All Services <span>→</span></button>
      </div></section>
    </main>
  );

  const otherServices = allServices.filter(s => s.slug !== slug).slice(0, 5);

  return (
    <main className="single-service-page">
      {/* 1. PREMIUM PAGE HERO */}
      <section className="service-hero">
        <div className="sh-glow" />
        <div className="sh-glow-2" />
        <div className="sh-grid" />
        <div className="sh-particles">
          {[...Array(6)].map((_, i) => <div key={i} className="sh-particle" style={{ animationDelay: `${i * 0.5}s` }} />)}
        </div>
        <div className="sh-orbit-1" />
        <div className="sh-orbit-2" />
        
        <div className="container">
          {/* Breadcrumb */}
          <div className="page-hero-breadcrumb">
            <a href="/" onClick={e => { e.preventDefault(); goTo('home'); }}>Home</a>
            <span>›</span>
            <a href="/services" onClick={e => { e.preventDefault(); goTo('services'); }}>Services</a>
            <span>›</span>
            <span style={{ color: 'var(--gold)' }}>{service.title}</span>
          </div>
          
          {/* Hero Content */}
          <div className="sh-content">
            <div className="sh-icon-wrap">
              <span className="sh-icon">{service.icon}</span>
              <div className="sh-icon-glow" />
            </div>
            <p className="eyebrow"><span className="ph-dot" />{service.title}</p>
            <h1>{service.hero}</h1>
            <p className="sh-desc">{service.desc.slice(0, 180)}...</p>
            
            {/* Quick Stats */}
            <div className="sh-quick-stats">
              {service.results.slice(0, 3).map((r, i) => (
                <div key={i} className="sh-stat">
                  <strong>{r.split(' ')[0]}</strong>
                  <span>{r.split(' ').slice(1).join(' ')}</span>
                </div>
              ))}
            </div>
            
            {/* CTAs */}
            <div className="sh-actions">
              <button className="btn btn-gold" onClick={() => goTo('contact')}>Start Your Project <span>→</span></button>
              <a className="btn btn-outline" href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer">WhatsApp Chat <span>💬</span></a>
            </div>
            
            {/* Trust Badges */}
            <div className="sh-trust">
              <div className="sh-trust-item"><span>✓</span> 100% Custom Work</div>
              <div className="sh-trust-item"><span>✓</span> Same Day Reply</div>
              <div className="sh-trust-item"><span>✓</span> Clear Revision Stages</div>
              <div className="sh-trust-item"><span>✓</span> Scope Before Start</div>
            </div>
          </div>
        </div>
        
        <div className="sh-bottom-line" />
      </section>

      {/* MAIN CONTENT GRID */}
      <section className="section-pad">
        <div className="container service-detail-grid">
          {/* LEFT COLUMN */}
          <div>
            {/* 2. SERVICE OVERVIEW */}
            <R>
              <div style={{ marginBottom: 48 }}>
                <p className="eyebrow">Overview</p>
                <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: 16 }}>{service.title}</h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 15 }}>{service.desc}</p>
              </div>
            </R>

            {/* 3. WHAT'S INCLUDED */}
            <R>
              <div style={{ marginBottom: 48 }}>
                <h3 style={{ fontSize: 22, marginBottom: 20 }}>What's <span style={{ color: 'var(--gold)' }}>Included</span></h3>
                <ul className="service-features">
                  {service.features.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>
            </R>

            {/* 4. HOW IT WORKS */}
            {service.howItWorks && (
              <R>
                <div style={{ marginBottom: 48 }}>
                  <h3 style={{ fontSize: 22, marginBottom: 20 }}>How It <span style={{ color: 'var(--gold)' }}>Works</span></h3>
                  <div style={{ display: 'grid', gap: 16 }}>
                    {service.howItWorks.map(step => (
                      <div key={step.step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: 20, border: '1px solid var(--line-soft)', borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.03)' }}>
                        <span style={{ width: 44, height: 44, display: 'grid', placeItems: 'center', borderRadius: '50%', border: '1px solid var(--line)', background: 'rgba(245,197,66,0.08)', color: 'var(--gold)', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{step.step}</span>
                        <div>
                          <strong style={{ fontSize: 15, display: 'block', marginBottom: 4 }}>{step.title}</strong>
                          <small style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>{step.desc}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </R>
            )}

            {/* 5. ANIMATED RESULTS STATS */}
            <R>
              <div style={{ marginBottom: 48 }} ref={statsRef}>
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>Expected <span style={{ color: 'var(--gold)' }}>Results</span></h3>
                <p className="service-results-note">Typical outcomes vary by scope, market, starting point, and implementation.</p>
                <div className="service-results-premium">
                  {service.results.map(result => <ServiceResultStat key={result} result={result} inView={statsInView} />)}
                </div>
              </div>
            </R>

            {/* 5.5 GUARANTEES SECTION */}
            <R>
              <div className="guarantees-section">
                <h3 style={{ fontSize: 22, marginBottom: 20 }}>Our <span style={{ color: 'var(--gold)' }}>Guarantees</span></h3>
                <div className="guarantees-grid">
                  <div className="guarantee-card">
                    <span className="guarantee-icon">🛡️</span>
                    <strong>100% Satisfaction</strong>
                    <p>We work until you're completely happy with the result.</p>
                  </div>
                  <div className="guarantee-card">
                    <span className="guarantee-icon">◎</span>
                    <strong>Clear Scope</strong>
                    <p>Deliverables, revision stages, and timelines are agreed before work begins.</p>
                  </div>
                  <div className="guarantee-card">
                    <span className="guarantee-icon">⚡</span>
                    <strong>On-Time Delivery</strong>
                    <p>We respect deadlines. Every. Single. Time.</p>
                  </div>
                  <div className="guarantee-card">
                    <span className="guarantee-icon">🔒</span>
                    <strong>NDA Protected</strong>
                    <p>Your ideas and business data stay confidential.</p>
                  </div>
                </div>
              </div>
            </R>

            {/* 6. CATEGORIES */}
            {service.categories && (
              <R>
                <div style={{ marginBottom: 48 }}>
                  <h3 style={{ fontSize: 22, marginBottom: 20 }}>Categories We <span style={{ color: 'var(--gold)' }}>Cover</span></h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {service.categories.map(c => (
                      <span key={c} style={{ padding: '8px 16px', border: '1px solid var(--line-soft)', borderRadius: 999, background: 'rgba(255,255,255,0.03)', color: 'var(--muted)', fontSize: 13, fontWeight: 500 }}>{c}</span>
                    ))}
                  </div>
                </div>
              </R>
            )}

            {/* 7. SERVICE PORTFOLIO */}
            {'portfolio' in service && service.portfolio && (
              <R>
                <div style={{ marginBottom: 48 }}>
                  <h3 style={{ fontSize: 22, marginBottom: 12 }}>{service.title} <span style={{ color: 'var(--gold)' }}>Portfolio</span></h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>Selected work from our {service.title.toLowerCase()} projects.</p>
                  
                  {/* Category Filter */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                    {['All', ...new Set((service.portfolio as Array<{category: string}>).map(p => p.category))].slice(0, 6).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                          padding: '8px 16px',
                          border: `1px solid ${activeCategory === cat ? 'var(--gold)' : 'var(--line-soft)'}`,
                          borderRadius: 999,
                          background: activeCategory === cat ? 'rgba(245,197,66,0.1)' : 'rgba(255,255,255,0.03)',
                          color: activeCategory === cat ? 'var(--gold)' : 'var(--muted)',
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all .2s'
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Portfolio Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                    {(service.portfolio as Array<{name: string; category: string; desc: string; stat?: string}>)
                      .filter(p => activeCategory === 'All' || p.category === activeCategory)
                      .map(p => (
                      <div 
                        key={p.name} 
                        className="portfolio-card-mini"
                        style={{ 
                          padding: 0, 
                          border: '1px solid var(--line-soft)', 
                          borderRadius: 'var(--radius)', 
                          background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'all .25s'
                        }} 
                        onClick={() => goTo('contact')}
                      >
                        {/* Placeholder Image */}
                        <div style={{ 
                          height: 140, 
                          background: 'linear-gradient(145deg, rgba(245,197,66,0.08), rgba(255,255,255,0.03))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderBottom: '1px solid var(--line-soft)'
                        }}>
                          <span style={{ fontSize: 36, opacity: 0.3, color: 'var(--gold)' }}>{p.name[0]}</span>
                        </div>
                        <div style={{ padding: 16 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <span style={{ fontSize: 10, color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', background: 'rgba(245,197,66,0.1)', padding: '4px 8px', borderRadius: 4 }}>{p.category}</span>
                            {p.stat && <em style={{ color: 'var(--green)', fontSize: 11, fontStyle: 'normal', fontWeight: 700 }}>{p.stat}</em>}
                          </div>
                          <strong style={{ fontSize: 15, display: 'block', marginBottom: 6 }}>{p.name}</strong>
                          <p style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* View All CTA */}
                  <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <button 
                      className="btn btn-outline" 
                      onClick={() => goTo('portfolio')}
                      style={{ fontSize: 13 }}
                    >
                      View Full Portfolio <span>→</span>
                    </button>
                  </div>
                </div>
              </R>
            )}

            {/* 8. WHY CHOOSE AEMTECH */}
            {service.whyChoose && (
              <R>
                <div style={{ marginBottom: 48 }}>
                  <h3 style={{ fontSize: 22, marginBottom: 20 }}>Why Choose AEMTECH for <span style={{ color: 'var(--gold)' }}>{service.title}</span></h3>
                  <div style={{ display: 'grid', gap: 14 }}>
                    {service.whyChoose.map((w, i) => (
                      <div key={i} style={{ padding: 22, border: '1px solid var(--line-soft)', borderRadius: 'var(--radius)', background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))' }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                          <span style={{ width: 28, height: 28, display: 'grid', placeItems: 'center', borderRadius: '50%', background: 'rgba(245,197,66,0.1)', color: 'var(--gold)', fontSize: 12, fontWeight: 800 }}>0{i + 1}</span>
                          <strong style={{ fontSize: 16 }}>{w.title}</strong>
                        </div>
                        <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7, paddingLeft: 38 }}>{w.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </R>
            )}

            {/* 9. AEMTECH VS OTHERS */}
            <R>
              <div className="comparison-section">
                <h3 style={{ fontSize: 22, marginBottom: 20 }}>AEMTECH vs <span style={{ color: 'var(--gold)' }}>Others</span></h3>
                <div className="comparison-table">
                  <div className="comparison-row header">
                    <div>Feature</div>
                    <div className="aemtech">AEMTECH</div>
                    <div className="others">Other Agencies</div>
                  </div>
                  <div className="comparison-row">
                    <div>Custom Design</div>
                    <div className="aemtech"><span className="check">✓</span> 100% Custom</div>
                    <div className="others"><span className="x">✗</span> Templates</div>
                  </div>
                  <div className="comparison-row">
                    <div>Revisions</div>
                    <div className="aemtech"><span className="check">✓</span> Unlimited</div>
                    <div className="others"><span className="x">✗</span> 2-3 Only</div>
                  </div>
                  <div className="comparison-row">
                    <div>Communication</div>
                    <div className="aemtech"><span className="check">✓</span> Direct Founder</div>
                    <div className="others"><span className="x">✗</span> Account Manager</div>
                  </div>
                  <div className="comparison-row">
                    <div>Post-Launch Support</div>
                    <div className="aemtech"><span className="check">✓</span> Included</div>
                    <div className="others"><span className="x">✗</span> Extra Cost</div>
                  </div>
                  <div className="comparison-row">
                    <div>Source Files</div>
                    <div className="aemtech"><span className="check">✓</span> Always Included</div>
                    <div className="others"><span className="x">✗</span> Extra Fee</div>
                  </div>
                </div>
              </div>
            </R>

            {/* 10. PRICING TEASER */}
            <R>
              <div className="pricing-teaser">
                <div className="pricing-teaser-content">
                  <h3>Investment for {service.title}</h3>
                  <p>Every project is custom-quoted based on your specific requirements.</p>
                  <div className="pricing-teaser-range">
                    <span className="starting">Investment</span>
                    <strong className="price">Custom</strong>
                    <span className="note">Quoted according to scope, deliverables, and timeline</span>
                  </div>
                  <div className="pricing-teaser-includes">
                    <span>✓ Free consultation</span>
                    <span>✓ Custom proposal</span>
                    <span>✓ No obligation</span>
                  </div>
                  <button className="btn btn-gold" onClick={() => goTo('contact')} style={{ marginTop: 20 }}>Get Custom Quote <span>→</span></button>
                </div>
              </div>
            </R>

            {/* 11. FAQ ACCORDION */}
            {service.faqs && (
              <R>
                <div style={{ marginBottom: 48 }}>
                  <h3 style={{ fontSize: 22, marginBottom: 20 }}>Frequently Asked <span style={{ color: 'var(--gold)' }}>Questions</span></h3>
                  <div className="accordion">
                    {service.faqs.map((f, i) => (
                      <button key={i} className={`accordion-item${activeFaq === i ? ' active' : ''}`} onClick={() => setActiveFaq(activeFaq === i ? -1 : i)} aria-expanded={activeFaq === i} aria-controls={`service-faq-answer-${i}`}>
                        <span className="q">{f.q}</span><em>{activeFaq === i ? '−' : '+'}</em>
                        <p className="answer" id={`service-faq-answer-${i}`}>{f.a}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </R>
            )}
          </div>

          {/* PREMIUM SIDEBAR */}
          <div>
            {/* Main CTA Card */}
            <div className="service-sidebar premium">
              <div className="sidebar-badge">🔥 Most Requested</div>
              <h3>Ready to Get Started?</h3>
              <p>Let's discuss your {service.title.toLowerCase()} project and create a custom plan.</p>
              <button className="btn btn-gold" style={{ width: '100%', marginBottom: 14 }} onClick={() => goTo('contact')}>Start Your Project <span>→</span></button>
              <a className="btn btn-outline" href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer" style={{ width: '100%', marginBottom: 20, display: 'flex' }}>WhatsApp Chat <span>💬</span></a>
              
              {/* Quick Benefits */}
              <div className="sidebar-benefits">
                <div><span>⚡</span> 24hr response time</div>
                <div><span>🎯</span> Custom proposal</div>
                <div><span>💯</span> No obligation</div>
              </div>
            </div>

            {/* Client Review Card */}
            <div className="sidebar-review">
              <div className="sr-header">
                <span className="sr-badge">💬 Client Review</span>
                <div className="sr-stars">★★★★★</div>
              </div>
              <p>"AEMTECH delivered exactly what we needed. Professional, fast, and premium quality work."</p>
              <div className="sr-footer">
                <div className="sr-rating">
                  <strong>5.0</strong>
                  <span>/ 5 Rating</span>
                </div>
                <div className="sr-source">Verified Client</div>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="sidebar-contact">
              <h4>📞 Let's Talk</h4>
              <div className="sc-items">
                <a href="mailto:aemtechofficial@gmail.com">
                  <span>✉</span>
                  <div>
                    <small>Email</small>
                    <strong>aemtechofficial@gmail.com</strong>
                  </div>
                </a>
                <a href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer">
                  <span>💬</span>
                  <div>
                    <small>WhatsApp</small>
                    <strong>0331-0009519</strong>
                  </div>
                </a>
                <div className="sc-item">
                  <span>📍</span>
                  <div>
                    <small>Location</small>
                    <strong>Karachi, Pakistan</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Services */}
            <div className="sidebar-services">
              <h4>Other Services</h4>
              <div className="ss-list">
                {otherServices.map(s => (
                  <a key={s.slug} href={`/services/${s.slug}`} onClick={e => { e.preventDefault(); goTo(`service-${s.slug}`); }}>
                    <span className="ss-icon">{s.icon}</span>
                    <span className="ss-title">{s.title}</span>
                    <span className="ss-arrow">→</span>
                  </a>
                ))}
              </div>
              <a href="/services" onClick={e => { e.preventDefault(); goTo('services'); }} className="ss-all">View All Services →</a>
            </div>
          </div>
        </div>
      </section>

      {/* 11. BOTTOM CTA */}
      <section className="final-cta">
        <div className="container cta-inner reveal visible">
          <div>
            <p className="eyebrow">Ready to start?</p>
            <h2>Let's Build Your {service.title} <span>Project</span></h2>
            <p>Get a custom proposal within 48 hours. No pressure. No commitment until you're ready.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-gold" onClick={() => goTo('contact')}>Get Free Proposal <span>→</span></button>
            <a className="btn btn-outline" href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer">WhatsApp <span>💬</span></a>
          </div>
        </div>
      </section>
    </main>);
}

/* CASE STUDY PAGE: PREMIUM CINEMATIC */
export function CaseStudyPage({ goTo, slug }: PageProps & { slug: string }) {
  const cs = allCaseStudies.find(s => s.slug === slug);
  const [sv, setSv] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const srf = useRef<HTMLDivElement>(null);
  useEffect(() => { const el = srf.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSv(true); }, { threshold: 0.3 }); o.observe(el); return () => o.disconnect(); }, []);
  if (!cs) return (<main><PageHero goTo={goTo} eyebrow="Not Found" title={<>Case study not <span>found.</span></>} desc="" /><section className="section-pad"><div className="container" style={{ textAlign: 'center' }}><button className="btn btn-gold" onClick={() => goTo('portfolio')}>View Portfolio <span>→</span></button></div></section></main>);
  const nx = cs.nextProject ? allCaseStudies.find(s => s.slug === cs.nextProject) : null;
  const isZabs = cs.slug === 'zabs-international';
  const techStack = isZabs ? ['React', 'Vite', 'Tailwind CSS v4', 'Web3Forms', 'Poppins', 'Netlify'] : cs.slug === 'ms-stationery' ? ['Shopify', 'Liquid', 'Figma', 'Custom Theme', 'SEO', 'WhatsApp API'] : cs.slug === 'glamouria' ? ['Shopify', 'Liquid', 'Figma', 'Klaviyo', 'Speed Opt.'] : ['React', 'Tailwind CSS', 'Figma'];

  return (<main>
    {/* ═══ CINEMATIC HERO ═══ */}
    <section className="cs-cinematic-hero">
      <div className="cch-bg">
        <div className="cch-gradient" style={{ background: `radial-gradient(ellipse at 50% 30%, ${cs.brandColors[1]}22 0%, transparent 60%)` }} />
        <div className="cch-grid" />
        <div className="cch-orb cch-orb-1" style={{ background: cs.brandColors[1] || 'var(--gold)' }} />
        <div className="cch-orb cch-orb-2" style={{ background: cs.brandColors[0] || 'var(--ink)' }} />
      </div>
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="page-hero-breadcrumb">
          <a href="/" onClick={e => { e.preventDefault(); goTo('home'); }}>Home</a><span>›</span>
          <a href="/portfolio" onClick={e => { e.preventDefault(); goTo('portfolio'); }}>Portfolio</a><span>›</span>
          <span style={{ color: 'var(--gold)' }}>{cs.name}</span>
        </div>
        <div className="cch-content">
          {isZabs && <div className="cch-flag">🌍 First International Project</div>}
          <div className="cch-category">{cs.category}</div>
          <h1 className="cch-title">{cs.name}</h1>
          <p className="cch-tagline">{cs.tagline}</p>
          
          {/* Meta Pills */}
          <div className="cch-meta">
            <div className="cch-pill"><span>📍</span>{cs.industry}</div>
            <div className="cch-pill"><span>⏱</span>{cs.duration}</div>
            <div className="cch-pill"><span>📅</span>{cs.year}</div>
          </div>

          {/* CTAs */}
          <div className="cch-actions">
            {isZabs && <a className="btn btn-gold btn-glow" href="https://zabsinternational.com" target="_blank" rel="noopener noreferrer">View Live Website <span>→</span></a>}
            <button className="btn btn-outline" onClick={() => goTo('contact')}>Start Similar Project <span>→</span></button>
          </div>
        </div>
      </div>
    </section>

    {/* RESULTS: FULL WIDTH IMPACT BAR */}
    <div ref={srf} className="cs-impact-bar">
      <div className="container">
        <div className="cib-grid">
          {cs.results.map((r, i) => (
            <div key={i} className="cib-item">
              <strong style={{ color: cs.brandColors[1] || 'var(--gold)' }}>{sv ? r.value : '0'}</strong>
              <span>{r.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* OVERVIEW: CINEMATIC QUOTE STYLE */}
    <section className="section-pad"><div className="container" style={{ maxWidth: 900 }}>
      <R><div className="cs-story-block">
        <div className="csb-icon">📖</div>
        <p className="eyebrow">The Story</p>
        <h2>Project <span>Overview</span></h2>
        <p className="csb-text">{cs.overview}</p>
        {/* Service Tags */}
        <div className="csb-services">
          {cs.services.slice(0, 6).map(s => <span key={s}>{s}</span>)}
        </div>
      </div></R>
    </div></section>

    {/* CHALLENGE VS SOLUTION: DRAMATIC SPLIT */}
    <section className="cs-drama-section">
      <div className="container">
        <R className="center-head"><p className="eyebrow">The Problem & Answer</p><h2>Challenge vs <span>Solution</span></h2></R>
        <div className="cds-grid">
          <R><div className="cds-card cds-challenge">
            <div className="cds-stripe" style={{ background: '#ff6b6b' }} />
            <div className="cds-number">01</div>
            <div className="cds-icon">💀</div>
            <h3>The Challenge</h3>
            <p>{cs.challenge}</p>
          </div></R>
          <R><div className="cds-card cds-solution">
            <div className="cds-stripe" style={{ background: 'var(--gold)' }} />
            <div className="cds-number">02</div>
            <div className="cds-icon">✨</div>
            <h3>Our Solution</h3>
            <p>{cs.solution}</p>
          </div></R>
        </div>
      </div>
    </section>

    {/* ═══ BEFORE VS AFTER (ZABS ONLY) ═══ */}
    {isZabs && (<section className="section-pad"><div className="container" style={{ maxWidth: 900 }}>
      <R className="center-head"><p className="eyebrow">Transformation</p><h2>Before vs <span>After</span></h2></R>
      <R><div className="cs-ba-grid">
        <div className="cs-ba-card cs-ba-before">
          <div className="cs-ba-label">✗ BEFORE</div>
          <h4>WordPress Template</h4>
          {['Generic Elementor template', 'Only 5-6 basic sections', 'Zero animations', 'No WhatsApp integration', '"AI Specialists" copy-paste error', 'Heavy & slow on mobile', 'No SEO optimization', 'No testimonials or FAQ'].map(item => (
            <div key={item} className="cs-ba-item bad"><span>✗</span>{item}</div>
          ))}
        </div>
        <div className="cs-ba-vs">VS</div>
        <div className="cs-ba-card cs-ba-after">
          <div className="cs-ba-label">✓ AFTER</div>
          <h4>Custom React + Vite</h4>
          {['15+ premium custom sections', 'Animated hero with parallax', 'Glass-morphism + animated stats', 'WhatsApp + Web3Forms integration', 'Success popup with call actions', 'Blazing fast on all devices', 'Full SEO + Schema.org markup', 'Testimonials + FAQ + Process'].map(item => (
            <div key={item} className="cs-ba-item good"><span>✓</span>{item}</div>
          ))}
        </div>
      </div></R>
    </div></section>)}

    {/* TECH STACK: GLOWING BADGES */}
    <section className="cs-tech-section"><div className="container" style={{ maxWidth: 900 }}>
      <R className="center-head"><p className="eyebrow">Tech Stack</p><h2>Built <span>With</span></h2></R>
      <R><div className="cs-tech-grid">
        {techStack.map((t, i) => (
          <div key={t} className="cs-tech-badge" style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="ctb-dot" style={{ background: cs.brandColors[1] || 'var(--gold)' }} />
            {t}
          </div>
        ))}
      </div></R>
      {isZabs && (
        <R><div className="cs-live-banner">
          <div className="clb-content">
            <div className="clb-status"><span className="clb-dot" /> Live & Delivered</div>
            <h3>See the live result</h3>
            <p>zabsinternational.com</p>
          </div>
          <a className="btn btn-gold" href="https://zabsinternational.com" target="_blank" rel="noopener noreferrer">Visit Website <span>→</span></a>
        </div></R>
      )}
    </div></section>

    {/* PROCESS: INTERACTIVE STEPS */}
    <section className="section-pad" style={{ background: 'var(--ink)', borderBlock: '1px solid var(--line-soft)' }}><div className="container" style={{ maxWidth: 900 }}>
      <R className="center-head"><p className="eyebrow">Our Process</p><h2>How We <span>Built It</span></h2></R>
      <R><div className="cs-process-interactive">
        <div className="cpi-tabs" role="tablist" aria-label={`${cs.name} project process`}>
          {cs.process.map((s, i) => (
            <button key={s.step} className={`cpi-tab${activeStep === i ? ' active' : ''}`} onClick={() => setActiveStep(i)} role="tab" aria-selected={activeStep === i} aria-controls="case-process-panel">
              <span className="cpi-num">{s.step}</span>
              <span className="cpi-label">{s.title}</span>
            </button>
          ))}
        </div>
        <div className="cpi-content" role="tabpanel" id="case-process-panel">
          <div className="cpi-step-badge">Step {cs.process[activeStep].step}</div>
          <h3>{cs.process[activeStep].title}</h3>
          <p>{cs.process[activeStep].desc}</p>
        </div>
      </div></R>
    </div></section>

    {cs.brandIdentity && (<>
    {/* BRAND IDENTITY: OVERVIEW */}
    <section className="section-pad"><div className="container" style={{ maxWidth: 960 }}>
      <R className="center-head"><p className="eyebrow">Brand Identity</p><h2>{cs.name}: <span>Complete Brand Identity</span></h2><p>{cs.brandIdentity.desc}</p></R>
      
      {/* Logo + Tagline */}
      <R><div className="cs-brand-layout" style={{ marginBottom: 48 }}>
        <div className="cs-brand-mark" style={{ background: cs.brandColors[0], overflow: 'hidden', padding: 0 }}>
          {cs.brandIdentity.logoImage ? (
            <img
              src={cs.brandIdentity.logoImage}
              alt={`${cs.name} Logo`}
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 0 }}
              onError={event => {
                const image = event.currentTarget;
                if (image.dataset.fallback) return;
                image.dataset.fallback = 'true';
                image.src = cs.brandIdentity?.logoImage?.replace(/\.webp$/i, '.png') || '';
              }}
            />
          ) : (
            <span style={{ color: cs.brandColors[1] || '#fff' }}>{cs.brandIdentity.logo}</span>
          )}
        </div>
        <div className="cs-brand-details">
          <div style={{ marginBottom: 16 }}>
            <small style={{ color: 'var(--soft)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Brand Tagline</small>
            <h3 style={{ fontSize: 24, color: 'var(--gold)', marginTop: 4 }}>"{cs.brandIdentity.tagline}"</h3>
          </div>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 14, marginBottom: 16 }}>{cs.brandIdentity.personality}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {cs.brandIdentity.traits.map(t => <span key={t} style={{ padding: '5px 12px', borderRadius: 999, border: '1px solid var(--line-soft)', background: 'rgba(255,255,255,0.03)', color: 'var(--muted)', fontSize: 11, fontWeight: 600 }}>{t}</span>)}
          </div>
        </div>
      </div></R>
      
      {/* Mission + Vision */}
      <R><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 48 }}>
        <div style={{ padding: 28, border: '1px solid var(--line-soft)', borderRadius: 16, background: 'rgba(255,255,255,0.03)' }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>🎯</div>
          <h4 style={{ fontSize: 16, marginBottom: 8, color: 'var(--gold)' }}>Mission</h4>
          <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>{cs.brandIdentity.mission}</p>
        </div>
        <div style={{ padding: 28, border: '1px solid var(--line-soft)', borderRadius: 16, background: 'rgba(255,255,255,0.03)' }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>🔭</div>
          <h4 style={{ fontSize: 16, marginBottom: 8, color: 'var(--gold)' }}>Vision</h4>
          <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>{cs.brandIdentity.vision}</p>
        </div>
      </div></R>
    </div></section>

    {/* BRAND DESIGN PROCESS: 4 STEPS WITH IMAGES */}
    <section className="section-pad" style={{ background: 'var(--ink)', borderBlock: '1px solid var(--line-soft)' }}><div className="container" style={{ maxWidth: 960 }}>
      <R className="center-head"><p className="eyebrow">Design Process</p><h2>From Concept to <span>Final Logo</span></h2><p>A look at each stage of the brand identity design process.</p></R>
      
      <div style={{ display: 'grid', gap: 40 }}>
        {cs.brandIdentity.processSteps.map((step, i) => (
          <R key={step.step}>
            <div className="bi-step-card" style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? 'auto minmax(0, 1fr)' : 'minmax(0, 1fr) auto', gap: 32, alignItems: 'center' }}>
              {/* Image */}
              <div className={`bi-step-media ${i % 2 === 0 ? 'left' : 'right'}`} style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div className="bi-step-image">
                  <img
                    src={step.image}
                    alt={`${cs.name}: ${step.title}`}
                    loading="lazy"
                    onError={event => {
                      const image = event.currentTarget;
                      if (!image.dataset.fallback) {
                        image.dataset.fallback = 'true';
                        image.src = step.image.replace(/\.webp$/i, '.jpg');
                        return;
                      }
                      image.style.display = 'none';
                      image.parentElement?.classList.add('bi-step-placeholder');
                    }}
                  />
                  <div className="bi-step-num">{step.step}</div>
                </div>
              </div>
              {/* Content */}
              <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <div className="bi-step-badge">Step {step.step}</div>
                <h3 style={{ fontSize: 22, marginBottom: 12 }}>{step.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.8 }}>{step.desc}</p>
              </div>
            </div>
          </R>
        ))}
      </div>
    </div></section>

    {/* COLOR SYSTEM */}
    <section className="section-pad"><div className="container" style={{ maxWidth: 960 }}>
      <R className="center-head"><p className="eyebrow">Color System</p><h2>Brand <span>Colors</span></h2></R>
      <R><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
        {cs.brandIdentity.colors.map(c => (
          <div key={c.hex} style={{ border: '1px solid var(--line-soft)', borderRadius: 12, overflow: 'hidden', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ height: 80, background: c.hex }} />
            <div style={{ padding: 14 }}>
              <strong style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>{c.name}</strong>
              <code style={{ color: 'var(--gold)', fontSize: 11, fontFamily: 'monospace' }}>{c.hex}</code>
              <p style={{ color: 'var(--soft)', fontSize: 10, marginTop: 6, lineHeight: 1.4 }}>{c.meaning}</p>
            </div>
          </div>
        ))}
      </div></R>
      {/* Neutrals */}
      <R><div>
        <h4 style={{ fontSize: 14, marginBottom: 12 }}>Neutral Palette</h4>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {cs.brandIdentity.neutrals.map(n => (
            <div key={n.hex} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', border: '1px solid var(--line-soft)', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: n.hex, border: '1px solid var(--line-soft)' }} />
              <div><small style={{ color: 'var(--muted)', fontSize: 11 }}>{n.name}</small><br /><code style={{ fontSize: 10, color: 'var(--soft)' }}>{n.hex}</code></div>
            </div>
          ))}
        </div>
      </div></R>
    </div></section>

    {/* TYPOGRAPHY */}
    <section className="section-pad" style={{ background: 'var(--ink)', borderBlock: '1px solid var(--line-soft)' }}><div className="container" style={{ maxWidth: 960 }}>
      <R className="center-head"><p className="eyebrow">Typography</p><h2>Type <span>System</span></h2></R>
      <R><div style={{ display: 'grid', gap: 16 }}>
        {cs.brandIdentity.fonts.map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'center', padding: 24, border: '1px solid var(--line-soft)', borderRadius: 12, background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ width: 64, height: 64, display: 'grid', placeItems: 'center', borderRadius: 12, background: 'rgba(245,197,66,0.08)', border: '1px solid var(--line)', fontSize: 24, fontWeight: 700, color: 'var(--gold)', flexShrink: 0 }}>Aa</div>
            <div>
              <strong style={{ fontSize: 18, display: 'block', marginBottom: 4 }}>{f.name}</strong>
              <span style={{ color: 'var(--muted)', fontSize: 13 }}>{f.usage}</span>
            </div>
          </div>
        ))}
      </div></R>
      
      {/* Voice & Tone */}
      <R><div style={{ marginTop: 40 }}>
        <h3 style={{ fontSize: 18, marginBottom: 16 }}>Brand Voice & <span style={{ color: 'var(--gold)' }}>Tone</span></h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {cs.brandIdentity.voiceTone.map(t => <span key={t} style={{ padding: '8px 16px', borderRadius: 999, border: '1px solid var(--line-soft)', background: 'rgba(245,197,66,0.04)', color: 'var(--muted)', fontSize: 12, fontWeight: 600 }}>{t}</span>)}
        </div>
      </div></R>

      {/* Brand Promise */}
      <R><div style={{ marginTop: 40, padding: 28, borderLeft: '3px solid var(--gold)', background: 'rgba(245,197,66,0.04)', borderRadius: '0 12px 12px 0' }}>
        <h4 style={{ fontSize: 14, color: 'var(--gold)', marginBottom: 8 }}>Brand Promise</h4>
        <p style={{ color: '#d8d8d8', fontSize: 15, lineHeight: 1.8, fontStyle: 'italic' }}>{cs.brandIdentity.promise}</p>
      </div></R>
    </div></section>
    </>)}
    <section className="section-pad" style={{ background: 'var(--ink)', borderBlock: '1px solid var(--line-soft)' }}><div className="container"><R className="center-head"><p className="eyebrow">Our Process</p><h2>How We <span>Built It</span></h2></R><div className="process-timeline">{cs.process.map((s, i) => (<R key={s.step}><div className={`process-step ${i % 2 === 0 ? 'left' : 'right'}`}><div className="ps-number"><span style={{ fontSize: 14 }}>{s.step}</span></div><div className="ps-card"><div className="ps-step-badge">Step {s.step}</div><h3>{s.title}</h3><p>{s.desc}</p></div></div></R>))}<div className="process-line" /></div></div></section>
    <section className="section-pad"><div className="container" style={{ maxWidth: 860 }}><R className="center-head"><p className="eyebrow">Deliverables</p><h2>What We <span>Delivered</span></h2></R><R><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>{cs.features.map((f, i) => (<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', border: '1px solid var(--line-soft)', borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}><span style={{ color: 'var(--gold)', fontWeight: 800 }}>✓</span><span style={{ color: '#dedede', fontSize: 13 }}>{f}</span></div>))}</div></R></div></section>
    {cs.testimonial && (<section className="section-pad" style={{ background: 'var(--ink)', borderBlock: '1px solid var(--line-soft)' }}><div className="container" style={{ maxWidth: 760, textAlign: 'center' }}><R><div style={{ padding: '48px 36px', border: '1px solid var(--line-soft)', borderRadius: 20, background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))' }}><div style={{ fontSize: 56, color: 'var(--gold)', opacity: 0.3, marginBottom: 12, fontFamily: 'Georgia,serif', lineHeight: 1 }}>"</div><p style={{ color: '#e8e8e8', fontSize: 20, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 28 }}>{cs.testimonial.text}</p><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}><div style={{ width: 50, height: 50, display: 'grid', placeItems: 'center', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), #d4a833)', color: '#080808', fontSize: 18, fontWeight: 800 }}>{cs.testimonial.name[0]}</div><div style={{ textAlign: 'left' }}><strong style={{ display: 'block', fontSize: 15 }}>{cs.testimonial.name}</strong><span style={{ color: 'var(--muted)', fontSize: 13 }}>{cs.testimonial.role}</span></div></div></div></R></div></section>)}
    <section className="final-cta-premium"><div className="fcp-bg"><div className="fcp-gradient" /><div className="fcp-grid" /></div><div className="container fcp-content reveal visible">{nx ? (<><p className="eyebrow">Next Case Study</p><h2>{nx.name}: <span>{nx.category}</span></h2><p>{nx.tagline}</p><div className="fcp-actions"><button className="btn btn-gold" onClick={() => goTo(`case-${nx.slug}`)}>View Case Study <span>→</span></button><button className="btn btn-outline" onClick={() => goTo('contact')}>Start Your Project <span>→</span></button></div></>) : (<><p className="eyebrow">Inspired?</p><h2>Let's Build Something <span>Like This</span> For You</h2><p>Get a premium digital experience tailored to your brand.</p><div className="fcp-actions"><button className="btn btn-gold btn-glow" onClick={() => goTo('contact')}>Start Your Project <span>→</span></button><a className="btn btn-outline" href="https://wa.me/923310009519" target="_blank" rel="noopener noreferrer">WhatsApp <span>💬</span></a></div></>)}</div></section>
  </main>);
}
