import React, { useState, useEffect, useRef } from 'react'
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

import InquiryPage from './pages/InquiryPage'
import FaqPage from './pages/FaqPage'
import AboutPage from './pages/AboutPage'
import PrivacyPage from './pages/PrivacyPage'

const NAVER_TALK = 'https://talk.naver.com/W6H2WZ6'

const heroSlides = [
  { img: heroSlide1, label: '메인 1' },
  { img: heroSlide2, label: '메인 2' },
  { img: heroSlide3, label: '메인 3' },
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

const rooms: Room[] = [
  {
    id: 'premium',
    name: 'Premium',
    label: '프리미엄',
    badge: 'BEST',
    color: '#FF7E67',
    views: {
      outside: {
        imgs: [premiumOutsideHero, premiumOutsideBroadView, premiumOutsideNarrowView, premiumOutsideWriting, premiumOutsideEating],
        price: '월 45만원',
        viewLabel: '외창형',
        features: ['막힘없는 뷰', '모던 가구', '독립 창문', '개방감 UP'],
        desc: '세련된 인테리어와 외창의 개방감이 조화로운 최상위 공간입니다.',
      },
      inside: {
        imgs: [premiumInsideHero, premiumInsideReading, premiumInsideReading2, premiumInsideWorking],
        price: '월 42만원',
        viewLabel: '내창형',
        features: ['조용한 환경', '세련된 조명', '프리미엄 가구', '안정감'],
        desc: '고급스러운 인테리어에 조용함을 더한 고품격 안심 공간입니다.',
      },
    },
  },
  {
    id: 'deluxe',
    name: 'Deluxe',
    label: '디럭스',
    badge: 'POPULAR',
    color: '#FF9999',
    views: {
      outside: {
        imgs: [deluxeOutsideHero, deluxeOutsideReading, deluxeOutsideWorking, deluxeOutsideStudy],
        price: '월 42만원',
        viewLabel: '외창형',
        features: ['탁 트인 외창', '최대 수납 공간', '프라이빗 환기', '넓은 공간'],
        desc: '가장 넓은 공간과 풍부한 채광을 자랑하는 최고급 디럭스 룸입니다.',
      },
      inside: {
        imgs: [deluxeInsideHero, deluxeInsideStudy, deluxeInsideWriting, deluxeInsideWorking],
        price: '월 40만원',
        viewLabel: '내창형',
        features: ['아늑한 분위기', '충분한 수납', '조용한 환경', '넓은 공간'],
        desc: '넓고 아늑한 공간에서 편안한 일상을 누릴 수 있는 디럭스 룸입니다.',
      },
    },
  },
  {
    id: 'standard',
    name: 'Standard',
    label: '스탠다드',
    badge: null,
    color: '#FF7E67',
    views: {
      outside: {
        imgs: [standardOutsideHero, standardOutside3, standardOutsideStudying, standardOutsideCoffee, standardOutsideWorking],
        price: '월 38만원',
        viewLabel: '외창형',
        features: ['햇살 맛집', '최고의 환기', '풍부한 채광', '가성비 최고'],
        desc: '풍부한 채광과 환기가 특징인 가성비 최고의 방입니다.',
      },
      inside: {
        imgs: [standardInsideHero, standardInsideNeat, standardInsideReading, standardInsideWorking],
        price: '월 36만원',
        viewLabel: '내창형',
        features: ['조용한 환경', '실속형 가격', '아늑한 공간', '집중 환경'],
        desc: '실속을 중시하는 분들을 위한 조용하고 아늑한 방입니다.',
      },
    },
  },
  {
    id: 'study',
    name: 'Study',
    label: '스터디',
    badge: null,
    color: '#FF9999',
    views: {
      outside: {
        imgs: [studyOutsideHero, studyOutsideWorking, studyOutsideWorking2, studyOutsideStudy],
        price: '월 33만원',
        viewLabel: '외창형',
        features: ['와이드 데스크', '햇살 맛집', '최적 집중', '쾌적한 환기'],
        desc: '넓은 데스크와 쾌적한 환기로 공부에 집중하기 최적화된 공간입니다.',
      },
      inside: {
        imgs: [studyInsideHero, studyInsideWorking, studyInsideWorking2, studyInsideStudy],
        price: '월 33만원',
        viewLabel: '내창형',
        features: ['와이드 데스크', '완벽한 정숙', '고효율 집중', '합리적 가격'],
        desc: '소음 없이 차분하게 집중할 수 있는 나만의 미니 서재 공간입니다.',
      },
    },
  },
]

const facilities = [
  {
    name: '공용 주방',
    img: kitchen,
    desc: '인덕션·전자레인지·라면 무한 제공! 스타벅스 원두 커피 & 탄산음료 상시 무료',
  },
  {
    name: '호텔식 욕실',
    img: shower,
    desc: '세스코 바이러스 케어 & 정기 방역으로 항상 쾌적하고 위생적인 환경',
  },
  {
    name: '시네마 라운지',
    img: cinema,
    desc: '팝콘향 가득한 공간에서 넷플릭스 프리미엄을 대형 화면으로 즐기세요',
  },
  {
    name: '워시타워',
    img: washtower,
    desc: '세탁기·건조기 워시타워 2세트 완비, 24시간 자유롭게 이용 가능',
  },
]

const nearby: { icon: React.ReactNode; name: string; desc: string }[] = [
  { icon: <Train size={18} />, name: '군포역 1번 출구', desc: '도보 1분' },
  { icon: <ShoppingBag size={18} />, name: '군포역전시장', desc: '장보기 편리한 환경' },
  { icon: <BookOpen size={18} />, name: '당동도서관', desc: '도보 5분, 집중의 시간' },
  { icon: <Shield size={18} />, name: '군포지구대', desc: '경찰서 5분 거리 안심 보안' },
  { icon: <TreePine size={18} />, name: '당정근린공원', desc: '숲세권 산책로 완비' },
]

/* ─────────── Header ─────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const isMainPage = location.pathname === '/'

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
              <span className="logo-first">처음</span>하우스
              <span className="logo-sub">군포역점</span>
            </div>
            <div className="logo-tagline">2030 여성 전용 프리미엄</div>
          </Link>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Backdrop and drawer rendered outside header to avoid stacking context clipping */}
      {menuOpen && <div className="nav-backdrop" onClick={() => setMenuOpen(false)} />}

      <nav ref={navRef} className={`nav ${menuOpen ? 'open' : ''} ${scrolled || !isMainPage ? 'scrolled' : ''}`}>
        <button className="nav-close" onClick={() => setMenuOpen(false)} aria-label="메뉴 닫기">✕</button>
        <button onClick={() => scrollTo('rooms')}>Rooms</button>
        <button onClick={() => scrollTo('facilities')}>Facilities</button>
        <button onClick={() => scrollTo('security')}>Security</button>
        <button onClick={() => scrollTo('location')}>Location</button>
        <Link to="/inquiry" className="nav-link" onClick={() => setMenuOpen(false)}>
          입실문의
        </Link>
        <Link to="/faq" className="nav-link" onClick={() => setMenuOpen(false)}>
          FAQ
        </Link>
        <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
          소개
        </Link>
        <a href={NAVER_TALK} target="_blank" rel="noopener noreferrer" className="nav-cta">
          네이버 톡톡
        </a>
      </nav>
    </>
  )
}

/* ─────────── Hero (Swiper) ─────────── */
function Hero() {
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
          군포역 도보 1분,<br />
          <span>가장 안심되는 나의 첫 시작.</span>
        </h1>
        <p className="hero-desc">
          초역세권의 편리함과 2030 여성만을 위한<br />프리미엄 안심 공간을 경험하세요.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' })}>
            방 둘러보기
          </button>
          <button className="btn btn-outline" onClick={() => document.getElementById('security')?.scrollIntoView({ behavior: 'smooth' })}>
            보안 시스템 확인
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
  return (
    <div className="contact-bar">
      <a href="tel:0507-1492-5963" className="contact-bar-item">
        <Phone className="contact-bar-icon" size={22} />
        <span className="contact-bar-text">전화 문의</span>
      </a>
      <a
        href="https://open.kakao.com/me/firsthousegunpo"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-bar-item"
      >
        <MessageCircle className="contact-bar-icon" size={22} />
        <span className="contact-bar-text">카카오톡</span>
      </a>
      <a
        href="https://naver.me/xtgBWNNn"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-bar-item"
      >
        <MapPin className="contact-bar-icon" size={22} />
        <span className="contact-bar-text">네이버지도</span>
      </a>
    </div>
  )
}

/* ─────────── Room Detail Modal ─────────── */
function RoomDetailModal({ room, view, onClose }: { room: Room; view: 'outside' | 'inside'; onClose: () => void }) {
  const [activeRoom, setActiveRoom] = useState<Room>(room)
  const [activeView, setActiveView] = useState<'outside' | 'inside'>(view)
  const data = activeRoom.views[activeView]
  const isInside = activeView === 'inside'

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="room-detail-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="room-detail-modal">
        {/* Left: text content */}
        <div className="room-detail-content">
          <div className="room-detail-top-bar">
            <button className="room-detail-close" onClick={onClose} aria-label="닫기">✕</button>
          </div>

          {/* Class tabs */}
          <div className="room-detail-class-tabs">
            {rooms.map((r) => (
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
            <span className="room-detail-price" style={{ color: activeRoom.color }}>{data.price}<span className="room-detail-price-unit"> / 월</span></span>
          </div>

          <h2 className="room-detail-title">
            {activeRoom.label} <span style={{ color: activeRoom.color }}>{data.viewLabel}</span>
          </h2>
          <p className="room-detail-desc">{data.desc}</p>

          <div className="room-detail-features">
            <h3 className="room-detail-features-title">주요 특징</h3>
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
              입주문의하기
            </Link>
            <a href="tel:0507-1492-5963" className="btn-call-large">
              📞 전화문의
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
              aria-label="창형 전환"
            >
              <span className="view-switch-track" style={{ background: isInside ? activeRoom.color : 'rgba(255,255,255,0.3)' }}>
                <span className="view-switch-knob" />
              </span>
              <span className="view-switch-text" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {isInside ? '내창' : '외창'}
              </span>
            </button>
          </div>
          <div className="room-detail-view-swiper-wrap">
            <Swiper
              key={activeView}
              modules={[Pagination, Navigation]}
              pagination={{ clickable: true }}
              navigation
              loop={data.imgs.length > 1}
              className="room-detail-swiper"
            >
              {data.imgs.map((img, i) => (
                <SwiperSlide key={i}>
                  <img src={img} alt={`${room.label} ${data.viewLabel} ${i + 1}`} />
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
  return (
    <div className="room-card">
      {/* View toggle bar above image */}
      <div className="view-toggle-bar" onClick={(e) => e.stopPropagation()}>
        <span className="view-toggle-label">{data.viewLabel}</span>
        <button
          className={`view-switch ${isInside ? 'on' : ''}`}
          onClick={onViewToggle}
          aria-label="창형 전환"
        >
          <span className="view-switch-track" style={{ background: isInside ? room.color : '#cbd5e0' }}>
            <span className="view-switch-knob" />
          </span>
          <span className="view-switch-text">{isInside ? '내창' : '외창'}</span>
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
              <img src={img} alt={`${room.label} ${data.viewLabel} ${i + 1}`} className="room-card-image" />
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
            입주문의
          </Link>
          <button
            className="btn-detail"
            onClick={onDetailClick}
            style={{ borderColor: room.color, color: room.color }}
          >
            더보기
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

  const currentRoom = rooms.find((r) => r.id === activeTab)!

  return (
    <section id="rooms" className="section rooms-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-label">ROOMS</p>
          <h2 className="section-title">객실 안내</h2>
          <p className="section-sub">
            당신의 취향과 필요에 맞춘 다양한 프리미엄 룸 라인업
          </p>
        </div>

        <div className="rooms-layout">
          {/* Left: tabs + features */}
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
              <span className="room-all-features-title">All room features:</span>
              <ul className="room-all-features-list">
                <li><Refrigerator className="room-feature-icon" />개인 냉장고</li>
                <li><Zap className="room-feature-icon" />가스·전기·수도세<br />무료</li>
                <li><Wifi className="room-feature-icon" />와이파이</li>
                <li><Monitor className="room-feature-icon" />책상·의자</li>
                <li><Shirt className="room-feature-icon" />벽걸이 행거</li>
                <li><Archive className="room-feature-icon" />선반</li>
              </ul>
            </div>
          </div>

          {/* Right: card */}
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
          onClose={() => setDetailModal(null)}
        />
      )}
    </section>
  )
}

/* ─────────── Facilities ─────────── */
function Facilities() {
  return (
    <section id="facilities" className="section facilities-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-label">FACILITIES</p>
          <h2 className="section-title">프리미엄 공용 시설</h2>
          <p className="section-sub">
            프라이빗 시네마룸부터 스타벅스 원두까지, 일상의 급을 높여드립니다
          </p>
        </div>
        <div className="facilities-grid">
          {facilities.map((f) => (
            <div key={f.name} className="facility-card">
              <div className="facility-image-wrap">
                <img src={f.img} alt={f.name} className="facility-image" />
                <div className="facility-overlay">
                  <p className="facility-desc">{f.desc}</p>
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
  const items = [
    { icon: '🔒', title: '2중 보안', desc: '현관 및 개별 룸 디지털 도어락' },
    { icon: '📹', title: '24/7 CCTV', desc: '16채널 풀 HD CCTV 상시 가동' },
    { icon: '🦠', title: '세스코 케어', desc: '바이러스 케어 및 정기 방역' },
    { icon: '🚒', title: '안전 시설', desc: '스프링클러·화재 감지기 완비' },
  ]
  return (
    <section id="security" className="section security-section">
      <div className="section-inner">
        <div className="security-card">
          <div className="security-text">
            <p className="section-label">SECURITY</p>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              철저한 2중<br />보안 시스템
            </h2>
            <p className="security-sub">
              2030 여성 입실자분들의 안전한 생활을 최우선으로 합니다.
            </p>
            <ul className="security-list">
              {items.map((item) => (
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
              입실 문의하기
            </a>
          </div>
          <div className="security-img-wrap">
            <img src={security} alt="보안 시스템" className="security-img" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Location ─────────── */
const PLACE_LAT = 37.353197
const PLACE_LNG = 126.947693

function NaverMap() {
  const [mapFailed, setMapFailed] = useState(false)

  useEffect(() => {
    // NCP 인증 실패 콜백 (docs: window.navermap_authFailure)
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

      // 지도 생성 (docs: new naver.maps.Map('map', mapOptions))
      const center = new nv.maps.LatLng(PLACE_LAT, PLACE_LNG)
      const map = new nv.maps.Map('naver-map', {
        center,
        zoom: 17,
      })

      // 마커 생성 (docs: new naver.maps.Marker({ position, map }))
      const marker = new nv.maps.Marker({
        position: center,
        map,
      })

      // 정보창 생성 (docs: new naver.maps.InfoWindow({ content }))
      const contentString = [
        '<div style="padding:12px 16px;font-family:\'Noto Sans KR\',sans-serif;min-width:160px;">',
        '<p style="font-size:0.88rem;font-weight:800;color:#2D3748;margin:0 0 5px;">처음하우스 군포역점</p>',
        '<p style="font-size:0.78rem;color:#718096;margin:0;">경기도 군포역 1길 32 4층</p>',
        '<p style="font-size:0.78rem;color:#FF7E67;font-weight:700;margin:4px 0 0;">🚉 군포역 1번 출구 도보 1분</p>',
        '</div>',
      ].join('')

      const infoWindow = new nv.maps.InfoWindow({
        content: contentString,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        anchorSize: new nv.maps.Size(10, 10),
      })

      // 마커 클릭 시 정보창 토글 (docs 표준 패턴)
      nv.maps.Event.addListener(marker, 'click', function () {
        if (infoWindow.getMap()) {
          infoWindow.close()
        } else {
          infoWindow.open(map, marker)
        }
      })

      // 최초 로드 시 정보창 열기
      infoWindow.open(map, marker)
    }

    timer = setInterval(initMap, 100)
    initMap()

    return () => clearInterval(timer)
  }, [])

  if (mapFailed) {
    return (
      <div className="map-fallback">
        <span className="map-fallback-icon">🗺</span>
        <p className="map-fallback-text">지도를 불러올 수 없습니다</p>
        <a
          href="https://map.naver.com/p/entry/place/1846291527"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-naver"
          style={{ fontSize: '0.88rem', padding: '10px 22px' }}
        >
          네이버 지도에서 보기
        </a>
      </div>
    )
  }

  return <div id="naver-map" className="naver-map-container" />
}

function Location() {
  return (
    <section id="location" className="section location-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-label">LOCATION</p>
          <h2 className="section-title">오시는 길</h2>
          <p className="section-sub">군포역 1번 출구 도보 1분, 초역세권</p>
        </div>

        <div className="location-grid">
          <div className="location-info">
            <div className="contact-item">
              <div className="contact-icon"><MapPin size={22} /></div>
              <div>
                <p className="contact-label">주소</p>
                <p className="contact-value">경기도 군포역 1길 32 4층</p>
                <p className="contact-hint">군포역 1번 출구에서 나오자마자 보이는 건물, 도보 약 1분</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><Phone size={22} /></div>
              <div>
                <p className="contact-label">전화번호</p>
                <a href="tel:0507-1492-5963" className="contact-value contact-link">
                  0507-1492-5963
                </a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><MessageCircle size={22} /></div>
              <div>
                <p className="contact-label">온라인 문의</p>
                <a href={NAVER_TALK} target="_blank" rel="noopener noreferrer"
                  className="contact-value contact-link">
                  네이버 톡톡으로 문의하기 →
                </a>
              </div>
            </div>

            <div className="nearby-list">
              <p className="nearby-title">주변 시설</p>
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
              <a href="tel:0507-1492-5963" className="btn btn-primary">전화 문의</a>
              <a href={NAVER_TALK} target="_blank" rel="noopener noreferrer" className="btn btn-naver">
                네이버 톡톡 문의
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
              NAVER 지도로 길찾기
            </a>
            <NaverMap />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Footer ─────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <span className="logo-first">처음</span>하우스 군포역점
        </div>
        <p className="footer-address">경기도 군포역 1길 32 4층 | 0507-1492-5963</p>
        <div className="footer-links">
          <a href={NAVER_TALK} target="_blank" rel="noopener noreferrer">네이버 톡톡</a>
          <span>|</span>
          <a href="https://open.kakao.com/me/firsthousegunpo" target="_blank" rel="noopener noreferrer">카카오톡</a>
          <span>|</span>
          <Link to="/inquiry">입실<br />문의</Link>
          <span>|</span>
          <Link to="/faq">FAQ</Link>
          <span>|</span>
          <Link to="/about">소개</Link>
        </div>
        <div className="footer-legal">
          <Link to="/privacy">개인정보처리방침</Link>
        </div>
        <p className="footer-copy">© 2025 처음하우스 군포역점. All rights reserved.</p>
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
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/inquiry" element={<InquiryPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
