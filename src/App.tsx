import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.css'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'

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

import InquiryPage from './pages/InquiryPage'
import FaqPage from './pages/FaqPage'

const NAVER_TALK = 'https://talk.naver.com/wrrrpbm?frm=pblog&ref=https%3A%2F%2Fblog.naver.com%2Ffirsthousegunpo%2F224104118423#nafullscreen'

const heroSlides = [
  { img: premiumOutside, label: '프리미엄 외창형' },
  { img: deluxeOutside, label: '디럭스 외창형' },
  { img: standardOutside, label: '스탠다드 외창형' },
  { img: studyOutside, label: '스터디 외창형' },
]

interface ViewData {
  img: string
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
    color: '#FF6B9D',
    views: {
      outside: {
        img: premiumOutside,
        price: '월 45만원',
        viewLabel: '외창형',
        features: ['막힘없는 뷰', '모던 가구', '독립 창문', '개방감 UP'],
        desc: '세련된 인테리어와 외창의 개방감이 조화로운 최상위 공간입니다.',
      },
      inside: {
        img: premiumInside,
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
        img: deluxeOutside,
        price: '월 42만원',
        viewLabel: '외창형',
        features: ['탁 트인 외창', '최대 수납 공간', '프라이빗 환기', '넓은 공간'],
        desc: '가장 넓은 공간과 풍부한 채광을 자랑하는 최고급 디럭스 룸입니다.',
      },
      inside: {
        img: deluxeInside,
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
    color: '#FFB3C6',
    views: {
      outside: {
        img: standardOutside,
        price: '월 38만원',
        viewLabel: '외창형',
        features: ['햇살 맛집', '최고의 환기', '풍부한 채광', '가성비 최고'],
        desc: '풍부한 채광과 환기가 특징인 가성비 최고의 방입니다.',
      },
      inside: {
        img: standardInside,
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
    color: '#C9A0DC',
    views: {
      outside: {
        img: studyOutside,
        price: '월 33만원',
        viewLabel: '외창형',
        features: ['와이드 데스크', '햇살 맛집', '최적 집중', '쾌적한 환기'],
        desc: '넓은 데스크와 쾌적한 환기로 공부에 집중하기 최적화된 공간입니다.',
      },
      inside: {
        img: studyInside,
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
    name: '공용 복도',
    img: hallway,
    desc: '24시간 CCTV & 카드키 시스템으로 안전하게 관리되는 청결한 공간',
  },
]

const nearby = [
  { icon: '🚉', name: '군포역 1번 출구', desc: '도보 1분' },
  { icon: '🛒', name: '군포역전시장', desc: '장보기 편리한 환경' },
  { icon: '📚', name: '당동도서관', desc: '도보 5분, 집중의 시간' },
  { icon: '👮', name: '군포지구대', desc: '경찰서 5분 거리 안심 보안' },
  { icon: '🌳', name: '당정근린공원', desc: '숲세권 산책로 완비' },
]

/* ─────────── Header ─────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <span className="logo-first">처음</span>하우스
          <span className="logo-sub">군포역점</span>
        </Link>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <span /><span /><span />
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
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
          <a href={NAVER_TALK} target="_blank" rel="noopener noreferrer" className="nav-cta">
            네이버 톡톡
          </a>
        </nav>
      </div>
    </header>
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
        <span className="hero-badge">2030 여성 전용 프리미엄</span>
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
        <span className="contact-bar-icon">📞</span>
        <span className="contact-bar-text">전화 문의</span>
      </a>
      <a
        href="https://open.kakao.com/me/firsthousegunpo"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-bar-item"
      >
        <span className="contact-bar-icon">💛</span>
        <span className="contact-bar-text">카카오플러스친구</span>
      </a>
      <a
        href="https://naver.me/xtgBWNNn"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-bar-item"
      >
        <span className="contact-bar-icon">🗺</span>
        <span className="contact-bar-text">네이버지도</span>
      </a>
    </div>
  )
}

/* ─────────── Room Card ─────────── */
function RoomCard({ room }: { room: Room }) {
  const [view, setView] = useState<'outside' | 'inside'>('outside')
  const current = room.views[view]

  return (
    <div className="room-card">
      {room.badge && (
        <div className="room-badge" style={{ background: room.color }}>
          {room.badge}
        </div>
      )}

      <div className="room-image-wrap">
        <img src={current.img} alt={`${room.label} ${current.viewLabel}`} className="room-image" />
        <div className="room-view-toggle">
          <button className={view === 'outside' ? 'active' : ''} onClick={() => setView('outside')}>
            외창형
          </button>
          <button className={view === 'inside' ? 'active' : ''} onClick={() => setView('inside')}>
            내창형
          </button>
        </div>
      </div>

      <div className="room-info">
        <div className="room-header">
          <span className="room-name-en" style={{ color: room.color }}>{room.name}</span>
          <div className="room-title-row">
            <h3 className="room-name-kr">{room.label} ({current.viewLabel})</h3>
            <span className="room-price" style={{ color: room.color }}>{current.price}</span>
          </div>
        </div>

        <p className="room-desc">{current.desc}</p>

        <ul className="room-features">
          {current.features.map((f) => (
            <li key={f}>
              <span className="feature-dot" style={{ background: room.color }} />
              {f}
            </li>
          ))}
        </ul>

        <a href={NAVER_TALK} target="_blank" rel="noopener noreferrer"
          className="btn-room" style={{ borderColor: room.color, color: room.color }}>
          이 객실 문의하기
        </a>
      </div>
    </div>
  )
}

/* ─────────── Rooms ─────────── */
function Rooms() {
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
        <div className="rooms-grid">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Utility Banner ─────────── */
function UtilityBanner() {
  const items = [
    { icon: '💡', text: '관리비 0원', sub: '수도·전기·가스·WiFi 완전 무료' },
    { icon: '👗', text: '워시타워 무료', sub: '드럼세탁기 2대·건조기 2대 무제한' },
    { icon: '🍜', text: '라면 무한 제공', sub: '스타벅스 원두 커피·탄산음료 포함' },
    { icon: '📅', text: '2주 단기 입주', sub: '실습생·인턴십·단기 거주 환영' },
  ]
  return (
    <div className="utility-banner">
      <div className="utility-inner">
        {items.map((i) => (
          <div key={i.text} className="utility-item">
            <span className="utility-icon">{i.icon}</span>
            <div>
              <p className="utility-title">{i.text}</p>
              <p className="utility-sub">{i.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
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
              <div className="contact-icon">📍</div>
              <div>
                <p className="contact-label">주소</p>
                <p className="contact-value">경기도 군포역 1길 32 4층</p>
                <p className="contact-hint">군포역 1번 출구에서 나오자마자 보이는 건물, 도보 약 1분</p>
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
            <iframe
              title="처음하우스 군포역점 위치"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.5793132047353!2d126.94509617676648!3d37.35312887376742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b67920b8d5ced%3A0xad55d27d05be9c79!2z7Lis7J2M7ZWY7Jqw7IqkIOq1sO2PrOyekeygoA!5e0!3m2!1sko!2skr!4v1739281734000!5m2!1sko!2skr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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
          <a href={NAVER_TALK} target="_blank" rel="noopener noreferrer">네이버 톡톡 문의</a>
          <span>|</span>
          <Link to="/inquiry">입실문의</Link>
          <span>|</span>
          <Link to="/faq">FAQ</Link>
          <span>|</span>
          <a href="https://map.naver.com/p/entry/place/1846291527" target="_blank" rel="noopener noreferrer">네이버 지도</a>
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
      <UtilityBanner />
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
      </Routes>
      <Footer />
    </div>
  )
}

export default App
