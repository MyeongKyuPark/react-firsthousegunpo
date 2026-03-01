import { Link } from 'react-router-dom'

const NAVER_TALK = 'https://talk.naver.com/W6H2WZ6'

const values = [
  {
    icon: '🔒',
    title: '안전 최우선',
    desc: '2중 디지털 도어락, 16채널 CCTV, 세스코 정기 방역으로 2030 여성이 안심하고 생활할 수 있는 환경을 제공합니다.',
  },
  {
    icon: '🚉',
    title: '초역세권 입지',
    desc: '군포역 1번 출구에서 도보 1분. 출퇴근·통학이 편리한 최적의 위치에 자리하고 있습니다.',
  },
  {
    icon: '✨',
    title: '프리미엄 시설',
    desc: '시네마 라운지, 호텔식 욕실, 워시타워, 스타벅스 원두 커피 등 일반 고시원과 차별화된 프리미엄 공용 시설을 갖추고 있습니다.',
  },
  {
    icon: '💙',
    title: '여성 전용 공동체',
    desc: '2030 여성만을 위한 공간으로, 같은 연령대의 입주자들이 안전하고 쾌적한 공동 생활을 누릴 수 있습니다.',
  },
]

const features = [
  '가스·전기·수도세 월 임대료 포함',
  '초고속 Wi-Fi 무제한 무료',
  '스타벅스 원두 커피 & 탄산음료 상시 무료',
  '24시간 세탁기·건조기 이용 가능',
  '넷플릭스 프리미엄 시네마 라운지',
  '세스코 바이러스 케어 정기 방역',
  '16채널 풀HD CCTV 상시 가동',
  '스프링클러·화재감지기 완비',
]

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <div className="page-hero about-hero">
        <div className="page-hero-content">
          <p className="section-label">ABOUT</p>
          <h1 className="page-title">처음하우스 군포역점</h1>
          <p className="page-subtitle">2030 여성을 위한 프리미엄 안심 공간</p>
        </div>
      </div>

      <div className="section-inner about-container">

        {/* 소개 */}
        <div className="about-intro">
          <h2 className="about-section-title">우리의 이야기</h2>
          <p className="about-intro-text">
            처음하우스 군포역점은 서울·경기권에서 첫 독립 생활을 시작하는 2030 여성들을 위해 만들어진
            프리미엄 여성 전용 고시원입니다. 군포역 1번 출구에서 도보 1분 거리의 초역세권 입지에 위치하여
            직장인과 학생 모두에게 최적화된 생활 환경을 제공합니다.
          </p>
          <p className="about-intro-text">
            단순히 잠을 자는 공간을 넘어, <strong>나만의 안전한 첫 번째 집</strong>이 되어드리겠습니다.
            세련된 인테리어, 프리미엄 공용 시설, 그리고 철저한 보안 시스템으로 입주 첫날부터
            편안함과 안심을 동시에 느끼실 수 있습니다.
          </p>
        </div>

        {/* 핵심 가치 */}
        <div className="about-values">
          <h2 className="about-section-title">처음하우스의 핵심 가치</h2>
          <div className="about-values-grid">
            {values.map((v) => (
              <div key={v.title} className="about-value-card">
                <span className="about-value-icon">{v.icon}</span>
                <h3 className="about-value-title">{v.title}</h3>
                <p className="about-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 시설 안내 */}
        <div className="about-features">
          <h2 className="about-section-title">모든 입주자에게 제공되는 혜택</h2>
          <ul className="about-features-list">
            {features.map((f) => (
              <li key={f} className="about-feature-item">
                <span className="about-feature-check">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* 위치 */}
        <div className="about-location">
          <h2 className="about-section-title">오시는 길</h2>
          <div className="about-location-info">
            <p><strong>주소:</strong> 경기도 군포시 군포역 1길 32, 4층</p>
            <p><strong>전화:</strong> 0507-1492-5963</p>
            <p><strong>교통:</strong> 수도권 전철 4호선 군포역 1번 출구 도보 1분</p>
            <p><strong>운영시간:</strong> 상담 가능 시간 오전 10시 ~ 오후 8시 (연중무휴)</p>
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta">
          <h2>지금 바로 처음하우스를 경험해 보세요</h2>
          <p>방문 견학은 언제든지 환영합니다. 편하게 연락 주세요!</p>
          <div className="about-cta-buttons">
            <Link to="/inquiry" className="btn btn-primary">입실 문의하기</Link>
            <a href={NAVER_TALK} target="_blank" rel="noopener noreferrer" className="btn btn-naver">
              네이버 톡톡 문의
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
