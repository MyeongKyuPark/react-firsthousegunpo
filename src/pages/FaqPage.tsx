import { useState } from 'react'

interface FaqItem {
  q: string
  a: string
}

interface FaqCategory {
  category: string
  icon: string
  items: FaqItem[]
}

const faqs: FaqCategory[] = [
  {
    category: '입실 절차',
    icon: '📋',
    items: [
      {
        q: '입실은 어떻게 하나요?',
        a: '전화, 카카오플러스친구, 네이버 톡톡으로 상담 후 방문 견학 → 계약서 작성 → 보증금 납부 → 입실 순으로 진행됩니다. 입실 당일 관리자가 방 안내 및 이용 설명을 해드립니다.',
      },
      {
        q: '입실 시 필요한 서류가 있나요?',
        a: '신분증(주민등록증 또는 운전면허증)만 지참하시면 됩니다. 학생의 경우 학생증도 가능합니다.',
      },
      {
        q: '보증금은 얼마인가요?',
        a: '보증금은 100만원이며 퇴실 시 원상복구 확인 후 전액 반환됩니다. 보증금은 계약 체결 시 납부합니다.',
      },
      {
        q: '단기 입주도 가능한가요?',
        a: '네, 2주부터 단기 입주가 가능합니다. 실습생, 인턴, 단기 거주가 필요하신 분도 환영합니다. 단기 요금은 별도 문의 부탁드립니다.',
      },
    ],
  },
  {
    category: '객실 안내',
    icon: '🛏️',
    items: [
      {
        q: '방 크기는 어떻게 되나요?',
        a: '객실 타입에 따라 다르며 프리미엄(약 10평), 디럭스(약 8평), 스탠다드(약 6평), 스터디(약 5평)로 구성되어 있습니다. 정확한 평수는 문의 시 안내해 드립니다.',
      },
      {
        q: '가구와 가전은 어떻게 구성되어 있나요?',
        a: '모든 객실에 침대, 책상, 의자, 옷장, 에어컨, 냉장고, 전자레인지가 기본 제공됩니다. 일부 객실은 추가 가전이 포함될 수 있습니다.',
      },
      {
        q: '외창형과 내창형의 차이는 무엇인가요?',
        a: '외창형은 건물 외벽 창문이 있어 자연 채광과 환기가 좋고 개방감이 뛰어납니다. 내창형은 내부 복도 방향의 창문으로 외부 소음이 적고 조용한 환경이 특징입니다.',
      },
    ],
  },
  {
    category: '시설·서비스',
    icon: '🏠',
    items: [
      {
        q: '인터넷은 무료인가요?',
        a: '네, 초고속 Wi-Fi가 전 객실 및 공용공간에 무제한 무료로 제공됩니다. 유선 인터넷 연결도 가능합니다.',
      },
      {
        q: '세탁기는 어떻게 이용하나요?',
        a: '공용 세탁실에 드럼세탁기 2대와 건조기 2대가 무료로 운영됩니다. 별도의 세탁 비용은 없으며 24시간 이용 가능합니다.',
      },
      {
        q: '주방은 어떻게 이용하나요?',
        a: '공용 주방에서 인덕션, 전자레인지, 냉장고를 자유롭게 사용하실 수 있습니다. 라면은 무한 제공되며 스타벅스 원두 커피와 탄산음료도 상시 무료입니다.',
      },
      {
        q: '시네마룸은 어떻게 이용하나요?',
        a: '별도 예약 없이 선착순 이용 가능합니다. 넷플릭스 프리미엄이 연결된 대형 스크린과 사운드 시스템을 즐기실 수 있습니다. 팝콘 등 간식 지참 가능합니다.',
      },
    ],
  },
  {
    category: '비용·관리비',
    icon: '💰',
    items: [
      {
        q: '관리비에 포함된 항목은 무엇인가요?',
        a: '월 임대료에 수도, 전기, 가스, 초고속 Wi-Fi, 세탁기·건조기 사용료, 공용 시설 이용료가 모두 포함되어 있습니다. 별도의 관리비는 없습니다.',
      },
      {
        q: '공과금은 별도로 내나요?',
        a: '아니요, 수도·전기·가스 등 모든 공과금이 월 임대료에 포함되어 있어 별도 납부가 필요 없습니다.',
      },
      {
        q: '추가로 발생하는 비용이 있나요?',
        a: '기본 임대료와 보증금 외에 별도 비용은 없습니다. 다만 시설 파손 시 수리비가 발생할 수 있습니다.',
      },
    ],
  },
  {
    category: '생활 규칙',
    icon: '📌',
    items: [
      {
        q: '외박은 자유롭게 할 수 있나요?',
        a: '네, 외박에 대한 제한은 없습니다. 다만 장기 외박 시 관리자에게 사전 공지해 주시면 더욱 안전하게 관리해 드릴 수 있습니다.',
      },
      {
        q: '방문객 출입이 가능한가요?',
        a: '2030 여성 전용 숙소이므로 이성 방문객의 객실 출입은 제한됩니다. 여성 방문객은 공용 공간 이용이 가능하며 운영 시간 내에만 허용됩니다.',
      },
      {
        q: '취사는 가능한가요?',
        a: '개인 객실에서의 취사는 화재 위험으로 금지되어 있습니다. 공용 주방에서 자유롭게 요리하실 수 있습니다.',
      },
      {
        q: '흡연 정책은 어떻게 되나요?',
        a: '건물 내 전 구역 금연입니다. 지정된 실외 흡연 구역을 이용해 주세요. 위반 시 퇴실 조치가 될 수 있습니다.',
      },
    ],
  },
]

export default function FaqPage() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="page-wrapper">
      <div className="page-hero faq-hero">
        <div className="page-hero-content">
          <p className="section-label">FAQ</p>
          <h1 className="page-title">자주 묻는 질문</h1>
          <p className="page-subtitle">궁금하신 점을 빠르게 찾아보세요</p>
        </div>
      </div>

      <div className="section-inner faq-container">
        {faqs.map((cat) => (
          <div key={cat.category} className="faq-category">
            <div className="faq-category-header">
              <span className="faq-category-icon">{cat.icon}</span>
              <h2 className="faq-category-title">{cat.category}</h2>
            </div>
            <div className="faq-list">
              {cat.items.map((item, idx) => {
                const key = `${cat.category}-${idx}`
                const isOpen = !!openMap[key]
                return (
                  <div key={key} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      className="faq-question"
                      onClick={() => toggle(key)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-q-text">{item.q}</span>
                      <span className="faq-arrow">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="faq-cta">
          <p>원하시는 답변을 찾지 못하셨나요?</p>
          <div className="faq-cta-buttons">
            <a href="tel:0507-1492-5963" className="btn btn-primary">전화 문의</a>
            <a
              href="https://open.kakao.com/me/firsthousegunpo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-kakao"
            >
              카카오 문의
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
