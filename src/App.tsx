import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.css'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules'

// Hero slider
import heroSlide1 from './assets/hero_slider/main.jpg'
import heroSlide2 from './assets/hero_slider/main2_coffee.jpg'
import heroSlide3 from './assets/hero_slider/main_clothes.jpg'
import heroSlide4 from './assets/hero_slider/main_eating.png'

// Rooms – premium
import premiumOutside from './assets/rooms/premium/outside/outside.jpg'
import premiumInside from './assets/rooms/premium/inside/inside.jpg'

// Rooms – deluxe
import deluxeOutside from './assets/rooms/deluxe/outside/outside.jpg'
import deluxeInside from './assets/rooms/deluxe/inside/inside.jpg'

// Rooms – standard
import standardOutside from './assets/rooms/standard/outside/outside.jpg'
import standardInside from './assets/rooms/standard/inside/inside.jpg'

// Rooms – study
import studyOutside from './assets/rooms/study/outside/outside.jpg'
import studyInside from './assets/rooms/study/inside/inside.jpg'

// Facilities
import kitchen from './assets/facilities/kitchen.jpg'
import shower from './assets/facilities/shower.jpg'
import cinema from './assets/facilities/cinema.png'

// Room feature icons
import iconFridge from './assets/icon/fridge.svg'
import iconWifi from './assets/icon/wifi.svg'
import iconBills from './assets/icon/bills.svg'
import iconDesk from './assets/icon/desk.svg'
import iconHanger from './assets/icon/hanger.svg'
import iconShelf from './assets/icon/shelf.svg'

// Security
import security from './assets/security/security.png'

import InquiryPage from './pages/InquiryPage'
import FaqPage from './pages/FaqPage'

const NAVER_TALK = 'https://talk.naver.com/wrrrpbm?frm=pblog&ref=https%3A%2F%2Fblog.naver.com%2Ffirsthousegunpo%2F224104118423#nafullscreen'

const heroSlides = [
  { img: heroSlide1, label: '메인 1' },
  { img: heroSlide2, label: '메인 2' },
  { img: heroSlide3, label: '메인 3' },
  { img: heroSlide4, label: '메인 4' },
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
    color: '#FF7E67',
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
    color: '#FF7E67',
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
    color: '#FF9999',
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

/* ─────────── Room Detail Modal ─────────── */
function RoomDetailModal({ room, view, onClose }: { room: Room; view: 'outside' | 'inside'; onClose: () => void }) {
  const data = room.views[view]
  const allImages = [
    { img: room.views.outside.img, label: room.views.outside.viewLabel },
    { img: room.views.inside.img, label: room.views.inside.viewLabel },
  ]

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
          <div className="room-detail-header-row">
            <div className="room-detail-badges">
              <span className="room-detail-view-badge" style={{ background: room.color }}>{data.viewLabel}</span>
              {room.badge && <span className="room-card-class-badge">{room.badge}</span>}
            </div>
            <span className="room-detail-price" style={{ color: room.color }}>{data.price}<span className="room-detail-price-unit"> / 월</span></span>
          </div>

          <h2 className="room-detail-title">
            {room.label} <span style={{ color: room.color }}>{data.viewLabel}</span>
          </h2>
          <p className="room-detail-desc">{data.desc}</p>

          <div className="room-detail-features">
            <h3 className="room-detail-features-title">주요 특징</h3>
            <div className="room-detail-feature-list">
              {data.features.map((f) => (
                <div key={f} className="room-detail-feature-item">
                  <span className="room-detail-check" style={{ color: room.color }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="room-detail-actions">
            <Link
              to="/inquiry"
              className="btn-enquire-large"
              style={{ background: room.color }}
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
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation
            loop={true}
            className="room-detail-swiper"
          >
            {allImages.map((img) => (
              <SwiperSlide key={img.label}>
                <img src={img.img} alt={`${room.label} ${img.label}`} />
                <span className="room-detail-slide-label" style={{ background: room.color }}>{img.label}</span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

/* ─────────── Room View Card ─────────── */
function RoomViewCard({ room, view, onDetailClick }: { room: Room; view: 'outside' | 'inside'; onDetailClick: () => void }) {
  const data = room.views[view]
  return (
    <div className="room-card">
      <div className="room-card-image-wrap" onClick={onDetailClick} style={{ cursor: 'pointer' }}>
        <span className="room-card-view-badge" style={{ background: room.color }}>
          {data.viewLabel}
        </span>
        {view === 'outside' && room.badge && (
          <span className="room-card-class-badge">{room.badge}</span>
        )}
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={false}
          className="room-card-swiper"
        >
          <SwiperSlide>
            <img src={data.img} alt={`${room.label} ${data.viewLabel}`} className="room-card-image" />
          </SwiperSlide>
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
                  onClick={() => setActiveTab(r.id)}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="room-all-features">
              <span className="room-all-features-title">All room features:</span>
              <ul className="room-all-features-list">
                <li><img src={iconFridge} alt="개인 냉장고" />개인 냉장고</li>
                <li><img src={iconBills} alt="가스·전기·수도세 무료" />가스·전기·수도세 무료</li>
                <li><img src={iconWifi} alt="와이파이" />와이파이</li>
                <li><img src={iconDesk} alt="책상·의자" />책상·의자</li>
                <li><img src={iconHanger} alt="벽걸이 행거" />벽걸이 행거</li>
                <li><img src={iconShelf} alt="선반" />선반</li>
              </ul>
            </div>
          </div>

          {/* Right: cards */}
          <div className="rooms-cards">
            <RoomViewCard room={currentRoom} view="outside" onDetailClick={() => setDetailModal({ room: currentRoom, view: 'outside' })} />
            <RoomViewCard room={currentRoom} view="inside" onDetailClick={() => setDetailModal({ room: currentRoom, view: 'inside' })} />
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
const PLACE_LAT = 37.35313
const PLACE_LNG = 126.94510

// 인증 실패 시 콘솔에 안내 출력
;(window as Window & { navermap_authFailure?: () => void }).navermap_authFailure = () => {
  console.error('[Naver Maps] 인증 실패 — NCP 콘솔에서 Web 서비스 URL 등록 여부를 확인하세요.')
}

function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current || typeof naver === 'undefined') return

    const center = new naver.maps.LatLng(PLACE_LAT, PLACE_LNG)

    const map = new naver.maps.Map(mapRef.current, {
      center,
      zoom: 17,
    })

    const marker = new naver.maps.Marker({
      position: center,
      map,
      title: '처음하우스 군포역점',
    })

    const infoWindow = new naver.maps.InfoWindow({
      content: `
        <div style="padding:10px 14px;font-family:'Noto Sans KR',sans-serif;min-width:180px;">
          <p style="font-size:0.85rem;font-weight:800;color:#2D3748;margin:0 0 4px;">처음하우스 군포역점</p>
          <p style="font-size:0.78rem;color:#718096;margin:0;">경기도 군포역 1길 32 4층</p>
          <p style="font-size:0.78rem;color:#718096;margin:2px 0 0;">군포역 1번 출구 도보 1분</p>
        </div>
      `,
      borderWidth: 0,
      backgroundColor: '#ffffff',
      anchorSize: new naver.maps.Size(0, 0),
    })

    infoWindow.open(map, marker)
  }, [])

  return <div ref={mapRef} style={{ width: '100%', height: '100%', minHeight: '460px' }} />
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
