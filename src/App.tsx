import React, { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import './App.css'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules'

// Hero slider
import heroSlide1 from './assets/hero_slider/main.jpg'
import heroSlide2 from './assets/hero_slider/main2_coffee.jpg'
import heroSlide3 from './assets/hero_slider/main_clothes.jpg'
import premiumOutsideEating from './assets/rooms/premium/outside/Premium_Outside_Eating.png'

// Rooms – premium
import premiumOutsideHero from './assets/rooms/premium/outside/Premium_Outside_Hero.png'
import premiumOutsideBroadView from './assets/rooms/premium/outside/broad view.png'
import premiumOutsideNarrowView from './assets/rooms/premium/outside/narrow view.png'
import premiumOutsideWriting from './assets/rooms/premium/outside/Premium_Outside_writing.png'
import premiumInsideHero from './assets/rooms/premium/inside/Premium_Inside_Hero.jpg'
import premiumInsideReading from './assets/rooms/premium/inside/premium inside_reading.png'
import premiumInsideReading2 from './assets/rooms/premium/inside/premium inside_reading2.png'
import premiumInsideWorking from './assets/rooms/premium/inside/premium inside_working.png'

// Rooms – deluxe
import deluxeOutsideHero from './assets/rooms/deluxe/outside/Deluxe_Outside_Hero.png'
import deluxeOutsideReading from './assets/rooms/deluxe/outside/deluxe outside_reading.png'
import deluxeOutsideWorking from './assets/rooms/deluxe/outside/deluxe outside_working.png'
import deluxeOutsideStudy from './assets/rooms/deluxe/outside/deluxe outside_study.png'
import deluxeInsideHero from './assets/rooms/deluxe/inside/Deluxe_Inside_Hero.jpg'
import deluxeInsideStudy from './assets/rooms/deluxe/inside/deluxe inside study.png'
import deluxeInsideWriting from './assets/rooms/deluxe/inside/deluxe inside writing.png'
import deluxeInsideWorking from './assets/rooms/deluxe/inside/deluxe inside working.png'

// Rooms – standard
import standardOutsideHero from './assets/rooms/standard/outside/Standard_Outside_Hero.png'
import standardOutside3 from './assets/rooms/standard/outside/standard outside2.png'
import standardOutsideStudying from './assets/rooms/standard/outside/Standard_Outside_studying.png'
import standardOutsideCoffee from './assets/rooms/standard/outside/Standard_Outside_Coffe.png'
import standardOutsideWorking from './assets/rooms/standard/outside/standard outside_working.png'
import standardInsideHero from './assets/rooms/standard/inside/Standard_Inside_Hero.png'
import standardInsideNeat from './assets/rooms/standard/inside/standard inside_neat.png'
import standardInsideReading from './assets/rooms/standard/inside/standard inside_reading.png'
import standardInsideWorking from './assets/rooms/standard/inside/standard inside_working.png'

// Rooms – study
import studyOutsideHero from './assets/rooms/study/outside/Study_Outside_Hero.png'
import studyOutsideWorking from './assets/rooms/study/outside/study outside_working.png'
import studyOutsideWorking2 from './assets/rooms/study/outside/study outside_working2.png'
import studyOutsideStudy from './assets/rooms/study/outside/study outside_study.png'
import studyInsideHero from './assets/rooms/study/inside/Study_Inside_Hero.png'
import studyInsideWorking from './assets/rooms/study/inside/study inside_working.png'
import studyInsideWorking2 from './assets/rooms/study/inside/study inside_working2.png'
import studyInsideStudy from './assets/rooms/study/inside/study inside_study.png'

// Facilities
import kitchen from './assets/facilities/kitchen/Kitchen_Hero.jpg'
import shower from './assets/facilities/shower/Shower_Hero.jpg'
import cinema from './assets/facilities/cinema/Cinema_Hero.png'
import washtower from './assets/facilities/washtower/Washtower_Hero.jpg'

// Icons (lucide-react)
import { Refrigerator, Wifi, Zap, Monitor, Shirt, Archive, Phone, MessageCircle, MapPin, Train, ShoppingBag, BookOpen, Shield, TreePine } from 'lucide-react'

// Security
import security from './assets/security/security.png'

import { useLanguage } from './i18n/LanguageContext'
import { translations } from './i18n/translations'

const InquiryPage = lazy(() => import('./pages/InquiryPage'))
const FaqPage = lazy(() => import('./pages/FaqPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))

const NAVER_TALK = 'https://talk.naver.com/W6H2WZ6'

const facilityImgs = [kitchen, shower, cinema, washtower]

const nearbyIcons = [
  <Train size={18} />,
  <ShoppingBag size={18} />,
  <BookOpen size={18} />,
  <Shield size={18} />,
  <TreePine size={18} />,
]

interface ViewData {
  imgs: string[]
  price: string
  viewLabel: string
  features: string[]
  desc: string
}

interface Room {
  id: string
  name: string
  label: string
  badge: string | null
  color: string
  views: { outside: ViewData; inside: ViewData }
}

function buildRooms(rd: typeof translations.ko.rooms.data): Room[] {
  return [
    {
      id: 'premium',
      name: 'Premium',
      label: rd.premium.label,
      badge: 'BEST',
      color: '#FF7E67',
      views: {
        outside: { imgs: [premiumOutsideHero, premiumOutsideBroadView, premiumOutsideNarrowView, premiumOutsideWriting, premiumOutsideEating], ...rd.premium.outside },
        inside: { imgs: [premiumInsideHero, premiumInsideReading, premiumInsideReading2, premiumInsideWorking], ...rd.premium.inside },
      },
    },
    {
      id: 'deluxe',
      name: 'Deluxe',
      label: rd.deluxe.label,
      badge: 'POPULAR',
      color: '#FF9999',
      views: {
        outside: { imgs: [deluxeOutsideHero, deluxeOutsideReading, deluxeOutsideWorking, deluxeOutsideStudy], ...rd.deluxe.outside },
        inside: { imgs: [deluxeInsideHero, deluxeInsideStudy, deluxeInsideWriting, deluxeInsideWorking], ...rd.deluxe.inside },
      },
    },
    {
      id: 'standard',
      name: 'Standard',
      label: rd.standard.label,
      badge: null,
      color: '#FF7E67',
      views: {
        outside: { imgs: [standardOutsideHero, standardOutside3, standardOutsideStudying, standardOutsideCoffee, standardOutsideWorking], ...rd.standard.outside },
        inside: { imgs: [standardInsideHero, standardInsideNeat, standardInsideReading, standardInsideWorking], ...rd.standard.inside },
      },
    },
    {
      id: 'study',
      name: 'Study',
      label: rd.study.label,
      badge: null,
      color: '#FF9999',
      views: {
        outside: { imgs: [studyOutsideHero, studyOutsideWorking, studyOutsideWorking2, studyOutsideStudy], ...rd.study.outside },
        inside: { imgs: [studyInsideHero, studyInsideWorking, studyInsideWorking2, studyInsideStudy], ...rd.study.inside },
      },
    },
  ]
}

/* ─────────── Header ─────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const isMainPage = location.pathname === '/'
  const { lang, setLang } = useLanguage()
  const t = translations[lang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    navRef.current?.scrollTo({ top: 0 })
    const onScroll = () => setMenuOpen(false)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <>
      <header className={`header ${scrolled || !isMainPage ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
            <div className="logo-main">
              <span className="logo-first">{t.logo.first}</span>{t.logo.house}
              <span className="logo-sub">{t.logo.branch}</span>
            </div>
            <div className="logo-tagline">{t.logo.tagline}</div>
          </Link>

          <div className="header-right">
            <div className="lang-switch">
              <button
                className={lang === 'ko' ? 'active' : ''}
                onClick={() => setLang('ko')}
                aria-label="한국어"
              >KO</button>
              <button
                className={lang === 'en' ? 'active' : ''}
                onClick={() => setLang('en')}
                aria-label="English"
              >EN</button>
            </div>
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t.nav.menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && <div className="nav-backdrop" onClick={() => setMenuOpen(false)} />}

      <nav ref={navRef} className={`nav ${menuOpen ? 'open' : ''} ${scrolled || !isMainPage ? 'scrolled' : ''}`}>
        <button className="nav-close" onClick={() => setMenuOpen(false)} aria-label={t.nav.menuClose}>✕</button>
        <button onClick={() => scrollTo('rooms')}>Rooms</button>
        <button onClick={() => scrollTo('facilities')}>Facilities</button>
        <button onClick={() => scrollTo('security')}>Security</button>
        <button onClick={() => scrollTo('location')}>Location</button>
        <Link to="/inquiry" className="nav-link" onClick={() => setMenuOpen(false)}>
          {t.nav.inquiry}
        </Link>
        <Link to="/faq" className="nav-link" onClick={() => setMenuOpen(false)}>
          FAQ
        </Link>
        <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
          {t.nav.about}
        </Link>
        <div className="lang-switch nav-lang-switch">
          <button
            className={lang === 'ko' ? 'active' : ''}
            onClick={() => setLang('ko')}
            aria-label="한국어"
          >KO</button>
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => setLang('en')}
            aria-label="English"
          >EN</button>
        </div>
        <a href={NAVER_TALK} target="_blank" rel="noopener noreferrer" className="nav-cta">
          {t.nav.naverTalk}
        </a>
      </nav>
    </>
  )
}

/* ─────────── Hero (Swiper) ─────────── */
function Hero() {
  const { lang } = useLanguage()
  const t = translations[lang].hero
  const heroSlides = [
    { img: heroSlide1, label: 'Main 1' },
    { img: heroSlide2, label: 'Main 2' },
    { img: heroSlide3, label: 'Main 3' },
  ]
  return (
    <section id="hero" className="hero">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="hero-swiper"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.label}>
            <img src={slide.img} alt={slide.label} className="hero-bg" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">
          {t.title1}<br />
          <span>{t.title2}<br />{t.title3}</span>
        </h1>
        <p className="hero-desc">
          {t.desc1}<br />{t.desc2}
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' })}>
            {t.btnRooms}
          </button>
          <button className="btn btn-outline" onClick={() => document.getElementById('security')?.scrollIntoView({ behavior: 'smooth' })}>
            {t.btnSecurity}
          </button>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>scroll</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  )
}

/* ─────────── Contact Bar ─────────── */
function ContactBar() {
  const { lang } = useLanguage()
  const t = translations[lang].contact
  return (
    <div className="contact-bar">
      <a href="tel:0507-1492-5963" className="contact-bar-item">
        <Phone className="contact-bar-icon" size={22} />
        <span className="contact-bar-text">{t.phone}</span>
      </a>
      <a
        href="https://open.kakao.com/me/firsthousegunpo"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-bar-item"
      >
        <MessageCircle className="contact-bar-icon" size={22} />
        <span className="contact-bar-text">{t.kakao}</span>
      </a>
      <a
        href="https://naver.me/xtgBWNNn"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-bar-item"
      >
        <MapPin className="contact-bar-icon" size={22} />
        <span className="contact-bar-text">{t.naverMap}</span>
      </a>
    </div>
  )
}

/* ─────────── Room Detail Modal ─────────── */
function RoomDetailModal({ room, view, allRooms, onClose }: { room: Room; view: 'outside' | 'inside'; allRooms: Room[]; onClose: () => void }) {
  const [activeRoom, setActiveRoom] = useState<Room>(room)
  const [activeView, setActiveView] = useState<'outside' | 'inside'>(view)
  const data = activeRoom.views[activeView]
  const isInside = activeView === 'inside'
  const { lang } = useLanguage()
  const t = translations[lang].modal

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    setActiveRoom(room)
    setActiveView(view)
  }, [room, view])

  return (
    <div className="room-detail-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="room-detail-modal">
        {/* Left: text content */}
        <div className="room-detail-content">
          <div className="room-detail-top-bar">
            <button className="room-detail-close" onClick={onClose} aria-label={t.close}>✕</button>
          </div>

          {/* Class tabs */}
          <div className="room-detail-class-tabs">
            {allRooms.map((r) => (
              <button
                key={r.id}
                className={`room-detail-class-tab ${activeRoom.id === r.id ? 'active' : ''}`}
                style={activeRoom.id === r.id ? { background: r.color, borderColor: r.color, color: 'white' } : {}}
                onClick={() => setActiveRoom(r)}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="room-detail-header-row">
            <div className="room-detail-badges">
              <span className="room-detail-view-badge" style={{ background: activeRoom.color }}>{data.viewLabel}</span>
            </div>
            <span className="room-detail-price" style={{ color: activeRoom.color }}>{data.price}<span className="room-detail-price-unit"> {t.priceUnit}</span></span>
          </div>

          <h2 className="room-detail-title">
            {activeRoom.label} <span style={{ color: activeRoom.color }}>{data.viewLabel}</span>
          </h2>
          <p className="room-detail-desc">{data.desc}</p>

          <div className="room-detail-features">
            <h3 className="room-detail-features-title">{t.keyFeatures}</h3>
            <div className="room-detail-feature-list">
              {data.features.map((f) => (
                <div key={f} className="room-detail-feature-item">
                  <span className="room-detail-check" style={{ color: activeRoom.color }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="room-detail-actions">
            <Link
              to="/inquiry"
              className="btn-enquire-large"
              style={{ background: activeRoom.color }}
              onClick={onClose}
            >
              {t.inquireBtn}
            </Link>
            <a href="tel:0507-1492-5963" className="btn-call-large">
              {t.callBtn}
            </a>
          </div>
        </div>

        {/* Right: photo slider */}
        <div className="room-detail-slider-wrap">
          <div className="room-detail-view-header">
            <span className="room-detail-view-pill" style={{ background: activeRoom.color }}>
              {data.viewLabel}
            </span>
            <button
              className={`view-switch modal-view-switch ${isInside ? 'on' : ''}`}
              onClick={() => setActiveView(isInside ? 'outside' : 'inside')}
              aria-label={t.viewSwitch}
            >
              <span className="view-switch-track" style={{ background: isInside ? activeRoom.color : 'rgba(255,255,255,0.3)' }}>
                <span className="view-switch-knob" />
              </span>
              <span className="view-switch-text" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {isInside ? t.inside : t.outside}
              </span>
            </button>
          </div>
          <div className="room-detail-view-swiper-wrap">
            <Swiper
              key={`${activeRoom.id}-${activeView}`}
              modules={[Pagination, Navigation]}
              pagination={{ clickable: true }}
              navigation
              loop={data.imgs.length > 1}
              className="room-detail-swiper"
            >
              {data.imgs.map((img, i) => (
                <SwiperSlide key={i}>
                  <img src={img} alt={`${room.label} ${data.viewLabel} ${i + 1}`} loading="lazy" decoding="async" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────── Room View Card ─────────── */
function RoomViewCard({ room, view, onDetailClick, onViewToggle }: { room: Room; view: 'outside' | 'inside'; onDetailClick: () => void; onViewToggle: () => void }) {
  const data = room.views[view]
  const isInside = view === 'inside'
  const { lang } = useLanguage()
  const t = translations[lang].rooms
  return (
    <div className="room-card">
      <div className="view-toggle-bar" onClick={(e) => e.stopPropagation()}>
        <span className="view-toggle-label">{data.viewLabel}</span>
        <button
          className={`view-switch ${isInside ? 'on' : ''}`}
          onClick={onViewToggle}
          aria-label={t.viewSwitch}
        >
          <span className="view-switch-track" style={{ background: isInside ? room.color : '#cbd5e0' }}>
            <span className="view-switch-knob" />
          </span>
          <span className="view-switch-text">{isInside ? t.inside : t.outside}</span>
        </button>
      </div>

      <div className="room-card-image-wrap" onClick={onDetailClick} style={{ cursor: 'pointer' }}>
        <Swiper
          key={view}
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation
          loop={data.imgs.length > 1}
          className="room-card-swiper"
        >
          {data.imgs.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} alt={`${room.label} ${data.viewLabel} ${i + 1}`} className="room-card-image" loading="lazy" decoding="async" />
              <span className="room-card-slide-label" style={{ background: room.color }}>{data.viewLabel}</span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="room-card-body">
        <h3 className="room-card-title">
          {room.label} <span style={{ color: room.color }}>{data.viewLabel}</span>
        </h3>
        <p className="room-card-desc">{data.desc}</p>
        <div className="room-card-features">
          {data.features.map((f) => (
            <span key={f} className="room-feature-tag" style={{ background: room.color + '22', color: room.color }}>{f}</span>
          ))}
        </div>
      </div>
      <div className="room-card-footer">
        <span className="room-card-price" style={{ color: room.color }}>{data.price}</span>
        <div className="room-card-actions">
          <Link
            to="/inquiry"
            className="btn-enquire"
            style={{ background: room.color }}
          >
            {t.inquireBtn}
          </Link>
          <button
            className="btn-detail"
            onClick={onDetailClick}
            style={{ borderColor: room.color, color: room.color }}
          >
            {t.detailBtn}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────── Rooms ─────────── */
function Rooms() {
  const [activeTab, setActiveTab] = useState<string>('premium')
  const [activeView, setActiveView] = useState<'outside' | 'inside'>('outside')
  const [detailModal, setDetailModal] = useState<{ room: Room; view: 'outside' | 'inside' } | null>(null)
  const { lang } = useLanguage()
  const t = translations[lang].rooms
  const rooms = buildRooms(translations[lang].rooms.data)
  const currentRoom = rooms.find((r) => r.id === activeTab)!

  return (
    <section id="rooms" className="section rooms-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-label">{t.sectionLabel}</p>
          <h2 className="section-title">{t.sectionTitle}</h2>
          <p className="section-sub">{t.sectionSub}</p>
        </div>

        <div className="rooms-layout">
          <div className="rooms-sidebar">
            <div className="rooms-tabs">
              {rooms.map((r) => (
                <button
                  key={r.id}
                  className={`room-tab ${activeTab === r.id ? 'active' : ''}`}
                  style={activeTab === r.id ? { background: r.color, borderColor: r.color } : {}}
                  onClick={() => { setActiveTab(r.id); setActiveView('outside') }}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <div className="room-all-features">
              <span className="room-all-features-title">{t.allFeatures}</span>
              <ul className="room-all-features-list">
                <li><Refrigerator className="room-feature-icon" />{t.features[0]}</li>
                <li><Zap className="room-feature-icon" style={{ whiteSpace: 'pre-line' } as React.CSSProperties} />{t.features[1]}</li>
                <li><Wifi className="room-feature-icon" />{t.features[2]}</li>
                <li><Monitor className="room-feature-icon" />{t.features[3]}</li>
                <li><Shirt className="room-feature-icon" />{t.features[4]}</li>
                <li><Archive className="room-feature-icon" />{t.features[5]}</li>
              </ul>
            </div>
          </div>

          <div className="rooms-cards-wrap">
            <div className="rooms-cards">
              <RoomViewCard
                room={currentRoom}
                view={activeView}
                onDetailClick={() => setDetailModal({ room: currentRoom, view: activeView })}
                onViewToggle={() => setActiveView(activeView === 'outside' ? 'inside' : 'outside')}
              />
            </div>
          </div>
        </div>

      </div>

      {detailModal && (
        <RoomDetailModal
          room={detailModal.room}
          view={detailModal.view}
          allRooms={rooms}
          onClose={() => setDetailModal(null)}
        />
      )}
    </section>
  )
}

/* ─────────── Facilities ─────────── */
function Facilities() {
  const { lang } = useLanguage()
  const t = translations[lang].facilities
  const facilities = t.items.map((item, i) => ({ ...item, img: facilityImgs[i] }))
  return (
    <section id="facilities" className="section facilities-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-label">{t.sectionLabel}</p>
          <h2 className="section-title">{t.sectionTitle}</h2>
          <p className="section-sub">{t.sectionSub}</p>
        </div>
        <div className="facilities-grid">
          {facilities.map((f) => (
            <div key={f.name} className="facility-card">
              <div className="facility-image-wrap">
                <img src={f.img} alt={f.name} className="facility-image" loading="lazy" decoding="async" />
                <div className="facility-overlay">
                  <p className="facility-desc" style={{ whiteSpace: 'pre-line' }}>{f.desc}</p>
                </div>
              </div>
              <p className="facility-name">{f.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Security ─────────── */
function Security() {
  const { lang } = useLanguage()
  const t = translations[lang].security
  return (
    <section id="security" className="section security-section">
      <div className="section-inner">
        <div className="security-card">
          <div className="security-text">
            <p className="section-label">{t.sectionLabel}</p>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              {t.title1}<br />{t.title2}
            </h2>
            <p className="security-sub">{t.sub}</p>
            <ul className="security-list">
              {t.items.map((item) => (
                <li key={item.title} className="security-item">
                  <span className="security-icon">{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
            <a href={NAVER_TALK} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {t.inquireBtn}
            </a>
          </div>
          <div className="security-img-wrap">
            <img src={security} alt="Security System" className="security-img" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Location ─────────── */
const PLACE_LAT = 37.353197
const PLACE_LNG = 126.947693

function NaverMap({ infoName, infoAddr, infoWalk, failedText, fallbackBtn }: {
  infoName: string; infoAddr: string; infoWalk: string; failedText: string; fallbackBtn: string
}) {
  const [mapFailed, setMapFailed] = useState(false)

  useEffect(() => {
    ;(window as Window & { navermap_authFailure?: () => void }).navermap_authFailure = () => {
      setMapFailed(true)
    }

    let timer: ReturnType<typeof setInterval>
    let attempts = 0

    const initMap = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nv = (window as any).naver
      if (!nv?.maps) {
        if (++attempts >= 50) {
          clearInterval(timer)
          setMapFailed(true)
        }
        return
      }
      clearInterval(timer)

      const center = new nv.maps.LatLng(PLACE_LAT, PLACE_LNG)
      const map = new nv.maps.Map('naver-map', { center, zoom: 17 })
      const marker = new nv.maps.Marker({ position: center, map })

      const contentString = [
        '<div style="padding:12px 16px;font-family:\'Noto Sans KR\',sans-serif;min-width:160px;">',
        `<p style="font-size:0.88rem;font-weight:800;color:#2D3748;margin:0 0 5px;">${infoName}</p>`,
        `<p style="font-size:0.78rem;color:#718096;margin:0;">${infoAddr}</p>`,
        `<p style="font-size:0.78rem;color:#FF7E67;font-weight:700;margin:4px 0 0;">${infoWalk}</p>`,
        '</div>',
      ].join('')

      const infoWindow = new nv.maps.InfoWindow({
        content: contentString,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        anchorSize: new nv.maps.Size(10, 10),
      })

      nv.maps.Event.addListener(marker, 'click', function () {
        if (infoWindow.getMap()) {
          infoWindow.close()
        } else {
          infoWindow.open(map, marker)
        }
      })

      infoWindow.open(map, marker)
    }

    timer = setInterval(initMap, 100)
    initMap()

    return () => clearInterval(timer)
  }, [infoName, infoAddr, infoWalk])

  if (mapFailed) {
    return (
      <div className="map-fallback">
        <span className="map-fallback-icon">🗺</span>
        <p className="map-fallback-text">{failedText}</p>
        <a
          href="https://map.naver.com/p/entry/place/1846291527"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-naver"
          style={{ fontSize: '0.88rem', padding: '10px 22px' }}
        >
          {fallbackBtn}
        </a>
      </div>
    )
  }

  return <div id="naver-map" className="naver-map-container" />
}

function Location() {
  const { lang } = useLanguage()
  const t = translations[lang].location
  const nearby = t.nearby.map((n, i) => ({ ...n, icon: nearbyIcons[i] }))
  return (
    <section id="location" className="section location-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-label">{t.sectionLabel}</p>
          <h2 className="section-title">{t.sectionTitle}</h2>
          <p className="section-sub">{t.sectionSub}</p>
        </div>

        <div className="location-grid">
          <div className="location-info">
            <div className="contact-item">
              <div className="contact-icon"><MapPin size={22} /></div>
              <div>
                <p className="contact-label">{t.addressLabel}</p>
                <p className="contact-value">{t.addressValue}</p>
                <p className="contact-hint">{t.addressHint}</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><Phone size={22} /></div>
              <div>
                <p className="contact-label">{t.phoneLabel}</p>
                <a href="tel:0507-1492-5963" className="contact-value contact-link">
                  0507-1492-5963
                </a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><MessageCircle size={22} /></div>
              <div>
                <p className="contact-label">{t.onlineLabel}</p>
                <a href={NAVER_TALK} target="_blank" rel="noopener noreferrer"
                  className="contact-value contact-link">
                  {t.naverTalkLink}
                </a>
              </div>
            </div>

            <div className="nearby-list">
              <p className="nearby-title">{t.nearbyTitle}</p>
              {nearby.map((n) => (
                <div key={n.name} className="nearby-item">
                  <span className="nearby-icon">{n.icon}</span>
                  <div>
                    <strong>{n.name}</strong>
                    <span>{n.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-buttons">
              <a href="tel:0507-1492-5963" className="btn btn-primary">{t.phoneBtn}</a>
              <a href={NAVER_TALK} target="_blank" rel="noopener noreferrer" className="btn btn-naver">
                {t.naverBtn}
              </a>
            </div>
          </div>

          <div className="contact-map">
            <a
              href="https://map.naver.com/p/entry/place/1846291527"
              target="_blank"
              rel="noopener noreferrer"
              className="naver-map-btn"
            >
              <span className="naver-n">N</span>
              {t.naverMapBtn}
            </a>
            <NaverMap
              infoName={t.mapInfoName}
              infoAddr={t.mapInfoAddr}
              infoWalk={t.mapInfoWalk}
              failedText={t.mapFailed}
              fallbackBtn={t.mapFallbackBtn}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Footer ─────────── */
function Footer() {
  const { lang } = useLanguage()
  const t = translations[lang].footer
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <span className="logo-first">{t.logoFirst}</span>{t.logoRest}
        </div>
        <p className="footer-address">{t.address}</p>
        <div className="footer-links">
          <a href={NAVER_TALK} target="_blank" rel="noopener noreferrer">{t.naverTalk}</a>
          <span>|</span>
          <a href="https://open.kakao.com/me/firsthousegunpo" target="_blank" rel="noopener noreferrer">{t.kakao}</a>
          <span>|</span>
          <Link to="/inquiry" style={{ whiteSpace: 'pre-line' }}>{t.inquiry}</Link>
          <span>|</span>
          <Link to="/faq">FAQ</Link>
          <span>|</span>
          <Link to="/about">{t.about}</Link>
        </div>
        <div className="footer-legal">
          <Link to="/privacy">{t.privacy}</Link>
        </div>
        <p className="footer-copy">{t.copy}</p>
      </div>
    </footer>
  )
}

/* ─────────── Main Page ─────────── */
function MainPage() {
  return (
    <>
      <Hero />
      <ContactBar />
      <Rooms />
      <Facilities />
      <Security />
      <Location />
    </>
  )
}

/* ─────────── App ─────────── */
function App() {
  return (
    <div className="app">
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App
