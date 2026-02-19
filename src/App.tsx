import { useState, useEffect } from 'react'
import './App.css'

import heroImage from './assets/Heroimage.jpg'
import premiumOutside from './assets/premium_outside.jpg'
import premiumInside from './assets/premium_inside.jpg'
import deluxeOutside from './assets/deluxe_outside.jpg'
import deluxeInside from './assets/deluxe_inside.jpg'
import standardOutside from './assets/standard_outside.jpg'
import standardInside from './assets/standard_inside.jpg'
import studyOutside from './assets/study_outside.jpg'
import studyInside from './assets/study_inside.jpg'
import kitchen from './assets/kitchen.jpg'
import shower from './assets/shower.jpg'
import hallway from './assets/hallway.png'
import security from './assets/security.png'
import cinema from './assets/cinema.png'

const rooms = [
  {
    id: 'premium',
    name: 'Premium',
    label: '프리미엄',
    description: '넓고 쾌적한 최상위 등급 객실. 대형 창문으로 채광이 풍부하며 넓은 공간에서 편안한 생활을 누리세요.',
    outside: premiumOutside,
    inside: premiumInside,
    features: ['넓은 공간', '대형 창문', '독립 화장실', '프리미엄 인테리어'],
    badge: 'BEST',
    color: '#FF6B9D',
  },
  {
    id: 'deluxe',
    name: 'Deluxe',
    label: '디럭스',
    description: '채광이 좋은 고급 객실. 합리적인 가격으로 쾌적하고 밝은 공간을 경험하세요.',
    outside: deluxeOutside,
    inside: deluxeInside,
    features: ['좋은 채광', '충분한 수납공간', '쾌적한 환경', '고급 가구'],
    badge: 'POPULAR',
    color: '#FF9999',
  },
  {
    id: 'standard',
    name: 'Standard',
    label: '스탠다드',
    description: '합리적인 가격의 표준 객실. 필요한 모든 것이 갖춰진 깔끔한 공간입니다.',
    outside: standardOutside,
    inside: standardInside,
    features: ['합리적 가격', '필수 편의시설', '깔끔한 인테리어', '안전한 환경'],
    badge: null,
    color: '#FFB3C6',
  },
  {
    id: 'study',
    name: 'Study',
    label: '스터디',
    description: '공부와 업무에 최적화된 객실. 집중력을 높여주는 조용하고 실용적인 공간입니다.',
    outside: studyOutside,
    inside: studyInside,
    features: ['조용한 환경', '넓은 책상', '밝은 조명', '최적의 집중 공간'],
    badge: null,
    color: '#C9A0DC',
  },
]

const facilities = [
  { name: '공용 주방', img: kitchen, desc: '깨끗하게 관리되는 공용 주방' },
  { name: '공용 샤워실', img: shower, desc: '24시간 이용 가능한 샤워 시설' },
  { name: '공용 복도', img: hallway, desc: '넓고 쾌적한 공용 공간' },
  { name: '보안 시스템', img: security, desc: '24시간 CCTV 및 카드키 시스템' },
  { name: '시네마 라운지', img: cinema, desc: '영화 감상을 위한 특별한 공간' },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <div className="logo" onClick={() => scrollTo('hero')}>
          <span className="logo-first">처음</span>하우스
          <span className="logo-sub">군포역점</span>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <button onClick={() => scrollTo('rooms')}>객실 안내</button>
          <button onClick={() => scrollTo('facilities')}>공용 시설</button>
          <button onClick={() => scrollTo('contact')}>오시는 길</button>
          <a
            href="https://talk.naver.com/wrrrpbm?frm=pblog&ref=https%3A%2F%2Fblog.naver.com%2Ffirsthousegunpo%2F224104118423#nafullscreen"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            입실 문의
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <img src={heroImage} alt="처음하우스 군포역점" className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-sub">군포역 도보 1분 · 프리미엄 고시원</p>
        <h1 className="hero-title">
          처음하우스<br />
          <span>군포역점</span>
        </h1>
        <p className="hero-desc">
          쾌적하고 안전한 나만의 공간에서<br />새로운 시작을 경험하세요
        </p>
        <div className="hero-buttons">
          <a
            href="https://talk.naver.com/wrrrpbm?frm=pblog&ref=https%3A%2F%2Fblog.naver.com%2Ffirsthousegunpo%2F224104118423#nafullscreen"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            네이버 톡톡 문의
          </a>
          <a href="tel:05071492-5963" className="btn btn-outline">
            전화 문의
          </a>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>scroll</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  )
}

function RoomCard({ room }: { room: typeof rooms[0] }) {
  const [view, setView] = useState<'outside' | 'inside'>('outside')

  return (
    <div className="room-card">
      {room.badge && (
        <div className="room-badge" style={{ background: room.color }}>
          {room.badge}
        </div>
      )}
      <div className="room-image-wrap">
        <img
          src={view === 'outside' ? room.outside : room.inside}
          alt={`${room.label} ${view === 'outside' ? '외부' : '내부'}`}
          className="room-image"
        />
        <div className="room-view-toggle">
          <button
            className={view === 'outside' ? 'active' : ''}
            onClick={() => setView('outside')}
          >
            외부
          </button>
          <button
            className={view === 'inside' ? 'active' : ''}
            onClick={() => setView('inside')}
          >
            내부
          </button>
        </div>
      </div>
      <div className="room-info">
        <div className="room-header">
          <span className="room-name-en" style={{ color: room.color }}>
            {room.name}
          </span>
          <h3 className="room-name-kr">{room.label}</h3>
        </div>
        <p className="room-desc">{room.description}</p>
        <ul className="room-features">
          {room.features.map((f) => (
            <li key={f}>
              <span className="feature-dot" style={{ background: room.color }} />
              {f}
            </li>
          ))}
        </ul>
        <a
          href="https://talk.naver.com/wrrrpbm?frm=pblog&ref=https%3A%2F%2Fblog.naver.com%2Ffirsthousegunpo%2F224104118423#nafullscreen"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-room"
          style={{ borderColor: room.color, color: room.color }}
        >
          이 객실 문의하기
        </a>
      </div>
    </div>
  )
}

function Rooms() {
  return (
    <section id="rooms" className="section rooms-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-label">ROOMS</p>
          <h2 className="section-title">객실 안내</h2>
          <p className="section-sub">
            다양한 등급의 객실로 나에게 맞는 최적의 공간을 선택하세요
          </p>
        </div>
        <div className="rooms-grid">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Facilities() {
  return (
    <section id="facilities" className="section facilities-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-label">FACILITIES</p>
          <h2 className="section-title">공용 시설</h2>
          <p className="section-sub">
            입주민을 위한 다양한 공용 시설을 제공합니다
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

function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-label">CONTACT</p>
          <h2 className="section-title">오시는 길 & 문의</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <p className="contact-label">주소</p>
                <p className="contact-value">경기도 군포역 1길 32 4층</p>
                <p className="contact-hint">군포역 도보 1분</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <p className="contact-label">전화번호</p>
                <a href="tel:0507-1492-5963" className="contact-value contact-link">
                  0507-1492-5963
                </a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">💬</div>
              <div>
                <p className="contact-label">온라인 문의</p>
                <a
                  href="https://talk.naver.com/wrrrpbm?frm=pblog&ref=https%3A%2F%2Fblog.naver.com%2Ffirsthousegunpo%2F224104118423#nafullscreen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-value contact-link"
                >
                  네이버 톡톡으로 문의하기 →
                </a>
              </div>
            </div>
            <div className="contact-buttons">
              <a href="tel:0507-1492-5963" className="btn btn-primary">
                전화 문의
              </a>
              <a
                href="https://talk.naver.com/wrrrpbm?frm=pblog&ref=https%3A%2F%2Fblog.naver.com%2Ffirsthousegunpo%2F224104118423#nafullscreen"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-naver"
              >
                네이버 톡톡 문의
              </a>
            </div>
          </div>
          <div className="contact-map">
            <iframe
              title="처음하우스 군포역점 위치"
              src="https://maps.google.com/maps?q=경기도+군포시+군포역1길+32&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <span className="logo-first">처음</span>하우스 군포역점
        </div>
        <p className="footer-address">경기도 군포역 1길 32 4층 | 0507-1492-5963</p>
        <p className="footer-copy">© 2025 처음하우스 군포역점. All rights reserved.</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Rooms />
      <Facilities />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
